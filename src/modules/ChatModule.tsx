import { Message } from "types";
import { MessageBubble, RecommendationCard } from "components";

interface ChatModuleProps {
	messages: Message[];
	loading: boolean;
	input: string;
	onInputChange: (value: string) => void;
	onSend: () => void;
}

const ChatModule = ({
	messages,
	loading,
	input,
	onInputChange,
	onSend,
}: ChatModuleProps) => {
	return (
		<div className="bg-gray-100 flex items-center justify-center">
			<div className="w-full max-w-3xl bg-white rounded-xl shadow flex flex-col">
				<div className="p-4 border-b font-semibold">Car Assistant</div>

				<div className="flex-1 p-4 overflow-y-auto">
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

					{loading && <p className="text-sm text-gray-500">Typing…</p>}
				</div>

				<div className="p-4 border-t flex gap-2">
					<input
						value={input}
						onChange={(e) => onInputChange(e.target.value)}
						className="flex-1 border rounded px-3 py-2"
						placeholder="Describe the car you want..."
					/>
					<button onClick={onSend} className="bg-black text-white px-4 rounded">
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export { ChatModule };
