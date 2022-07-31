import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import NotFound from "@/components/ErrorMessage/404";
import LazyLoad from "@/components/LazyLoad";
import { RouteObj } from "./interface";

const AllRouters = import.meta.globEager("./modules/*.tsx");

// 处理路由
const routersArray: RouteObj[] = [];
Object.keys(AllRouters).forEach(item => {
	Object.keys(AllRouters[item]).forEach((key: any) => {
		routersArray.push(...AllRouters[item][key]);
	});
});

const rootRouter: RouteObj[] = [
	{
		path: "/",
		element: <Navigate to="/home/index" />
	},
	{
		path: "/login",
		element: LazyLoad(React.lazy(() => import("@/views/login/index")))
	},
	...routersArray,
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
