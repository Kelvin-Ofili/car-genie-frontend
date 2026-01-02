import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "constants/useAuth";
import { SignupUI } from "modules";

// Validate phone number format
const validatePhoneNumber = (phone: string): boolean => {
	if (!phone) return true; // Optional field
	// Check if starts with + and contains only digits and spaces after that
	const phoneRegex = /^\+\d{1,4}\s?\d{3,}$/;
	return phoneRegex.test(phone.replace(/\s/g, ""));
};

const SignupPage = () => {
	const { signup } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);

		if (!displayName.trim()) {
			setError("Please enter your full name.");
			return;
		}

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

		if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
			setError("Invalid phone number format. Please include country code (e.g., +234 800 000 0000).");
			return;
		}

		try {
			setLoading(true);
			await signup(email, password, displayName.trim(), phoneNumber.trim() || undefined);
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
		<SignupUI
			email={email}
			password={password}
			confirmPassword={confirmPassword}
			displayName={displayName}
			phoneNumber={phoneNumber}
			loading={loading}
			error={error}
			onEmailChange={setEmail}
			onPasswordChange={setPassword}
			onConfirmPasswordChange={setConfirmPassword}
			onDisplayNameChange={setDisplayName}
			onPhoneNumberChange={setPhoneNumber}
			onSubmit={handleSubmit}
		/>
	);
};

export { SignupPage };
