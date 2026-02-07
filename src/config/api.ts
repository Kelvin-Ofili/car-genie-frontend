/**
 * API Configuration
 * Centralized API endpoint configuration
 */

// In development, use proxy to avoid CORS issues (Vite strips /api prefix)
// In production, call backend directly (backend routes: /chat, /admin, /dealers)
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment 
	? "/api" 
	: (import.meta.env.VITE_API_BASE_URL || "https://car-genie-backend.onrender.com");

export const API_ENDPOINTS = {
	// Chat endpoints
	CHAT: `${API_BASE_URL}/chat`,
	CHAT_HISTORY: `${API_BASE_URL}/chat/history`,
	CLEAR_CHAT_HISTORY: `${API_BASE_URL}/chat/history`,
	
	// Email endpoints
	SEND_EMAIL: `${API_BASE_URL}/send-email`,
	
	// User endpoints
	UPDATE_PROFILE: `${API_BASE_URL}/update-profile`,
	
	// Admin endpoints
	ADMIN_GRANT: `${API_BASE_URL}/admin/grant`,
	ADMIN_GRANT_BY_EMAIL: `${API_BASE_URL}/admin/grant-by-email`,
	ADMIN_REVOKE: `${API_BASE_URL}/admin/revoke`,
	ADMIN_CHECK: `${API_BASE_URL}/admin/check`,
	ADMIN_LIST: `${API_BASE_URL}/admin/list`,
	ADMIN_ME_CLAIMS: `${API_BASE_URL}/admin/me/claims`,
	
	// Dealer endpoints
	DEALER_APPLICATIONS: `${API_BASE_URL}/dealers/applications`,
	DEALER_APPLICATION_APPROVE: (id: string) => `${API_BASE_URL}/dealers/applications/${id}/approve`,
	DEALER_APPLICATION_REJECT: (id: string) => `${API_BASE_URL}/dealers/applications/${id}/reject`,
	DEALER_ONBOARD: `${API_BASE_URL}/dealers/onboard`,
	DEALER_TEST_CONNECTION: `${API_BASE_URL}/dealers/test-connection`,
} as const;

export { API_BASE_URL };
