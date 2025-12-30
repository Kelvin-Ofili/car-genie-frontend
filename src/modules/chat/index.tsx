import { Message } from "types";
import { MessageBubble, RecommendationCard } from "components";

interface ChatUIProps {
	messages: Message[];
	loading: boolean;
	input: string;
	onInputChange: (value: string) => void;
	onSend: () => void;
}

const ChatUI = ({
	messages,
	loading,
	input,
	onInputChange,
	onSend,
}: ChatUIProps) => {
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSend();
		}
	};

	return (
		<div className="h-full flex flex-col bg-linear-to-b from-blue-50 to-white">
			{/* Messages Area */}
			<div className="flex-1 overflow-y-auto px-4 py-6">
				<div className="max-w-3xl mx-auto">
					{messages.length === 0 && (
						<div className="text-center py-12">
							<h2 className="text-2xl font-semibold text-gray-700 mb-2">
								Welcome to CarMatch
							</h2>
							<p className="text-gray-500">
								Describe your ideal car and I'll help you find it
							</p>
						</div>
					)}

					{messages.map((msg) => (
						<div key={msg.id}>
							<MessageBubble message={msg} />

							{msg.recommendations && (
								<div className="ml-2 mt-2 space-y-2">
									{msg.recommendations.map((car) => (
										<RecommendationCard key={car.id} car={car} />
									))}
								</div>
							)}
						</div>
					))}

					{loading && (
						<div className="flex justify-start">
							<div className="bg-white px-4 py-3 rounded-2xl shadow-sm">
								<div className="flex gap-1">
									<div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
									<div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
									<div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Input Area - Fixed at Bottom */}
			<div className="border-t bg-white px-4 py-4">
				<div className="max-w-3xl mx-auto flex gap-3">
					<input
						value={input}
						onChange={(e) => onInputChange(e.target.value)}
						onKeyPress={handleKeyPress}
						className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="Describe the car you want..."
						disabled={loading}
					/>
					<button
						onClick={onSend}
						disabled={loading || !input.trim()}
						className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export { ChatUI };
