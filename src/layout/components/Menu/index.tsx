import React, { useEffect, useState } from "react";
import { Menu, MenuProps, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import * as Icons from "@ant-design/icons";
import { connect } from "react-redux";

import Logo from "./components/Logo";

import "./index.scss";

import { setBreadcrumbList } from "@/redux/modules/breadcrumb/action";
import { findAllBreadcrumb, searchRoute } from "@/utils/utils";
import { getMenuList } from "@/api/modules/login";

type MenuItem = Required<MenuProps>["items"][number];

const LayoutMenu = (props: any) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
	const [menuList, setMenuList] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	// const menuList: any = [
	// 	{
	// 		label: <Link to="/home">首页</Link>,
	// 		key: "/home",
	// 		icon: <HomeOutlined />
	// 	},
	// 	{
	// 		label: <Link to="/datascreen">数据大屏</Link>,
	// 		key: "/dataScreen",
	// 		icon: <AreaChartOutlined />
	// 	},
	// 	{
	// 		label: <Link to="/protable/useHooks">超级表格</Link>,
	// 		icon: <TableOutlined />,
	// 		path: "/protable",
	// 		children: [
	// 			{
	// 				label: <Link to="/protable/useHooks">使用hooks</Link>,
	// 				key: "/protable/useHooks"
	// 			},
	// 			{
	// 				label: <Link to="/protable/usecomponent">使用Component</Link>,
	// 				key: "/protable/usecompoennt"
	// 			}
	// 		]
	// 	}
	// ];

	const onClick: MenuProps["onClick"] = ({ key }: { key: string }) => {
		const route = searchRoute(key, props.menuList);
		if (route.isLink) window.open(route.isLink, "_blank");
		navigate(key);
	};

	const getItem = (
		label: React.ReactNode,
		key?: React.Key | null,
		icon?: React.ReactNode,
		children?: MenuItem[],
		type?: String
	): MenuItem => {
		return {
			key,
			icon,
			children,
			label,
			type
		} as MenuItem;
	};

	// 动态渲染Icon图标
	const customIcons: { [key: string]: any } = Icons;
	const addIcon = (name: string) => {
		return React.createElement(customIcons[name]);
	};

	const handleMenuList = (menuList: Menu.MenuOptions[]) => {
		const newArr: MenuItem[] = [];
		menuList.forEach((item: Menu.MenuOptions) => {
			if (!item?.children) {
				return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
			}

			newArr.push(getItem(item.title, item.path, addIcon(item.icon!), handleMenuList(item.children)));
		});
		return newArr;
	};

	const getMenuData = async () => {
		setLoading(true);
		try {
			const { data } = await getMenuList();
			if (!data) return;
			setMenuList(handleMenuList(data));
			// 存储处理过后的所有面包屑导航栏到 redux 中
			props.setBreadcrumbList(findAllBreadcrumb(data));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getMenuData();
	}, []);

	useEffect(() => {
		setSelectedKeys([pathname]);
	}, [pathname]);

	return (
		<div className="menu">
			<Spin spinning={loading} tip="Loading...">
				<Logo></Logo>
				<Menu
					theme="dark"
					mode="inline"
					triggerSubMenuAction="click"
					items={menuList}
					selectedKeys={selectedKeys}
					onClick={onClick}
				></Menu>
			</Spin>
		</div>
	);
};

const mapDispatchToProps = { setBreadcrumbList };

export default connect(null, mapDispatchToProps)(LayoutMenu);
