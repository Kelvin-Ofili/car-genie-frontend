import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "constants";
import { PersonIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { LogoutModal } from "./logoutModal";
import { checkAdminStatus, checkDealerStatus } from "../services/admin.service";

const UserMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isDealer, setIsDealer] = useState(false);
	const { logout } = useAuth();
	const navigate = useNavigate();
	const menuRef = useRef<HTMLDivElement>(null);

	// Check admin and dealer status on mount
	useEffect(() => {
		checkAdminStatus().then(setIsAdmin);
		checkDealerStatus().then(setIsDealer);
	}, []);

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	const handleChatHistory = () => {
		setIsOpen(false);
		navigate("/chat/history");
	};

	const handleProfile = () => {
		setIsOpen(false);
		navigate("/profile");
	};

	const handleSettings = () => {
		setIsOpen(false);
		navigate("/settings");
	};

	const handleAdmin = () => {
		setIsOpen(false);
		navigate("/admin");
	};

	const handleDealer = () => {
		setIsOpen(false);
		navigate("/dealer");
	};

	const handleLogout = () => {
		setIsOpen(false);
		setShowLogoutModal(true);
	};

	const confirmLogout = () => {
		setShowLogoutModal(false);
		logout();
	};

	const cancelLogout = () => {
		setShowLogoutModal(false);
	};

	return (
		<>
			<div className="relative" ref={menuRef}>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
					aria-label="User menu"
				>
					<PersonIcon className="w-5 h-5 text-gray-700" />
				</button>

				{isOpen && (
					<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
						<button
							onClick={handleProfile}
							className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 transition-colors"
						>
							<PersonIcon className="w-4 h-4" />
							Profile
						</button>
						<button
							onClick={handleChatHistory}
							className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 transition-colors"
						>
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Chat History
						</button>
						<button
							onClick={handleSettings}
							className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 transition-colors"
						>
							<GearIcon className="w-4 h-4" />
							Settings
						</button>
						{isAdmin && (
							<>
								<div className="border-t border-gray-200 my-1" />
								<button
									onClick={handleAdmin}
									className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 transition-colors text-indigo-600"
								>
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
										/>
									</svg>
									Admin Dashboard
								</button>
							</>
						)}
						{isDealer && (
							<>
								{!isAdmin && <div className="border-t border-gray-200 my-1" />}
								<button
									onClick={handleDealer}
									className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 transition-colors text-green-600"
								>
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
										/>
									</svg>
									Dealer Dashboard
								</button>
							</>
						)}
						<div className="border-t border-gray-200 my-1" />
						<button
							onClick={handleLogout}
							className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
						>
							<ExitIcon className="w-4 h-4" />
							Logout
						</button>
					</div>
				)}
			</div>
			<LogoutModal
				isOpen={showLogoutModal}
				onConfirm={confirmLogout}
				onCancel={cancelLogout}
			/>
		</>
	);
};

export { UserMenu };
