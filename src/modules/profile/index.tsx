import { EnvelopeClosedIcon, CheckCircledIcon, CrossCircledIcon, CalendarIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { User } from "types";

interface ProfileUIProps {
	user: User | null;
	onBack: () => void;
	formatDate: (dateString: string | null) => string;
}

const ProfileUI = ({ user, onBack, formatDate }: ProfileUIProps) => {
	if (!user) {
		return (
			<div className="h-full flex items-center justify-center">
				<p className="text-gray-500">No user information available</p>
			</div>
		);
	}

	return (
		<div className="h-full bg-gray-50 flex items-center justify-center p-4">
			<div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
				{/* Header */}
				<div className="bg-linear-to-r from-blue-600 to-blue-700 px-8 py-12 text-white relative">
					<button
						onClick={onBack}
						className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-blue-100 transition-colors"
					>
						<ArrowLeftIcon className="w-5 h-5" />
						<span className="text-sm font-medium">Back</span>
					</button>
					<div className="flex items-center gap-4">
						<div>
							<h1 className="text-3xl font-bold">Profile</h1>
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="p-8 space-y-6">
					{/* Email */}
					<div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
						<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
							<EnvelopeClosedIcon className="w-5 h-5 text-blue-600" />
						</div>
						<div className="flex-1">
							<p className="text-sm font-medium text-gray-600">Email Address</p>
							<p className="text-lg font-semibold text-gray-900 mt-1">
								{user.email || "N/A"}
							</p>
						</div>
					</div>

					{/* Email Verification Status */}
					<div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
						<div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
							user.emailVerified ? "bg-green-100" : "bg-yellow-100"
						}`}>
							{user.emailVerified ? (
								<CheckCircledIcon className="w-5 h-5 text-green-600" />
							) : (
								<CrossCircledIcon className="w-5 h-5 text-yellow-600" />
							)}
						</div>
						<div className="">
							<p className="text-sm font-medium text-gray-600">Email Verification</p>
							<p className={`text-lg font-semibold mt-1 ${
								user.emailVerified ? "text-green" : "text-yellow-600"
							}`}>
								{user.emailVerified ? "Verified" : "Not Verified"}
							</p>
						</div>
					</div>

					{/* Account Created */}
					<div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
						<div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
							<CalendarIcon className="w-5 h-5 text-purple-600" />
						</div>
						<div className="flex-1">
							<p className="text-sm font-medium text-gray-600">Account Created</p>
							<p className="text-lg font-semibold text-gray-900 mt-1">
								{formatDate(user.createdAt)}
							</p>
						</div>
					</div>

					{/* Last Login */}
					<div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
						<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
							<CalendarIcon className="w-5 h-5 text-indigo-600" />
						</div>
						<div className="flex-1">
							<p className="text-sm font-medium text-gray-600">Last Login</p>
							<p className="text-lg font-semibold text-gray-900 mt-1">
								{formatDate(user.lastLoginAt)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { ProfileUI };
