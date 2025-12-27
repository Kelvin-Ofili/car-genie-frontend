import { createContext } from "react";
import { Message } from "types";

export interface ChatContextValue {
	messages: Message[];
	sendMessage: (text: string) => Promise<void>;
	loading: boolean;
};

export const ChatContext = createContext<ChatContextValue>({
	messages: [],
	sendMessage: async () => {},
	loading: false,
});

