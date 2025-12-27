export type MessageRole = "user" | "assistant";

export type CarRecommendation = {
	id: string;
	name: string;
	price: string;
	dealershipEmail: string;
	description: string;
};

export type Message = {
	id: string;
	role: MessageRole;
	content: string;
	recommendations?: CarRecommendation[];
};
