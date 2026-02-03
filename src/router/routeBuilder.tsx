import type React from "react";
import type { PathRouteProps } from "react-router-dom";
import { Routes } from "./routes";
import { ChatPage, LoginPage, SignupPage, ChatHistoryPage, ProfilePage, ContactDealerPage, SettingsPage, AdminPage, AdminManagementPage, DealerDashboardPage } from "pages";
import { AppLayout } from "layouts";

// Route Builder Item Props
export interface RouteBuilderItem extends PathRouteProps {
	Element: React.FC;
	Layout?: React.FC<any>; // If you wish to add a layout to the page
	props?: any;
	isProtected?: boolean;
}

/**
 * ROUTE BUILDER
 *
 * ===============================================
 *
 * This is a list of all our application routes.
 *
 * A single item on this list contains the necessary Route props needed by React Router to do it's job.
 *
 * If you wish to add a new route to the application,
 * just fulfill all the necessary props needed by the RouteBuilder item. Ciao!
 *
 */

export const RouteBuilder: RouteBuilderItem[] = [
	{
		path: Routes.chat,
		Element: ChatPage,
		isProtected: true,
		Layout: AppLayout,
	},
	{
		path: Routes.chatHistory,
		Element: ChatHistoryPage,
		isProtected: true,
		Layout: AppLayout,
	},
	{
		path: Routes.profile,
		Element: ProfilePage,
		isProtected: true,
		Layout: AppLayout,
	},
	{
		path: Routes.contactDealer,
		Element: ContactDealerPage,
		isProtected: true,
		Layout: AppLayout,
	},
	{
		path: Routes.settings,
		Element: SettingsPage,
		isProtected: true,
		Layout: AppLayout,
	},
	{
		path: Routes.admin,
		Element: AdminPage,
		isProtected: true,
		Layout: AppLayout,
	},
	{
		path: Routes.adminManagement,
		Element: AdminManagementPage,
		isProtected: true,
		Layout: AppLayout,
	},
	{
		path: Routes.dealerDashboard,
		Element: DealerDashboardPage,
		isProtected: true,
		Layout: AppLayout,
	},
	{
		path: Routes.login,
		Element: LoginPage,
	},
	{
		path: Routes.signup,
		Element: SignupPage,
	},
];
