import { useAuth } from "constants";
import { useNavigate } from "react-router-dom";
import { ProfileUI } from "modules";

const ProfilePage = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	const formatDate = (dateString: string | null) => {
		if (!dateString) return "N/A";
		
		const date = new Date(dateString);
		return date.toLocaleString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<ProfileUI
			user={user}
			onBack={() => navigate("/")}
			formatDate={formatDate}
		/>
	);
};

export { ProfilePage };
