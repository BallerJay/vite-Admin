import React from "react";

import Layout from "@/layout/index";
import { RouteObj } from "@/routers/interface";
import LazyLoad from "@/components/LazyLoad";

const HomeRouter: Array<RouteObj> = [
	{
		element: <Layout />,
		meta: {
			title: "超级表格"
		},
		children: [
			{
				path: "/proTable/useHooks",
				element: LazyLoad(React.lazy(() => import("@/views/proTable/useHooks"))),
				meta: {
					title: "使用 Hooks",
					key: "useHooks"
				}
			},
			{
				path: "/proTable/useComponent",
				element: LazyLoad(React.lazy(() => import("@/views/proTable/useComponent"))),
				meta: {
					title: "使用 Component",
					key: "useComponent"
				}
			}
		]
	}
];

export default HomeRouter;
