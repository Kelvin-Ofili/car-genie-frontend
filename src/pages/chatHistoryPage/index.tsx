import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import type { Message, CarRecommendation } from "types";
import { ChatHistoryUI} from "modules";
import { API_ENDPOINTS } from "config/api";
import { ClearHistoryModal } from "components";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isClearing, setIsClearing] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const loadHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user) {
        setError("You need to be signed in to see history.");
        return;
      }

      const token = await user.getIdToken();

      const res = await fetch(API_ENDPOINTS.CHAT_HISTORY, {
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

  const handleClearHistoryClick = () => {
    setShowClearModal(true);
  };

  const confirmClearHistory = async () => {
    setIsClearing(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        setError("You need to be signed in.");
        setShowClearModal(false);
        return;
      }

      const token = await user.getIdToken();

      const res = await fetch(API_ENDPOINTS.CLEAR_CHAT_HISTORY, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to clear history");
      }

      setMessages([]);
      setShowClearModal(false);
    } catch (err) {
      console.error(err);
      setError("Failed to clear chat history. Please try again.");
      setShowClearModal(false);
    } finally {
      setIsClearing(false);
    }
  };

  const cancelClearHistory = () => {
    setShowClearModal(false);
  };

  useEffect(() => {
    void loadHistory();
  }, []);

  // Filter messages based on search query
  const filteredMessages = searchQuery
    ? messages.filter((msg) =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  return (
    <>
      <ChatHistoryUI
        messages={filteredMessages}
        loading={loading}
        error={error}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearHistory={handleClearHistoryClick}
        isClearing={isClearing}
      />
      <ClearHistoryModal
        isOpen={showClearModal}
        onConfirm={confirmClearHistory}
        onCancel={cancelClearHistory}
        isClearing={isClearing}
      />
    </>
  );
};

export { ChatHistoryPage };
