import { MenuState } from "@/redux/interface";
import * as types from "@/redux/mutation-types";

const menuState: MenuState = {
	isCollapse: false,
	menuList: []
};

const menuReducer = (preState: MenuState = menuState, action: any) => {
	let newState = { ...preState };
	switch (action.type) {
		case types.UPDATE_COLLAPSE:
			newState.isCollapse = action.isCollapse;
			return newState;
		default:
			return preState;
	}
};

export default menuReducer;
