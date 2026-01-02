import React, { useState } from "react";
import { ChatContext } from "context";
import type { Message } from "types";
import { auth } from "../firebase";
import { API_ENDPOINTS } from "config/api";

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (text: string) => {
        setLoading(true);
        
        // Add user message immediately
        const userMsgId = `user-${Date.now()}`;
        setMessages((prev) => [
            ...prev,
            { 
                id: userMsgId,
                role: "user", 
                content: text 
            }
        ]);

        try {
            const user = auth.currentUser;
            if (!user) {
                alert("You must be signed in to send messages.");
                throw new Error("Not authenticated");
            }

            const token = await user.getIdToken();

            const res = await fetch(API_ENDPOINTS.CHAT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ message: text }),
            });

            console.log("Response status:", res.status);

            if (res.status === 429) {
                alert("LLM quota exceeded, please try later.");
                setLoading(false);
                return;
            }

            if (res.status >= 500) {
                const errorDetails = await res.text().catch(() => "No error details");
                console.error("Server error (500):", errorDetails);
                alert(`Server error: ${errorDetails || "Please check backend logs"}`);
                setLoading(false);
                return;
            }

            if (!res.ok) {
                const errorText = await res.text().catch(() => "Unknown error");
                console.error("API Error:", res.status, errorText);
                alert(`Failed to send message (${res.status}): ${errorText}`);
                setLoading(false);
                return;
            }

            const data = await res.json();

            // Add assistant response
            const assistantMsgId = `assistant-${Date.now()}`;
            setMessages((prev) => [
                ...prev,
                { 
                    id: assistantMsgId,
                    role: "assistant", 
                    content: data.reply || data.content || data.message || "",
                    recommendations: data.recommendations || undefined
                },
            ]);
        } catch (err) {
            console.error("Error sending message:", err);
            if (err instanceof Error && err.message !== "Not authenticated") {
                alert("An unexpected error occurred. Please check your connection and try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ChatContext.Provider value={{ messages, sendMessage, loading }}>
            {children}
        </ChatContext.Provider>
    );
};

