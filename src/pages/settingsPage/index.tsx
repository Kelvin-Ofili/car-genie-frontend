import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "constants";
import { SettingsUI } from "modules";
import { db, auth } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

// Validate phone number format
const validatePhoneNumber = (phone: string): boolean => {
	if (!phone) return false;
	// Check if starts with + and contains only digits and spaces after that
	const phoneRegex = /^\+\d{1,4}\s?\d{3,}$/;
	return phoneRegex.test(phone.replace(/\s/g, ""));
};

const SettingsPage = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	
	const [phoneNumber, setPhoneNumber] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (user?.phoneNumber) {
			setPhoneNumber(user.phoneNumber);
		}
	}, [user]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(false);

		if (!phoneNumber.trim()) {
			setError("Please enter a phone number.");
			return;
		}

		if (!validatePhoneNumber(phoneNumber)) {
			setError("Invalid phone number format. Please include country code (e.g., +234 800 000 0000).");
			return;
		}

		if (!auth.currentUser) {
			setError("You must be signed in to update your profile.");
			return;
		}

		try {
			setLoading(true);
			
			// Update Firestore
			const userDocRef = doc(db, "users", auth.currentUser.uid);
			await updateDoc(userDocRef, {
				phoneNumber: phoneNumber.trim(),
				updatedAt: new Date().toISOString(),
			});

			setSuccess(true);
			
			// Refresh page to update user context
			setTimeout(() => {
				window.location.reload();
			}, 1500);
		} catch (err) {
			console.error("Error updating phone number:", err);
			setError(
				err instanceof Error
					? err.message
					: "Failed to update phone number. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SettingsUI
			user={user}
			phoneNumber={phoneNumber}
			loading={loading}
			success={success}
			error={error}
			onPhoneNumberChange={setPhoneNumber}
			onSubmit={handleSubmit}
			onBack={() => navigate("/")}
		/>
	);
};

export { SettingsPage };
