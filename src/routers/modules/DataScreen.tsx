import React from "react";

import Layout from "@/layout/index";
import LazyLoad from "@/components/LazyLoad";

import { RouteObj } from "@/routers/interface";

const DataScreenRouter: Array<RouteObj> = [
	{
		element: <Layout />,
		children: [
			{
				path: "/dataScreen/index",
				element: LazyLoad(React.lazy(() => import("@/views/dataScreen"))),
				meta: {
					title: "数据大屏",
					key: "dataScreen"
				}
			}
		]
	}
];

export default DataScreenRouter;
