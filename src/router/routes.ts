export const Routes = {
  chat: "/",
  login: "/login",
  signup: "/signup",
  chatHistory: "/chat/history",
} as const;

export type RouteKey = keyof typeof Routes;
