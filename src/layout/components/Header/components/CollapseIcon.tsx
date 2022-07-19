import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import { updateCollapse } from "@/redux/modules/menu/action";

const CollapseIcon = (props: any) => {
	return (
		<div
			className="collapsed"
			onClick={() => {
				props.updateCollapse(!props.isCollapse);
			}}
		>
			{props.isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
		</div>
	);
};

export default connect(
	(state: any) => {
		return { isCollapse: state.menuReducer.isCollapse };
	},
	{
		updateCollapse
	}
)(CollapseIcon);
