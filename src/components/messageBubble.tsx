import { Message } from "../types/chat";

const MessageBubble = ({ message }: { message: Message }) => {
	const isUser = message.role === "user";

	return (
		<div className={`mb-3 flex ${isUser ? "justify-end" : "justify-start"}`}>
			<div
				className={`max-w-[70%] px-4 py-2 rounded-lg ${
					isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
				}`}
			>
				{message.content}
			</div>
		</div>
	);
};

export { MessageBubble };
