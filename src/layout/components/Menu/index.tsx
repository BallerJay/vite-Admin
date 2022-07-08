import { useState } from "react";
import { HomeOutlined, TableOutlined, AreaChartOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";

import Logo from "./components/Logo";

import "./index.scss";
import { Link } from "react-router-dom";

const LayoutMenu = () => {
	const [current, setCurrent] = useState("1");
	const menuList: any = [
		{
			label: <Link to="/home">首页</Link>,
			key: "/home",
			icon: <HomeOutlined />
		},
		{
			label: <Link to="/datascreen">数据大屏</Link>,
			key: "/dataScreen",
			icon: <AreaChartOutlined />
		},
		{
			label: <Link to="/protable/useHooks">超级表格</Link>,
			icon: <TableOutlined />,
			path: "/protable",
			children: [
				{
					label: <Link to="/protable/useHooks">使用hooks</Link>,
					key: "/protable/useHooks"
				},
				{
					label: <Link to="/protable/usecomponent">使用Component</Link>,
					key: "/protable/usecompoennt"
				}
			]
		}
	];

	const onClick: MenuProps["onClick"] = e => {
		// console.log("click ", e);
		setCurrent(e.key);
	};

	return (
		<div className="menu">
			<Logo></Logo>
			<Menu
				theme="dark"
				mode="inline"
				triggerSubMenuAction="click"
				// selectedKeys={[menuActive]}
				items={menuList}
				selectedKeys={[current]}
				onClick={onClick}
			></Menu>
		</div>
	);
};

export default LayoutMenu;
