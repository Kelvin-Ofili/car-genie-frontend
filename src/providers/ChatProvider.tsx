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

            if (res.status === 429) {
                alert("LLM quota exceeded, please try later.");
                return;
            }

            if (res.status >= 500) {
                alert("Something went wrong on the server. Please try again later.");
                return;
            }

            if (!res.ok) {
                const errorText = await res.text().catch(() => "Unknown error");
                console.error("API Error:", errorText);
                alert("Failed to send message. Please try again.");
                return;
            }

            const data = await res.json();

            setMessages((prev) => [
                ...prev,
                { role: "user", content: text },
                { role: "assistant", ...data },
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

