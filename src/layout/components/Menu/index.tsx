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
			label: <Link to="/dataScreen">数据大屏</Link>,
			key: "/dataScreen",
			icon: <AreaChartOutlined />
		},
		{
			label: <Link to="/table/useHooks">超级表格</Link>,
			icon: <TableOutlined />,
			path: "/proTable",
			children: [
				{
					label: <Link to="/table/useHooks">使用hooks</Link>,
					key: "/table/useHooks"
				}
			]
		}
	];

	const onClick: MenuProps["onClick"] = e => {
		console.log("click ", e);
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
			>
				{/* {menuList.map(item => {
					return (
						<Menu.Item key={item.path} icon={item.icon}>
							<Link to={item.path}>{item.title}</Link>
						</Menu.Item>
					);
				})} */}
			</Menu>
		</div>
	);
};

export default LayoutMenu;
