import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "constants/useAuth";
import { SignupModule } from "modules";

const SignupPage = () => {
	const { signup } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);

		if (!email || !password) {
			setError("Please enter email and password.");
			return;
		}

		if (password.length < 6) {
			setError("Password must be at least 6 characters.");
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		try {
			setLoading(true);
			await signup(email, password);
			// Firebase automatically signs the user in after signup
			navigate("/", { replace: true });
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Failed to create account. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SignupModule
			email={email}
			password={password}
			confirmPassword={confirmPassword}
			loading={loading}
			error={error}
			onEmailChange={setEmail}
			onPasswordChange={setPassword}
			onConfirmPasswordChange={setConfirmPassword}
			onSubmit={handleSubmit}
		/>
	);
};

export { SignupPage };
