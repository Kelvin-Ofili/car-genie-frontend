import { Message } from "types";
import { MessageBubble, RecommendationCard } from "components";

interface ChatHistoryModuleProps {
	messages: Message[];
	loading: boolean;
	error: string | null;
}

const ChatHistoryModule = ({
	messages,
	loading,
	error,
}: ChatHistoryModuleProps) => {
	return (
		<div className="bg-gray-100 flex items-center justify-center">
			<div className="w-full max-w-3xl bg-white rounded-xl shadow flex flex-col">
				<div className="p-4 border-b font-semibold">Chat history</div>

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

export { ChatHistoryModule };
