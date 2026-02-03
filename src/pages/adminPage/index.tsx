	import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
	checkAdminStatus,
	getDealerApplications,
	approveDealerApplication,
	rejectDealerApplication,
	type DealerApplication,
} from "../../services/admin.service";
import { useAuth } from "../../constants/useAuth";

export default function AdminPage() {
	const { user, loading: authLoading } = useAuth();
	const navigate = useNavigate();
	const [isAdmin, setIsAdmin] = useState(false);
	const [loading, setLoading] = useState(true);
	const [applications, setApplications] = useState<DealerApplication[]>([]);
	const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
	const [error, setError] = useState<string | null>(null);
	const [processingId, setProcessingId] = useState<string | null>(null);
	const [selectedApp, setSelectedApp] = useState<DealerApplication | null>(null);
	const [rejectReason, setRejectReason] = useState("");
	const [showRejectModal, setShowRejectModal] = useState(false);

	// Load applications
	const loadApplications = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const filterStatus = filter === "all" ? undefined : filter;
			const apps = await getDealerApplications(filterStatus);
			setApplications(apps);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load applications");
		} finally {
			setLoading(false);
		}
	}, [filter]);

	// Check admin status
	useEffect(() => {
		async function verify() {
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

			loadApplications();
		}

		verify();
	}, [user, authLoading, navigate, loadApplications]);

	// Reload when filter changes
	useEffect(() => {
		if (isAdmin) {
			loadApplications();
		}
	}, [filter, isAdmin, loadApplications]);

	// Approve application
	async function handleApprove(appId: string) {
		if (!confirm("Are you sure you want to approve this application?")) return;

		setProcessingId(appId);
		setError(null);

		try {
			await approveDealerApplication(appId);
			await loadApplications();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to approve application");
		} finally {
			setProcessingId(null);
		}
	}

	// Open reject modal
	function openRejectModal(app: DealerApplication) {
		setSelectedApp(app);
		setRejectReason("");
		setShowRejectModal(true);
	}

	// Reject application
	async function handleReject() {
		if (!selectedApp) return;

		setProcessingId(selectedApp.id);
		setError(null);

		try {
			await rejectDealerApplication(selectedApp.id, rejectReason);
			setShowRejectModal(false);
			setSelectedApp(null);
			await loadApplications();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to reject application");
		} finally {
			setProcessingId(null);
		}
	}

	// Format date
	function formatDate(date: Date | string | { toDate: () => Date } | null | undefined): string {
		if (!date) return "N/A";
		
		let d: Date;
		if (typeof date === 'string') {
			d = new Date(date);
		} else if (date instanceof Date) {
			d = date;
		} else if ('toDate' in date && typeof date.toDate === 'function') {
			d = date.toDate();
		} else {
			return "N/A";
		}
		
		return d.toLocaleDateString() + " " + d.toLocaleTimeString();
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
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8 flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
						<p className="mt-2 text-gray-600">Manage dealer applications</p>
					</div>
					<button
						onClick={() => navigate("/admin/management")}
						className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium flex items-center gap-2"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
						Manage Admins
					</button>
				</div>

				{/* Error Alert */}
				{error && (
					<div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
						<div className="flex">
							<svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
							</svg>
							<p className="ml-3 text-sm text-red-800">{error}</p>
						</div>
					</div>
				)}

				{/* Filters */}
				<div className="mb-6 flex gap-2">
					{(["all", "pending", "approved", "rejected"] as const).map((status) => (
						<button
							key={status}
							onClick={() => setFilter(status)}
							className={`px-4 py-2 rounded-lg font-medium transition ${
								filter === status
									? "bg-indigo-600 text-white"
									: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
							}`}
						>
							{status.charAt(0).toUpperCase() + status.slice(1)}
						</button>
					))}
				</div>

				{/* Applications List */}
				{applications.length === 0 ? (
					<div className="bg-white rounded-lg shadow p-12 text-center">
						<svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
						</svg>
						<h3 className="mt-4 text-lg font-medium text-gray-900">No applications found</h3>
						<p className="mt-2 text-gray-500">
							{filter === "pending"
								? "No pending applications at the moment."
								: `No ${filter} applications found.`}
						</p>
					</div>
				) : (
					<div className="grid gap-6">
						{applications.map((app) => (
							<div key={app.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
								<div className="p-6">
									{/* Header */}
									<div className="flex justify-between items-start mb-4">
										<div>
											<h3 className="text-xl font-bold text-gray-900">{app.dealershipName}</h3>
											<p className="text-gray-600">{app.contactName}</p>
										</div>
										<span
											className={`px-3 py-1 rounded-full text-sm font-medium ${
												app.status === "pending"
													? "bg-yellow-100 text-yellow-800"
													: app.status === "approved"
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{app.status.charAt(0).toUpperCase() + app.status.slice(1)}
										</span>
									</div>

									{/* Contact Info */}
									<div className="grid grid-cols-2 gap-4 mb-4">
										<div>
											<p className="text-sm text-gray-500">Email</p>
											<p className="font-medium">{app.email}</p>
										</div>
										<div>
											<p className="text-sm text-gray-500">Phone</p>
											<p className="font-medium">{app.phone}</p>
										</div>
									</div>

									{/* Additional Info */}
									{(app.locations && app.locations.length > 0) && (
										<div className="mb-4">
											<p className="text-sm text-gray-500">Locations</p>
											<p className="font-medium">{app.locations.join(", ")}</p>
										</div>
									)}

									<div className="grid grid-cols-2 gap-4 mb-4">
										{app.staffCapacity && (
											<div>
												<p className="text-sm text-gray-500">Staff Capacity</p>
												<p className="font-medium">{app.staffCapacity}</p>
											</div>
										)}
										{app.inventoryRange && (
											<div>
												<p className="text-sm text-gray-500">Inventory Range</p>
												<p className="font-medium">{app.inventoryRange}</p>
											</div>
										)}
									</div>

									{/* Database Connection */}
									<div className="bg-gray-50 rounded-lg p-4 mb-4">
										<p className="text-sm font-semibold text-gray-700 mb-2">Database Connection</p>
										<div className="grid grid-cols-2 gap-3 text-sm">
											<div>
												<span className="text-gray-500">Host:</span>{" "}
												<span className="font-mono">{app.dbConnection.host}</span>
											</div>
											<div>
												<span className="text-gray-500">Port:</span>{" "}
												<span className="font-mono">{app.dbConnection.port}</span>
											</div>
											<div>
												<span className="text-gray-500">Database:</span>{" "}
												<span className="font-mono">{app.dbConnection.dbName}</span>
											</div>
											<div>
												<span className="text-gray-500">Username:</span>{" "}
												<span className="font-mono">{app.dbConnection.username}</span>
											</div>
										</div>
									</div>

									{/* Timestamps */}
									<div className="text-sm text-gray-500 mb-4">
										<p>Submitted: {formatDate(app.createdAt)}</p>
										{app.updatedAt && <p>Updated: {formatDate(app.updatedAt)}</p>}
									</div>

									{/* Rejection Reason */}
									{app.status === "rejected" && app.rejectionReason && (
										<div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
											<p className="text-sm font-semibold text-red-800">Rejection Reason:</p>
											<p className="text-sm text-red-700 mt-1">{app.rejectionReason}</p>
										</div>
									)}

									{/* Actions */}
									{app.status === "pending" && (
										<div className="flex gap-3">
											<button
												onClick={() => handleApprove(app.id)}
												disabled={processingId === app.id}
												className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
											>
												{processingId === app.id ? "Processing..." : "Approve"}
											</button>
											<button
												onClick={() => openRejectModal(app)}
												disabled={processingId === app.id}
												className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
											>
												Reject
											</button>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Reject Modal */}
			{showRejectModal && selectedApp && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg max-w-md w-full p-6">
						<h3 className="text-lg font-bold text-gray-900 mb-4">
							Reject Application
						</h3>
						<p className="text-gray-600 mb-4">
							Rejecting application from <strong>{selectedApp.dealershipName}</strong>
						</p>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Reason for rejection (optional)
						</label>
						<textarea
							value={rejectReason}
							onChange={(e) => setRejectReason(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							rows={4}
							placeholder="e.g., Database connection test failed, incomplete information..."
						/>
						<div className="flex gap-3 mt-6">
							<button
								onClick={() => setShowRejectModal(false)}
								className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
							>
								Cancel
							</button>
							<button
								onClick={handleReject}
								disabled={processingId === selectedApp.id}
								className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
							>
								{processingId === selectedApp.id ? "Rejecting..." : "Reject Application"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
