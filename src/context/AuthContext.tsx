import { createContext } from "react";
import type { User } from "types";

export interface AuthContextValue {
	user: User | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	forgotPassword: (email: string) => Promise<void>;
	signup: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
	user: null,
	loading: true,
	login: async () => {
		throw new Error("AuthContext not initialized");
	},
	logout: async () => {
		throw new Error("AuthContext not initialized");
	},
	forgotPassword: async () => {
		throw new Error("AuthContext not initialized");
	},
	signup: async () => {
		throw new Error("AuthContext not initialized");
	},
});