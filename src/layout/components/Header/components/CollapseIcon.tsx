import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import store from "@/redux/index";
import { useEffect, useState } from "react";

const CollapseIcon = () => {
	const [collapsed, setCollapsed] = useState<boolean>(false);

	useEffect(() => {
		const unSubscribe = store.subscribe(() => {
			setCollapsed(store.getState().menuReducer.collapsed);
		});

		return () => {
			unSubscribe();
		};
	}, []);

	return (
		<div
			className="collapsed"
			onClick={() => {
				store.dispatch({
					type: "unfold",
					data: !store.getState().menuReducer.collapsed
				});
			}}
		>
			{collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
		</div>
	);
};

export default CollapseIcon;
