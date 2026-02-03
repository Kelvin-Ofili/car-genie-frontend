import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../constants/useAuth";
import { auth } from "../../firebase";

export default function DealerDashboardPage() {
	const { user, loading: authLoading } = useAuth();
	const navigate = useNavigate();
	const [isDealer, setIsDealer] = useState(false);
	const [loading, setLoading] = useState(true);
	const [dealerInfo, setDealerInfo] = useState<{
		dealershipName?: string;
		dealershipId?: string;
	}>({});

	// Check dealer status
	useEffect(() => {
		async function checkDealerRole() {
			if (authLoading) return;

			if (!user) {
				navigate("/login");
				return;
			}

			try {
				// Get user's custom claims
				const currentUser = auth.currentUser;
				if (!currentUser) {
					navigate("/login");
					return;
				}

				const tokenResult = await currentUser.getIdTokenResult();
				const isDealerUser = tokenResult.claims.dealer === true || tokenResult.claims.role === "dealer";

				setIsDealer(isDealerUser);

				if (!isDealerUser) {
					setLoading(false);
					return;
				}

				// Get dealer info from claims
				setDealerInfo({
					dealershipName: tokenResult.claims.dealershipName as string,
					dealershipId: tokenResult.claims.dealershipId as string,
				});
			} catch (error) {
				console.error("Error checking dealer status:", error);
			} finally {
				setLoading(false);
			}
		}

		checkDealerRole();
	}, [user, authLoading, navigate]);

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

	if (!isDealer) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
					<div className="text-center">
						<svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
						</svg>
						<h1 className="mt-4 text-2xl font-bold text-gray-900">Access Denied</h1>
						<p className="mt-2 text-gray-600">
							This area is for approved dealers only.
						</p>
						<div className="mt-6 space-y-3">
							<button
								onClick={() => navigate("/")}
								className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
							>
								Go Home
							</button>
							<a
								href="http://localhost:5174/onboarding"
								className="block w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 text-center"
							>
								Apply to Become a Dealer
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						{dealerInfo.dealershipName || "Dealer Dashboard"}
					</h1>
					<p className="mt-2 text-gray-600">Welcome to your dealer portal</p>
				</div>

				{/* Dashboard Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{/* Stats Card 1 */}
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="p-3 bg-blue-100 rounded-lg">
								<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
								</svg>
							</div>
							<div className="ml-4">
								<p className="text-sm text-gray-600">Total Leads</p>
								<p className="text-2xl font-bold text-gray-900">0</p>
							</div>
						</div>
					</div>

					{/* Stats Card 2 */}
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="p-3 bg-green-100 rounded-lg">
								<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div className="ml-4">
								<p className="text-sm text-gray-600">Active Listings</p>
								<p className="text-2xl font-bold text-gray-900">0</p>
							</div>
						</div>
					</div>

					{/* Stats Card 3 */}
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="p-3 bg-purple-100 rounded-lg">
								<svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
							</div>
							<div className="ml-4">
								<p className="text-sm text-gray-600">Monthly Views</p>
								<p className="text-2xl font-bold text-gray-900">0</p>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Recent Leads */}
					<div className="lg:col-span-2 bg-white rounded-lg shadow">
						<div className="p-6 border-b border-gray-200">
							<h2 className="text-xl font-bold text-gray-900">Recent Leads</h2>
						</div>
						<div className="p-6">
							<div className="text-center py-12">
								<svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
								</svg>
								<h3 className="mt-4 text-lg font-medium text-gray-900">No leads yet</h3>
								<p className="mt-2 text-gray-500">
									Leads from customers will appear here when they contact you through Carrie.
								</p>
							</div>
						</div>
					</div>

					{/* Quick Actions */}
					<div className="bg-white rounded-lg shadow">
						<div className="p-6 border-b border-gray-200">
							<h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
						</div>
						<div className="p-6 space-y-3">
							<button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-left flex items-center">
								<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
								</svg>
								Add New Listing
							</button>
							<button className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-left flex items-center">
								<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
								</svg>
								Sync Inventory
							</button>
							<button className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-left flex items-center">
								<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
								</svg>
								View Analytics
							</button>
						</div>
					</div>
				</div>

				{/* Info Banner */}
				<div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
					<div className="flex">
						<svg className="h-6 w-6 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
						</svg>
						<div className="ml-3">
							<h3 className="text-sm font-medium text-blue-800">Welcome to Your Dealer Portal!</h3>
							<div className="mt-2 text-sm text-blue-700">
								<p>
									Your dealership is now integrated with Carrie. Customers using our AI-powered car recommendation
									system will be able to see your inventory and contact you directly. This dashboard is currently
									in development - more features coming soon!
								</p>
							</div>
							<div className="mt-4">
								<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
									<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
									</svg>
									Status: Active & Connected
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Integration Status */}
				<div className="mt-6 bg-white rounded-lg shadow p-6">
					<h3 className="text-lg font-bold text-gray-900 mb-4">Database Connection</h3>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
							<span className="ml-3 text-sm text-gray-700">Connected to your inventory database</span>
						</div>
						<button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
							View Connection Details
						</button>
					</div>
					{dealerInfo.dealershipId && (
						<div className="mt-4 text-sm text-gray-500">
							Dealership ID: <code className="px-2 py-1 bg-gray-100 rounded">{dealerInfo.dealershipId}</code>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
