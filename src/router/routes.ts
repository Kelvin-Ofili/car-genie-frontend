/**
 * ROUTES
 *
 * ===============================================
 *
 * This object depicts the component url structure.
 * It contains a key-value pair of components and their respective URLs
 *
 */

export const Routes = {
	chat: "/",
	login: "/login",
	signup: "/signup",
	chatHistory: "/chat/history",
} as const;

export type RouteKey = keyof typeof Routes;
