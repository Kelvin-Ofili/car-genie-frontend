import { Message } from "../types/chat";

const MessageBubble = ({ message }: { message: Message }) => {
	const isUser = message.role === "user";

	return (
		<div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
			<div
				className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-sm ${
					isUser
						? "bg-blue-600 text-white"
						: "bg-white text-gray-900 border border-gray-200"
				}`}
			>
				<p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
			</div>
		</div>
	);
};

export { MessageBubble };
