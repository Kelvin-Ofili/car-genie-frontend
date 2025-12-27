import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import type { Message, CarRecommendation } from "types";
import { ChatHistoryModule } from "modules";

interface BackendDealer {
  name: string;
  email: string;
}

interface BackendRecommendation {
  id: string;
  name: string;
  color?: string;
  price: number;
  dealer: BackendDealer;
}

interface BackendMessage {
  id: string;
  userMessage: string;
  assistantReply: string;
  recommendations?: BackendRecommendation[];
  createdAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
}

interface BackendHistoryResponse {
  messages?: BackendMessage[];
}

const ChatHistoryPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const user = auth.currentUser;
        if (!user) {
          setError("You need to be signed in to see history.");
          return;
        }

        const token = await user.getIdToken();

        const res = await fetch("http://localhost:4000/chat/history", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 429) {
          setError("LLM quota exceeded, please try later.");
          return;
        }

        if (res.status >= 500) {
          setError("Server error while loading history. Please try again later.");
          return;
        }

        if (!res.ok) {
          setError("Failed to load chat history.");
          return;
        }

        const data = (await res.json()) as BackendHistoryResponse;

        const flattened: Message[] = [];

        (data.messages ?? []).forEach((item) => {
          // User message
          flattened.push({
            id: `${item.id}-user`,
            role: "user",
            content: item.userMessage,
          });

          // Assistant message with mapped recommendations
          let mappedRecs: CarRecommendation[] | undefined;
          if (item.recommendations && item.recommendations.length > 0) {
            mappedRecs = item.recommendations.map((car, idx) => ({
              id: car.id ?? `${item.id}-rec-${idx}`,
              name: car.name,
              price: `₦${car.price.toLocaleString("en-NG")}`,
              dealershipEmail: car.dealer.email,
              description: `${car.dealer.name}${car.color ? ` · ${car.color}` : ""}`,
            }));
          }

          flattened.push({
            id: `${item.id}-assistant`,
            role: "assistant",
            content: item.assistantReply,
            recommendations: mappedRecs,
          });
        });

        setMessages(flattened);
      } catch (err) {
        console.error(err);
        setError("Unexpected error while loading history.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  return <ChatHistoryModule messages={messages} loading={loading} error={error} />;
};

export { ChatHistoryPage };
