import { ArrowLeftIcon, EnvelopeClosedIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { FormEvent } from "react";

interface ContactDealerFormData {
	senderName: string;
	senderEmail: string;
	senderPhone: string;
	message: string;
}

interface ContactDealerUIProps {
	dealerEmail: string;
	carName: string;
	formData: ContactDealerFormData;
	loading: boolean;
	success: boolean;
	onFormChange: (field: keyof ContactDealerFormData, value: string) => void;
	onSubmit: (e: FormEvent) => void;
	onBack: () => void;
}

const ContactDealerUI = ({
	dealerEmail,
	carName,
	formData,
	loading,
	success,
	onFormChange,
	onSubmit,
	onBack,
}: ContactDealerUIProps) => {
	if (!dealerEmail) {
		return (
			<div className="h-full flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<p className="text-gray-600 mb-4">No dealer email specified</p>
					<button
						onClick={onBack}
						className="text-blue-600 hover:text-blue-700"
					>
						Go back home
					</button>
				</div>
			</div>
		);
	}

	if (success) {
		return (
			<div className="h-full flex items-center justify-center bg-gray-50">
				<div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
					<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
						</svg>
					</div>
					<h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
					<p className="text-gray-600">The dealer will contact you soon.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="h-full bg-linear-to-b from-blue-50 to-white overflow-y-auto">
			<div className="max-w-2xl mx-auto p-6">
				{/* Header */}
				<div className="mb-6">
					<button
						onClick={onBack}
						className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
					>
						<ArrowLeftIcon className="w-5 h-5" />
						<span className="font-medium">Back to Chat</span>
					</button>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Dealer</h1>
					<p className="text-gray-600">Send a message about: <span className="font-semibold">{carName}</span></p>
				</div>

				{/* Form */}
				<form onSubmit={onSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-5">
					{/* Dealer Email (readonly) */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Dealer Email
						</label>
						<div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
							<EnvelopeClosedIcon className="w-4 h-4 text-gray-500" />
							<input
								type="email"
								value={dealerEmail}
								readOnly
								className="flex-1 bg-transparent outline-none text-gray-700"
							/>
						</div>
					</div>

					{/* Sender Name */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Your Name <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							required
							value={formData.senderName}
							onChange={(e) => onFormChange("senderName", e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
							placeholder="Enter your name"
						/>
					</div>

					{/* Sender Email */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Your Email <span className="text-red-500">*</span>
						</label>
						<input
							type="email"
							required
							value={formData.senderEmail}
							onChange={(e) => onFormChange("senderEmail", e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
							placeholder="Enter your email"
						/>
					</div>

					{/* Phone Number */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Phone Number (optional)
						</label>
						<input
							type="tel"
							value={formData.senderPhone}
							onChange={(e) => onFormChange("senderPhone", e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
							placeholder="Enter your phone number"
						/>
					</div>

					{/* Message */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Message <span className="text-red-500">*</span>
						</label>
						<textarea
							required
							rows={6}
							value={formData.message}
							onChange={(e) => onFormChange("message", e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
							placeholder="Enter your message"
						/>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
					>
						{loading ? (
							<>
								<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
								Sending...
							</>
						) : (
							<>
								<PaperPlaneIcon className="w-4 h-4" />
								Send Message
							</>
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export { ContactDealerUI };
