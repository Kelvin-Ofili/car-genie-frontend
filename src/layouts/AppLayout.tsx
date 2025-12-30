import { UserMenu } from "components";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-screen flex flex-col">
			{/* Header */}
			<header className="h-14 flex items-center justify-between px-4 border-b">
				<h1 className="font-semibold">CarMatch</h1>
				<UserMenu />
			</header>

			{/* Main */}
			<main className="flex-1 overflow-hidden">{children}</main>
		</div>
	);
};

export { AppLayout };
