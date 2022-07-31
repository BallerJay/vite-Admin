import React from "react";

import Layout from "@/layout/index";
import { RouteObj } from "@/routers/interface";
import LazyLoad from "@/components/LazyLoad";

const HomeRouter: Array<RouteObj> = [
	{
		element: <Layout />,
		children: [
			{
				path: "/home/index",
				element: LazyLoad(React.lazy(() => import("@/views/home"))),
				meta: {
					title: "首页",
					key: "home"
				}
			}
		]
	}
];

export default HomeRouter;
