import { FormEvent } from "react";
import { Link } from "react-router-dom";

interface SignupUIProps {
	email: string;
	password: string;
	confirmPassword: string;
	loading: boolean;
	error: string | null;
	onEmailChange: (value: string) => void;
	onPasswordChange: (value: string) => void;
	onConfirmPasswordChange: (value: string) => void;
	onSubmit: (e: FormEvent) => void;
}

const SignupUI = ({
	email,
	password,
	confirmPassword,
	loading,
	error,
	onEmailChange,
	onPasswordChange,
	onConfirmPasswordChange,
	onSubmit,
}: SignupUIProps) => {
	return (
		<div className="h-screen bg-gray-100 flex items-center justify-center">
			<div className="w-full max-w-md bg-white rounded-xl shadow p-8">
				<h1 className="text-2xl font-semibold mb-6 text-center">
					Create account
				</h1>

				{error && (
					<div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
						{error}
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

					<div>
						<label
							className="block text-sm font-medium mb-1"
							htmlFor="confirmPassword"
						>
							Confirm password
						</label>
						<input
							id="confirmPassword"
							type="password"
							value={confirmPassword}
							onChange={(e) => onConfirmPasswordChange(e.target.value)}
							className="w-full border rounded px-3 py-2 text-sm"
							placeholder="••••••••"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-black text-white py-2 rounded mt-2 disabled:opacity-70"
					>
						{loading ? "Creating account..." : "Sign up"}
					</button>
				</form>

				<p className="mt-4 text-sm text-center text-gray-600">
					Already have an account?{" "}
					<Link className="text-black underline" to="/login">
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
};

export { SignupUI };
