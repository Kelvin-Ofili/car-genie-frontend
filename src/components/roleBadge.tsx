import { useEffect, useState } from "react";
import { CheckCircledIcon, PersonIcon } from "@radix-ui/react-icons";
import { getCurrentUserClaims } from "../services/admin.service";

interface UserClaims {
	admin?: boolean;
	dealer?: boolean;
	[key: string]: unknown;
}

interface RoleBadgeProps {
	className?: string;
}

export const RoleBadge = ({ className = "" }: RoleBadgeProps) => {
	const [claims, setClaims] = useState<UserClaims | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchClaims = async () => {
			try {
				setLoading(true);
				const userClaims = await getCurrentUserClaims();
				setClaims(userClaims as UserClaims);
			} catch (err) {
				console.error("Error fetching user claims:", err);
				setError("Failed to load roles");
			} finally {
				setLoading(false);
			}
		};

		fetchClaims();
	}, []);

	if (loading) {
		return (
			<div className={`flex items-center gap-2 ${className}`}>
				<div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
				<span className="text-sm text-gray-500">Loading roles...</span>
			</div>
		);
	}

	if (error) {
		return null; // Silently fail - roles are not critical to show
	}

	const hasRoles = claims?.admin || claims?.dealer;

	if (!hasRoles) {
		// Regular user - show basic badge
		return (
			<div className={`flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full ${className}`}>
				<PersonIcon className="w-4 h-4 text-gray-600" />
				<span className="text-sm font-medium text-gray-700">User</span>
			</div>
		);
	}

	return (
		<div className={`flex items-center gap-2 ${className}`}>
			{claims?.admin && (
				<div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
					<CheckCircledIcon className="w-4 h-4 text-white" />
					<span className="text-sm font-semibold text-white">Admin</span>
				</div>
			)}
			{claims?.dealer && (
				<div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
					<CheckCircledIcon className="w-4 h-4 text-white" />
					<span className="text-sm font-semibold text-white">Dealer</span>
				</div>
			)}
		</div>
	);
};
