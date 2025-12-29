import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "constants/useAuth";
import { LoginUI } from "modules";

interface LocationState {
	from?: Location;
}

const LoginPage = () => {
	const { login, forgotPassword } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const state = location.state as LocationState | null;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		setMessage(null);

		if (!email || !password) {
			setError("Please enter email and password.");
			return;
		}

		try {
			setLoading(true);
			await login(email, password);
			const redirectTo = state?.from?.pathname || "/";
			navigate(redirectTo, { replace: true });
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Failed to sign in. Please check your credentials."
			);
		} finally {
			setLoading(false);
		}
	};

	const handleForgotPassword = async () => {
		setError(null);
		setMessage(null);

		if (!email) {
			setError("Enter your email to reset password.");
			return;
		}

		try {
			setLoading(true);
			await forgotPassword(email);
			setMessage(
				"Password reset email sent. Check your inbox, including spam."
			);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to send reset email."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<LoginUI
			email={email}
			password={password}
			loading={loading}
			error={error}
			infoMessage={message}
			onEmailChange={setEmail}
			onPasswordChange={setPassword}
			onSubmit={handleSubmit}
			onForgotPassword={handleForgotPassword}
		/>
	);
};

export { LoginPage };
