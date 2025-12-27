import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import { ErrorBoundary } from "lib";
import { RouteBuilder } from "./routeBuilder";
import { ProtectedRoute } from "./protectedRoute";

const MainRouter: React.FC = () => {
	return (
		<RouterRoutes>
			{RouteBuilder.map((item, idx) => {
				const {
					Element,
					path,
					caseSensitive,
					Layout,
					props,
					isProtected,
				} = item;

				const inner = <Element />;
				const guarded = isProtected ? (
					<ProtectedRoute>{inner}</ProtectedRoute>
				) : (
					inner
				);

				const boundaryElement = (
					<ErrorBoundary
						fallbackRender={({ error }) => <div>{error.message}</div>}
					>
						{guarded}
					</ErrorBoundary>
				);

				const element = Layout ? (
					<Layout {...props}>{boundaryElement}</Layout>
				) : (
					boundaryElement
				);

				return (
					<Route
						key={idx}
						path={path}
						element={element}
						caseSensitive={caseSensitive}
					/>
				);
			})}
		</RouterRoutes>
	);
};

export { MainRouter };
