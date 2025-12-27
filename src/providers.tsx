import { AuthProvider } from "providers/AuthProvider";
import { ChatProvider } from "providers/ChatProvider";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";


const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ChatProvider>{children}</ChatProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default Providers;
