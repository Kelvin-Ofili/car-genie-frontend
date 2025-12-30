/**
 * API Configuration
 * Centralized API endpoint configuration
 */

// Temporarily connect directly to backend for testing
// TODO: Re-enable proxy once connection is confirmed
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export const API_ENDPOINTS = {
	CHAT: `${API_BASE_URL}/chat`,
	CHAT_HISTORY: `${API_BASE_URL}/chat/history`,
} as const;

export { API_BASE_URL };
