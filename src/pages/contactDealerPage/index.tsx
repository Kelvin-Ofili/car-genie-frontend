import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "constants";
import { ContactDealerUI } from "modules";
import { API_ENDPOINTS } from "config/api";
import { auth } from "../../firebase";

const ContactDealerPage = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	
	const dealerEmail = searchParams.get("email") || "";
	const carName = searchParams.get("car") || "";
	
	const [formData, setFormData] = useState({
		senderName: user?.displayName || "",
		senderEmail: user?.email || "",
		senderPhone: user?.phoneNumber || "",
		message: `Hi, I'm interested in the ${carName}. Could you please provide more details?`,
	});
	
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				alert("You must be signed in to contact dealers.");
				setLoading(false);
				return;
			}

			const token = await currentUser.getIdToken();

			const res = await fetch(API_ENDPOINTS.SEND_EMAIL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					dealerEmail,
					carName,
					senderName: formData.senderName,
					senderEmail: formData.senderEmail,
					senderPhone: formData.senderPhone,
					message: formData.message,
				}),
			});

			console.log("Email API Response Status:", res.status);

			if (!res.ok) {
				const errorText = await res.text();
				console.error("Email API Error:", errorText);
				
				try {
					const errorData = JSON.parse(errorText);
					throw new Error(errorData.error || `Server error (${res.status})`);
				} catch {
					throw new Error(`Failed to send email. Server returned: ${res.status} - ${errorText || 'No details'}`);
				}
			}

			setSuccess(true);
			setTimeout(() => {
				navigate("/");
			}, 2000);
		} catch (err) {
			console.error("Error sending email:", err);
			alert(
				err instanceof Error
					? err.message
					: "Failed to send message. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	const handleFormChange = (field: keyof typeof formData, value: string) => {
		setFormData({ ...formData, [field]: value });
	};

	return (
		<ContactDealerUI
			dealerEmail={dealerEmail}
			carName={carName}
			formData={formData}
			loading={loading}
			success={success}
			onFormChange={handleFormChange}
			onSubmit={handleSubmit}
			onBack={() => navigate("/")}
		/>
	);
};

export { ContactDealerPage };
