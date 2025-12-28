import { FormEvent } from "react";
import { Link } from "react-router-dom";

interface LoginModuleProps {
	email: string;
	password: string;
	loading: boolean;
	error: string | null;
	infoMessage: string | null;
	onEmailChange: (value: string) => void;
	onPasswordChange: (value: string) => void;
	onSubmit: (e: FormEvent) => void;
	onForgotPassword: () => void;
}

const LoginModule = ({
	email,
	password,
	loading,
	error,
	infoMessage,
	onEmailChange,
	onPasswordChange,
	onSubmit,
	onForgotPassword,
}: LoginModuleProps) => {
	return (
		<div className="bg-gray-100 flex items-center justify-center">
			<div className="w-full max-w-md bg-white rounded-xl shadow p-8">
				<h1 className="text-2xl font-semibold mb-6 text-center">Sign in</h1>

				{error && (
					<div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
						{error}
					</div>
				)}

				{infoMessage && (
					<div className="mb-4 text-sm text-green-600 bg-green-50 border border-green-100 rounded px-3 py-2">
						{infoMessage}
					</div>
				)}

				<form onSubmit={onSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="email">
							Email
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => onEmailChange(e.target.value)}
							className="w-full border rounded px-3 py-2 text-sm"
							placeholder="you@example.com"
						/>
					</div>

					<div>
						<label
							className="block text-sm font-medium mb-1"
							htmlFor="password"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => onPasswordChange(e.target.value)}
							className="w-full border rounded px-3 py-2 text-sm"
							placeholder="••••••••"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-black text-white py-2 rounded mt-2 disabled:opacity-70"
					>
						{loading ? "Signing in..." : "Sign in"}
					</button>
				</form>

				<button
					type="button"
					onClick={onForgotPassword}
					disabled={loading}
					className="mt-4 w-full text-sm text-gray-700 hover:underline text-center"
				>
					Forgot password?
				</button>

				<p className="mt-4 text-sm text-center text-gray-600">
					Don&apos;t have an account?{" "}
					<Link className="text-black underline" to="/signup">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
};

export { LoginModule };
