import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "constants";
import { ContactDealerUI } from "modules";

const ContactDealerPage = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	
	const dealerEmail = searchParams.get("email") || "";
	const carName = searchParams.get("car") || "";
	
	const [formData, setFormData] = useState({
		senderName: "",
		senderEmail: user?.email || "",
		senderPhone: "",
		message: `Hi, I'm interested in the ${carName}. Could you please provide more details?`,
	});
	
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		// Simulate sending email (replace with actual API call)
		setTimeout(() => {
			setLoading(false);
			setSuccess(true);
			setTimeout(() => {
				navigate("/");
			}, 2000);
		}, 1500);
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
