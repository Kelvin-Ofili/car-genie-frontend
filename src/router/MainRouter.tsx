import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "lib";
import { RouteBuilder } from "./routeBuilder";
import { ProtectedRoute } from "./protectedRoute";

/**
 * MAIN ROUTER COMPONENT
 *
 * ===============================================
 *
 * This component houses all routes and their respective layouts.
 * To add a route navigate to the route builder and add to the existing list.
 *
 */

const MainRouter: React.FC = () => {
	return (
		<Routes>
			{RouteBuilder?.length > 0 &&
				RouteBuilder.map((item, idx) => {
					const {
						Element,
						path,
						caseSensitive,
						Layout,
						isProtected,
					} = item;

					// Create the inner element
					const inner = <Element />;

					// Apply layout if provided
					const withLayout = Layout ? <Layout>{inner}</Layout> : inner;

					// Apply protection if needed
					const guarded = isProtected ? (
						<ProtectedRoute>{withLayout}</ProtectedRoute>
					) : (
						withLayout
					);

					// Wrap with error boundary
					const element = <ErrorBoundary>{guarded}</ErrorBoundary>;
					return (
						<Route
							key={idx}
							path={path}
							element={element}
							caseSensitive={caseSensitive}
						/>
					);
				})}
		</Routes>
	);
};

export { MainRouter };
