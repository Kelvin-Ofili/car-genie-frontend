import React, { useState } from "react";
import { ChatContext } from "context";
import type { Message } from "types";
import { auth } from "../firebase";

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (text: string) => {
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("Not authenticated");

            const token = await user.getIdToken();

            const res = await fetch("http://localhost:4000/chat", {
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
            console.error(err);
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

