/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import type { PathRouteProps } from "react-router-dom";
import { Routes as RoutePaths } from "./routes";
import { ChatPage, LoginPage, SignupPage, ChatHistoryPage } from "pages";
import { AppLayout } from "layouts";

export interface RouteBuilderItem extends PathRouteProps {
  Element: React.FC;
  Layout?: React.FC<any>;
  props?: any;
  isProtected?: boolean;
}

export const RouteBuilder: RouteBuilderItem[] = [
  {
    path: RoutePaths.chat,
    Element: ChatPage,
    isProtected: true,
    Layout: AppLayout,
  },
  {
    path: RoutePaths.chatHistory,
    Element: ChatHistoryPage,
    isProtected: true,
    Layout: AppLayout,
  },
  {
    path: RoutePaths.login,
    Element: LoginPage,
  },
  {
    path: RoutePaths.signup,
    Element: SignupPage,
  },
];
