import { FormEvent } from "react";
import { ArrowLeftIcon, PersonIcon, EnvelopeClosedIcon, MobileIcon } from "@radix-ui/react-icons";
import { User } from "types";
import { RoleBadge } from "components";

interface SettingsUIProps {
	user: User | null;
	phoneNumber: string;
	loading: boolean;
	success: boolean;
	error: string | null;
	onPhoneNumberChange: (value: string) => void;
	onSubmit: (e: FormEvent) => void;
	onBack: () => void;
}

const SettingsUI = ({
	user,
	phoneNumber,
	loading,
	success,
	error,
	onPhoneNumberChange,
	onSubmit,
	onBack,
}: SettingsUIProps) => {
	if (!user) {
		return (
			<div className="h-full flex items-center justify-center bg-gray-50">
				<p className="text-gray-500">Please sign in to access settings</p>
			</div>
		);
	}

	return (
		<div className="h-full bg-gray-50 overflow-y-auto">
			<div className="max-w-2xl mx-auto p-6">
				{/* Header */}
				<div className="mb-6">
					<button
						onClick={onBack}
						className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
					>
						<ArrowLeftIcon className="w-5 h-5" />
						<span className="font-medium">Back</span>
					</button>
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">Settings</h1>
							<p className="text-gray-600 mt-2">Manage your account information</p>
						</div>
						<RoleBadge />
					</div>
				</div>

				{/* Profile Info (Read-only) */}
				<div className="bg-white rounded-xl shadow-lg p-6 mb-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
					
					<div className="space-y-4">
						{/* Display Name */}
						<div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
							<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
								<PersonIcon className="w-5 h-5 text-blue-600" />
							</div>
							<div className="flex-1">
								<p className="text-sm font-medium text-gray-600">Full Name</p>
								<p className="text-lg font-semibold text-gray-900 mt-1">
									{user.displayName || "Not set"}
								</p>
							</div>
						</div>

						{/* Email */}
						<div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
							<div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
								<EnvelopeClosedIcon className="w-5 h-5 text-purple-600" />
							</div>
							<div className="flex-1">
								<p className="text-sm font-medium text-gray-600">Email Address</p>
								<p className="text-lg font-semibold text-gray-900 mt-1">
									{user.email || "Not set"}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Phone Number Update Form */}
				<div className="bg-white rounded-xl shadow-lg p-6">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
							<MobileIcon className="w-5 h-5 text-green-600" />
						</div>
						<div>
							<h2 className="text-lg font-semibold text-gray-900">Phone Number</h2>
							<p className="text-sm text-gray-600">
								{user.phoneNumber ? "Update your phone number" : "Add your phone number"}
							</p>
						</div>
					</div>

					{success && (
						<div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
							Phone number updated successfully!
						</div>
					)}

					{error && (
						<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
							{error}
						</div>
					)}

					<form onSubmit={onSubmit} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phoneNumber">
								Phone Number
							</label>
							<input
								id="phoneNumber"
								type="tel"
								value={phoneNumber}
								onChange={(e) => onPhoneNumberChange(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
								placeholder="+234 800 000 0000"
							/>
							<p className="text-xs text-gray-500 mt-2">
								Include country code (e.g., +234 for Nigeria, +1 for USA)
							</p>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
						>
							{loading ? (
								<>
									<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
									Updating...
								</>
							) : (
								<>
									<MobileIcon className="w-4 h-4" />
									{user.phoneNumber ? "Update Phone Number" : "Add Phone Number"}
								</>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export { SettingsUI };
