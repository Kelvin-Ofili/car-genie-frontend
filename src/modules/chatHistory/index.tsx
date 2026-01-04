import { Message } from "types";
import { MessageBubble, RecommendationCard } from "components";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, MagnifyingGlassIcon, TrashIcon } from "@radix-ui/react-icons";

interface ChatHistoryUIProps {
	messages: Message[];
	loading: boolean;
	error: string | null;
	searchQuery: string;
	onSearchChange: (query: string) => void;
	onClearHistory: () => void;
	isClearing: boolean;
}

const ChatHistoryUI = ({
	messages,
	loading,
	error,
	searchQuery,
	onSearchChange,
	onClearHistory,
	isClearing,
}: ChatHistoryUIProps) => {
	const navigate = useNavigate();

	return (
		<div className="h-full bg-linear-to-b from-blue-50 to-white flex flex-col p-4">
			<div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg flex flex-col h-full">
				<div className="p-4 border-b flex items-center gap-3">
					<button
						onClick={() => navigate("/")}
						className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
					>
						<ArrowLeftIcon className="w-5 h-5" />
						<span className="text-sm font-medium">Back</span>
					</button>
					<span className="font-semibold text-lg flex-1">Chat History</span>
					<button
						onClick={onClearHistory}
						disabled={isClearing || loading || messages.length === 0}
						className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<TrashIcon className="w-4 h-4" />
						{isClearing ? "Clearing..." : "Clear All"}
					</button>
				</div>

				{/* Search Bar */}
				<div className="p-4 border-b">
					<div className="relative">
						<MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
						<input
							type="text"
							placeholder="Search messages..."
							value={searchQuery}
							onChange={(e) => onSearchChange(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
					{searchQuery && (
						<p className="text-xs text-gray-500 mt-2">
							Showing {messages.length} result{messages.length !== 1 ? "s" : ""}
						</p>
					)}
				</div>

				<div className="flex-1 p-4 overflow-y-auto">
					{loading && (
						<p className="text-sm text-gray-500">Loading history...</p>
					)}

					{!loading && error && (
						<p className="text-sm text-red-600 mb-2">{error}</p>
					)}

					{!loading && !error && messages.length === 0 && !searchQuery && (
						<p className="text-sm text-gray-500">No history yet.</p>
					)}

					{!loading && !error && messages.length === 0 && searchQuery && (
						<p className="text-sm text-gray-500">No messages match your search.</p>
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

export { ChatHistoryUI };
