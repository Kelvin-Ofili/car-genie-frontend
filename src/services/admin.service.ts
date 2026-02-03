/**
 * Admin Service
 * API calls for admin functionality
 */

import { API_BASE_URL } from "../config/api";
import { auth } from "../firebase";

export interface DealerApplication {
	id: string;
	dealershipName: string;
	contactName: string;
	email: string;
	phone: string;
	locations?: string[];
	staffCapacity?: string;
	inventoryRange?: string;
	dbConnection: {
		host: string;
		port: number;
		dbName: string;
		username: string;
		password: string; // Will be "[ENCRYPTED]" in API responses
	};
	status: "pending" | "approved" | "rejected";
	createdAt: Date | string | { toDate: () => Date };
	updatedAt?: Date | string | { toDate: () => Date };
	rejectionReason?: string;
}

export interface DealerApplicationsResponse {
	applications: DealerApplication[];
}

/**
 * Get authorization header with Firebase token
 */
async function getAuthHeader(): Promise<HeadersInit> {
	const user = auth.currentUser;
	if (!user) {
		throw new Error("User not authenticated");
	}
	const token = await user.getIdToken();
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
}

/**
 * Check if current user has admin privileges
 */
export async function checkAdminStatus(): Promise<boolean> {
	const user = auth.currentUser;
	if (!user) return false;

	try {
		const tokenResult = await user.getIdTokenResult();
		return tokenResult.claims.admin === true;
	} catch (error) {
		console.error("Error checking admin status:", error);
		return false;
	}
}

/**
 * Get all dealer applications
 */
export async function getDealerApplications(
	status?: "pending" | "approved" | "rejected"
): Promise<DealerApplication[]> {
	const headers = await getAuthHeader();
	const url = status
		? `${API_BASE_URL}/dealers/applications?status=${status}`
		: `${API_BASE_URL}/dealers/applications`;

	const response = await fetch(url, { headers });

	if (!response.ok) {
		if (response.status === 403) {
			throw new Error("Access denied. Admin privileges required.");
		}
		throw new Error("Failed to fetch dealer applications");
	}

	const data: DealerApplicationsResponse = await response.json();
	return data.applications;
}

/**
 * Approve a dealer application
 */
export async function approveDealerApplication(
	applicationId: string
): Promise<void> {
	const headers = await getAuthHeader();
	const response = await fetch(
		`${API_BASE_URL}/dealers/applications/${applicationId}/approve`,
		{
			method: "POST",
			headers,
		}
	);

	if (!response.ok) {
		if (response.status === 403) {
			throw new Error("Access denied. Admin privileges required.");
		}
		const error = await response.json();
		throw new Error(error.error || "Failed to approve application");
	}
}

/**
 * Reject a dealer application
 */
export async function rejectDealerApplication(
	applicationId: string,
	reason?: string
): Promise<void> {
	const headers = await getAuthHeader();
	const response = await fetch(
		`${API_BASE_URL}/dealers/applications/${applicationId}/reject`,
		{
			method: "POST",
			headers,
			body: JSON.stringify({ reason }),
		}
	);

	if (!response.ok) {
		if (response.status === 403) {
			throw new Error("Access denied. Admin privileges required.");
		}
		const error = await response.json();
		throw new Error(error.error || "Failed to reject application");
	}
}

/**
 * Get current user's custom claims
 */
export async function getCurrentUserClaims(): Promise<Record<string, unknown>> {
	const headers = await getAuthHeader();
	const response = await fetch(`${API_BASE_URL}/admin/me/claims`, {
		headers,
	});

	if (!response.ok) {
		throw new Error("Failed to fetch user claims");
	}

	const data = await response.json();
	return data.claims || {};
}

/**
 * Grant admin role to a user
 */
export async function grantAdminRole(uid: string): Promise<void> {
	const headers = await getAuthHeader();
	const response = await fetch(`${API_BASE_URL}/admin/grant`, {
		method: "POST",
		headers,
		body: JSON.stringify({ uid }),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || "Failed to grant admin role");
	}
}

/**
 * Grant admin role to a user by email
 */
export async function grantAdminRoleByEmail(email: string): Promise<void> {
	const headers = await getAuthHeader();
	const response = await fetch(`${API_BASE_URL}/admin/grant-by-email`, {
		method: "POST",
		headers,
		body: JSON.stringify({ email }),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || "Failed to grant admin role");
	}
}

/**
 * Revoke admin role from a user
 */
export async function revokeAdminRole(uid: string): Promise<void> {
	const headers = await getAuthHeader();
	const response = await fetch(`${API_BASE_URL}/admin/revoke`, {
		method: "POST",
		headers,
		body: JSON.stringify({ uid }),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || "Failed to revoke admin role");
	}
}

/**
 * List all admin users
 */
export async function listAdminUsers(): Promise<Array<{ uid: string; email: string | null; displayName: string | null; createdAt: string }>> {
	const headers = await getAuthHeader();
	const response = await fetch(`${API_BASE_URL}/admin/list`, {
		headers,
	});

	if (!response.ok) {
		throw new Error("Failed to list admin users");
	}

	const data = await response.json();
	return data.admins || [];
}

/**
 * Check if current user has dealer role
 */
export const checkDealerStatus = async (): Promise<boolean> => {
	try {
		const currentUser = auth.currentUser;
		if (!currentUser) return false;

		const tokenResult = await currentUser.getIdTokenResult();
		return tokenResult.claims.dealer === true || tokenResult.claims.role === "dealer";
	} catch (error) {
		console.error("Error checking dealer status:", error);
		return false;
	}
};
