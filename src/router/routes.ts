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
	settings: "/settings",
	profile: "/profile",
	contactDealer: "/contact-dealer",
	admin: "/admin",
	adminManagement: "/admin/management",
	dealerDashboard: "/dealer",
} as const;

export type RouteKey = keyof typeof Routes;
