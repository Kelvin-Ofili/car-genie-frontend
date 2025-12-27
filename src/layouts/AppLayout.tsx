import { useNavigate } from "react-router-dom";
import { useAuth } from "constants";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="h-screen flex flex-col">
			{/* Header */}
			<header className="h-14 flex items-center justify-between px-4 border-b">
				<h1 className="font-semibold">CarMatch</h1>
				<div className="flex items-center gap-3">
					<button
						onClick={() => navigate("/chat/history")}
						className="text-sm text-blue-600"
					>
						See history
					</button>
					<button onClick={logout} className="text-sm text-red-600">
						Logout
					</button>
				</div>
			</header>

			{/* Main */}
			<main className="flex-1">{children}</main>
		</div>
	);
};

export { AppLayout };
