import { Breadcrumb } from "antd";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const BreadcrumbNav = (props: any) => {
	console.log(props);
	const { pathname } = useLocation();
	const breadcrumbList = props.breadcrumbList[pathname] || [];

	return (
		<Breadcrumb>
			<Breadcrumb.Item href={"#/home/index"}>首页</Breadcrumb.Item>
			{breadcrumbList.map((item: string) => {
				console.log(item);
				return <Breadcrumb.Item key={item}>{item !== "首页" ? item : null}</Breadcrumb.Item>;
			})}
		</Breadcrumb>
	);
};

const mapStateToProps = (state: any) => state.breadcrumbReducer;
export default connect(mapStateToProps)(BreadcrumbNav);
