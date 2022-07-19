import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { Layout } from "antd";

import LayoutMenu from "./components/Menu";
import LayoutHeader from "./components/Header";
import LayoutFooter from "./components/Footer";

import "./index.scss";

const { Sider, Content } = Layout;

const LayoutIndex = (props: any) => {
	// console.log(props);

	const { pathname } = useLocation();

	return (
		<Layout>
			<Sider trigger={null} collapsed={props.isCollapse}>
				<LayoutMenu></LayoutMenu>
			</Sider>
			<Layout>
				<LayoutHeader></LayoutHeader>
				{/* <LayoutTabs></LayoutTabs> */}
				<Content>
					<TransitionGroup className="container">
						{/* exit：表示退出当前页面的时候是否有动画 */}
						<CSSTransition key={pathname} timeout={200} classNames="fade" exit={false}>
							<Outlet></Outlet>
						</CSSTransition>
					</TransitionGroup>
				</Content>
				<LayoutFooter></LayoutFooter>
			</Layout>
		</Layout>
	);
};

export default connect((state: any) => {
	return {
		isCollapse: state.menuReducer.isCollapse
	};
})(LayoutIndex);
