import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "constants";
import { PersonIcon, ExitIcon } from "@radix-ui/react-icons";

const UserMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { logout } = useAuth();
	const navigate = useNavigate();
	const menuRef = useRef<HTMLDivElement>(null);

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

	const handleLogout = () => {
		setIsOpen(false);
		logout();
	};

	return (
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
	);
};

export { UserMenu };
