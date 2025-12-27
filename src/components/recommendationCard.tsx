import { CarRecommendation } from "../types/chat";

const RecommendationCard = ({ car }: { car: CarRecommendation }) => {
	return (
		<div className="border rounded-lg p-3 mb-2">
			<h3 className="font-semibold">{car.name}</h3>
			<p className="text-sm text-gray-600">{car.description}</p>
			<p className="mt-1 font-medium">{car.price}</p>

			<button className="mt-2 w-full bg-black text-white py-1 rounded">
				Contact Dealer
			</button>
		</div>
	);
};
export { RecommendationCard };
