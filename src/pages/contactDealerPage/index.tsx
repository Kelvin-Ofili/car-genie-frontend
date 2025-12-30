import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "constants";
import { ArrowLeftIcon, EnvelopeClosedIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

const ContactDealerPage = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	
	const dealerEmail = searchParams.get("email") || "";
	const carName = searchParams.get("car") || "";
	
	const [formData, setFormData] = useState({
		senderName: "",
		senderEmail: user?.email || "",
		senderPhone: "",
		message: `Hi, I'm interested in the ${carName}. Could you please provide more details?`,
	});
	
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		// Simulate sending email (replace with actual API call)
		setTimeout(() => {
			setLoading(false);
			setSuccess(true);
			setTimeout(() => {
				navigate("/");
			}, 2000);
		}, 1500);
	};

	if (!dealerEmail) {
		return (
			<div className="h-full flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<p className="text-gray-600 mb-4">No dealer email specified</p>
					<button
						onClick={() => navigate("/")}
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
						onClick={() => navigate("/")}
						className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
					>
						<ArrowLeftIcon className="w-5 h-5" />
						<span className="font-medium">Back to Chat</span>
					</button>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Dealer</h1>
					<p className="text-gray-600">Send a message about: <span className="font-semibold">{carName}</span></p>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-5">
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
							onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
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
							onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
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
							onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
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
							onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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

export { ContactDealerPage };
