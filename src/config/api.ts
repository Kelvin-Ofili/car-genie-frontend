/**
 * API Configuration
 * Centralized API endpoint configuration
 */

// In development, use proxy to avoid CORS issues
// In production, use environment variable
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment 
	? "/api" 
	: (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000");

export const API_ENDPOINTS = {
	CHAT: `${API_BASE_URL}/chat`,
	CHAT_HISTORY: `${API_BASE_URL}/chat/history`,
} as const;

export { API_BASE_URL };
