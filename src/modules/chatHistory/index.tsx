import { Message } from "types";
import { MessageBubble, RecommendationCard } from "components";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

interface ChatHistoryUIProps {
	messages: Message[];
	loading: boolean;
	error: string | null;
}

const ChatHistoryUI = ({
	messages,
	loading,
	error,
}: ChatHistoryUIProps) => {
	const navigate = useNavigate();

	return (
		<div className="h-full bg-gradient-to-b from-blue-50 to-white flex flex-col p-4">
			<div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg flex flex-col h-full">
				<div className="p-4 border-b flex items-center gap-3">
					<button
						onClick={() => navigate("/")}
						className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
					>
						<ArrowLeftIcon className="w-5 h-5" />
						<span className="text-sm font-medium">Back</span>
					</button>
					<span className="font-semibold text-lg">Chat History</span>
				</div>

				<div className="flex-1 p-4 overflow-y-auto">
					{loading && (
						<p className="text-sm text-gray-500">Loading history...</p>
					)}

					{!loading && error && (
						<p className="text-sm text-red-600 mb-2">{error}</p>
					)}

					{!loading && !error && messages.length === 0 && (
						<p className="text-sm text-gray-500">No history yet.</p>
					)}

					{messages.map((msg) => (
						<div key={msg.id}>
							<MessageBubble message={msg} />

							{msg.recommendations && (
								<div className="ml-2 mt-2">
									{msg.recommendations.map((car) => (
										<RecommendationCard key={car.id} car={car} />
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export { ChatHistoryUI };
