import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { API_ENDPOINTS } from "config/api";

interface HistoryDealer {
	name: string;
	email: string;
}

interface HistoryRecommendation {
	id: string;
	name: string;
	color?: string;
	price: number;
	dealer: HistoryDealer;
}

interface HistoryMessage {
	id: string;
	userMessage: string;
	assistantReply: string;
	recommendations?: HistoryRecommendation[];
	createdAt?: {
		_seconds: number;
		_nanoseconds: number;
	};
}

interface ChatHistoryPanelProps {
	open: boolean;
	onClose: () => void;
}

const ChatHistoryPanel = ({ open, onClose }: ChatHistoryPanelProps) => {
	const [items, setItems] = useState<HistoryMessage[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!open) return;

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
					setError(
						"Server error while loading history. Please try again later."
					);
					return;
				}

				if (!res.ok) {
					setError("Failed to load chat history.");
					return;
				}

				const data = (await res.json()) as { messages?: HistoryMessage[] };
				setItems(data.messages ?? []);
			} catch (err) {
				console.error(err);
				setError("Unexpected error while loading history.");
			} finally {
				setLoading(false);
			}
		};

		void load();
	}, [open]);

	if (!open) return null;

	const formatTimestamp = (item: HistoryMessage) => {
		if (!item.createdAt) return "";
		const millis =
			item.createdAt._seconds * 1000 +
			Math.floor(item.createdAt._nanoseconds / 1_000_000);
		const d = new Date(millis);
		return d.toLocaleString();
	};

	return (
		<div className="fixed inset-0 z-50 flex justify-end bg-black/40">
			<div className="w-full max-w-md h-full bg-white shadow-xl flex flex-col">
				<header className="h-14 flex items-center justify-between px-4 border-b">
					<h2 className="font-semibold text-sm">Recent chat history</h2>
					<button
						onClick={onClose}
						className="text-xs text-gray-500 hover:text-gray-800"
					>
						Close
					</button>
				</header>

				<div className="flex-1 overflow-y-auto p-4 text-sm">
					{loading && <p className="text-gray-500">Loading history...</p>}

					{!loading && error && <p className="text-red-600 mb-2">{error}</p>}

					{!loading && !error && items.length === 0 && (
						<p className="text-gray-500">No history yet.</p>
					)}

					{items.map((item) => (
						<div key={item.id} className="border rounded-lg p-3 mb-3">
							<div className="flex items-center justify-between mb-1">
								<span className="text-xs font-medium text-gray-600">
									{formatTimestamp(item)}
								</span>
							</div>

							<div className="mb-2">
								<p className="text-[13px] font-semibold text-gray-800 mb-1">
									You
								</p>
								<p className="text-[13px] text-gray-800">{item.userMessage}</p>
							</div>

							<div className="mb-2">
								<p className="text-[13px] font-semibold text-gray-800 mb-1">
									Assistant
								</p>
								<p className="text-[13px] text-gray-800">
									{item.assistantReply}
								</p>
							</div>

							{item.recommendations && item.recommendations.length > 0 && (
								<div className="mt-2 border-t pt-2">
									<p className="text-[12px] font-medium text-gray-700 mb-1">
										Recommended cars
									</p>
									{item.recommendations.map((car) => (
										<div
											key={car.id}
											className="text-[12px] text-gray-800 mb-1"
										>
											<span className="font-semibold">{car.name}</span>
											{car.color && <span className="ml-1">({car.color})</span>}
											<span className="ml-1">
												- ₦{car.price.toLocaleString("en-NG")}
											</span>
											<div className="text-gray-600">
												{car.dealer.name} • {car.dealer.email}
											</div>
										</div>
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

export { ChatHistoryPanel };
