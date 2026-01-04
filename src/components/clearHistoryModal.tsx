import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface ClearHistoryModalProps {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
	isClearing: boolean;
}

const ClearHistoryModal = ({ isOpen, onConfirm, onCancel, isClearing }: ClearHistoryModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={isClearing ? undefined : onCancel}
			/>

			{/* Modal */}
			<div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
				<div className="flex flex-col items-center text-center">
					{/* Icon */}
					<div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
						<ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
					</div>

					{/* Title */}
					<h2 className="text-xl font-bold text-gray-900 mb-2">
						Clear Chat History
					</h2>

					{/* Message */}
					<p className="text-gray-600 mb-6">
						Are you sure you want to clear all chat history? This action cannot be undone and all your conversations will be permanently deleted.
					</p>

					{/* Buttons */}
					<div className="flex gap-3 w-full">
						<button
							onClick={onCancel}
							disabled={isClearing}
							className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Cancel
						</button>
						<button
							onClick={onConfirm}
							disabled={isClearing}
							className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isClearing ? "Clearing..." : "Clear All"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export { ClearHistoryModal };
