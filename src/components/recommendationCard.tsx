import { CarRecommendation } from "../types/chat";
import { useNavigate } from "react-router-dom";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";

const RecommendationCard = ({ car }: { car: CarRecommendation }) => {
	const navigate = useNavigate();

	const handleContactDealer = () => {
		navigate(`/contact-dealer?email=${encodeURIComponent(car.dealershipEmail)}&car=${encodeURIComponent(car.name)}`);
	};

	return (
		<div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
			{/* Car Image */}
			{car.imageUrl ? (
				<img
					src={car.imageUrl}
					alt={car.name}
					className="w-full h-48 object-cover"
					onError={(e) => {
						// Fallback if image fails to load
						e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='18' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3E%F0%9F%9A%97 No Image%3C/text%3E%3C/svg%3E";
					}}
				/>
			) : (
				<div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
					<span className="text-6xl">🚗</span>
				</div>
			)}

			{/* Car Details */}
			<div className="p-4">
				<h3 className="font-bold text-lg text-gray-900 mb-1">{car.name}</h3>
				<p className="text-sm text-gray-600 mb-2">{car.description}</p>
				<p className="text-xl font-bold text-blue-600 mb-3">{car.price}</p>

				<button
					onClick={handleContactDealer}
					className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
				>
					<EnvelopeClosedIcon className="w-4 h-4" />
					Contact Dealer
				</button>
			</div>
		</div>
	);
};
export { RecommendationCard };
