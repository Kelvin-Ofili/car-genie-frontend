import { useChat } from "constants";
import { useState } from "react";
import { ChatModule } from "modules";

const ChatPage = () => {
	const { messages, sendMessage, loading } = useChat();
	const [input, setInput] = useState("");

	const handleSend = () => {
		if (!input.trim()) return;
		sendMessage(input);
		setInput("");
	};

	return (
		<ChatModule
			messages={messages}
			loading={loading}
			input={input}
			onInputChange={setInput}
			onSend={handleSend}
		/>
	);
};

export { ChatPage };
