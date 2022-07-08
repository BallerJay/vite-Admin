import React from "react";
import { useRoutes, Navigate, RouteObject } from "react-router-dom";
import NotFound from "@/components/ErrorMessage/404";
import lazyLoad from "./lazyLoad";

const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/home" />
	},
	{
		path: "/login",
		element: lazyLoad(React.lazy(() => import("@/views/login/index")))
	},

	{
		element: lazyLoad(React.lazy(() => import("@/layout/index"))),
		children: [
			{
				path: "/home",
				element: lazyLoad(React.lazy(() => import("@/views/home/index")))
			},
			{
				path: "/protable/usehooks",
				element: lazyLoad(React.lazy(() => import("@/views/proTable/useHooks/index")))
			},
			{
				path: "/protable/usecomponent",
				element: lazyLoad(React.lazy(() => import("@/views/proTable/useComponent/index")))
			},
			{
				path: "/datascreen",
				element: lazyLoad(React.lazy(() => import("@/views/dataScreen/index")))
			}
		]
	},
	{
		path: "*",
		element: <NotFound />
	}
];

const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
