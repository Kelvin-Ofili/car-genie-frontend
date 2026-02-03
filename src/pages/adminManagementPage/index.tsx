import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	checkAdminStatus,
	revokeAdminRole,
	listAdminUsers,
} from "../../services/admin.service";
import { useAuth } from "../../constants/useAuth";

interface AdminUser {
	uid: string;
	email: string | null;
	displayName: string | null;
	createdAt: string;
}

export default function AdminManagementPage() {
	const { user, loading: authLoading } = useAuth();
	const navigate = useNavigate();
	const [isAdmin, setIsAdmin] = useState(false);
	const [loading, setLoading] = useState(true);
	const [admins, setAdmins] = useState<AdminUser[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [processingUid, setProcessingUid] = useState<string | null>(null);
	const [showGrantModal, setShowGrantModal] = useState(false);
	const [newAdminEmail, setNewAdminEmail] = useState("");

	// Check admin status and load admins
	useEffect(() => {
		async function initialize() {
			if (authLoading) return;

			if (!user) {
				navigate("/login");
				return;
			}

			const adminStatus = await checkAdminStatus();
			setIsAdmin(adminStatus);

			if (!adminStatus) {
				setError("Access denied. Admin privileges required.");
				setLoading(false);
				return;
			}

			await loadAdmins();
		}

		initialize();
	}, [user, authLoading, navigate]);

	// Load admin users
	async function loadAdmins() {
		setLoading(true);
		setError(null);

		try {
			const adminList = await listAdminUsers();
			setAdmins(adminList);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load admin users");
		} finally {
			setLoading(false);
		}
	}

	// Grant admin role
	async function handleGrantAdmin() {
		if (!newAdminEmail.trim()) {
			setError("Email is required");
			return;
		}

		setError(null);
		setSuccess(null);
		setProcessingUid("granting");

		try {
			// Add a small delay so the loading state is visible
			await new Promise(resolve => setTimeout(resolve, 500));
			
			// The backend will look up the user by email and grant admin role
			// For now, we'll need to use the UID directly
			// TODO: Add backend endpoint to grant by email
			
			// Simplified: directly call grantAdminRole with a placeholder
			// In reality, you'd need a backend endpoint that accepts email
			setError("Feature coming soon: Grant admin by email. Use the backend CLI script for now: npm run setup-admin <email>");
			setProcessingUid(null);
			return;
			
			// await grantAdminRole(userRecord.uid);
			// setSuccess(`Admin role granted to ${newAdminEmail}`);
			// setShowGrantModal(false);
			// setNewAdminEmail("");
			// await loadAdmins();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to grant admin role");
		} finally {
			setProcessingUid(null);
		}
	}

	// Revoke admin role
	async function handleRevokeAdmin(admin: AdminUser) {
		// Prevent self-revocation
		if (admin.uid === user?.id) {
			setError("You cannot revoke your own admin privileges");
			return;
		}

		if (!confirm(`Are you sure you want to revoke admin privileges from ${admin.email || admin.displayName}?`)) {
			return;
		}

		setProcessingUid(admin.uid);
		setError(null);
		setSuccess(null);

		try {
			await revokeAdminRole(admin.uid);
			setSuccess(`Admin role revoked from ${admin.email || admin.displayName}`);
			await loadAdmins();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to revoke admin role");
		} finally {
			setProcessingUid(null);
		}
	}

	// Format date
	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString() + " " + new Date(dateString).toLocaleTimeString();
	}

	if (authLoading || loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	if (!isAdmin) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
					<div className="text-center">
						<svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
						</svg>
						<h1 className="mt-4 text-2xl font-bold text-gray-900">Access Denied</h1>
						<p className="mt-2 text-gray-600">{error}</p>
						<button
							onClick={() => navigate("/")}
							className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
						>
							Go Home
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8 flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
						<p className="mt-2 text-gray-600">Manage admin users and permissions</p>
					</div>
					<button
						onClick={() => setShowGrantModal(true)}
						className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
					>
						+ Grant Admin Role
					</button>
				</div>

				{/* Success Alert */}
				{success && (
					<div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
						<div className="flex">
							<svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
							</svg>
							<p className="ml-3 text-sm text-green-800">{success}</p>
							<button onClick={() => setSuccess(null)} className="ml-auto text-green-800 hover:text-green-900">
								<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
								</svg>
							</button>
						</div>
					</div>
				)}

				{/* Error Alert */}
				{error && (
					<div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
						<div className="flex">
							<svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
							</svg>
							<p className="ml-3 text-sm text-red-800">{error}</p>
							<button onClick={() => setError(null)} className="ml-auto text-red-800 hover:text-red-900">
								<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
								</svg>
							</button>
						</div>
					</div>
				)}

				{/* Admins List */}
				<div className="bg-white rounded-lg shadow overflow-hidden">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									User
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Email
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Created
								</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{admins.length === 0 ? (
								<tr>
									<td colSpan={4} className="px-6 py-8 text-center text-gray-500">
										No admin users found
									</td>
								</tr>
							) : (
								admins.map((admin) => (
									<tr key={admin.uid} className={admin.uid === user?.id ? "bg-blue-50" : ""}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
													{(admin.displayName || admin.email || "?")[0].toUpperCase()}
												</div>
												<div className="ml-4">
													<div className="text-sm font-medium text-gray-900">
														{admin.displayName || "No name"}
														{admin.uid === user?.id && (
															<span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">You</span>
														)}
													</div>
													<div className="text-sm text-gray-500">{admin.uid}</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{admin.email || "No email"}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{formatDate(admin.createdAt)}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											{admin.uid === user?.id ? (
												<span className="text-gray-400">Current user</span>
											) : (
												<button
													onClick={() => handleRevokeAdmin(admin)}
													disabled={processingUid === admin.uid}
													className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
												>
													{processingUid === admin.uid ? "Revoking..." : "Revoke"}
												</button>
											)}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Info Box */}
				<div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
					<div className="flex">
						<svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
						</svg>
						<div className="ml-3">
							<h3 className="text-sm font-medium text-blue-800">Admin Role Information</h3>
							<div className="mt-2 text-sm text-blue-700">
								<ul className="list-disc list-inside space-y-1">
									<li>Admin users can manage dealer applications</li>
									<li>Admin users can grant/revoke admin roles for other users</li>
									<li>Users must sign out and back in after role changes</li>
									<li>You cannot revoke your own admin privileges</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Grant Admin Modal */}
			{showGrantModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg max-w-md w-full p-6">
						<h3 className="text-lg font-bold text-gray-900 mb-4">Grant Admin Role</h3>
						<p className="text-gray-600 mb-4">
							Enter the email address of the user you want to make an admin. The user must have an existing account.
						</p>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							User Email
						</label>
						<input
							type="email"
							value={newAdminEmail}
							onChange={(e) => setNewAdminEmail(e.target.value)}
							placeholder="user@example.com"
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4"
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleGrantAdmin();
								}
							}}
						/>
						<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
							<p className="text-sm text-yellow-800">
								⚠️ The user will need to sign out and back in for the admin role to take effect.
							</p>
						</div>
						<div className="flex gap-3">
							<button
								onClick={() => {
									setShowGrantModal(false);
									setNewAdminEmail("");
									setError(null);
								}}
								className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
							>
								Cancel
							</button>
							<button
								onClick={handleGrantAdmin}
								disabled={!newAdminEmail.trim() || processingUid !== null}
								className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{processingUid ? "Granting..." : "Grant Admin Role"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
