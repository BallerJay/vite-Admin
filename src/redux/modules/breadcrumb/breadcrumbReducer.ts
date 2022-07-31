import { AnyAction } from "redux";
import { BreadcrumbState } from "@/redux/interface";
import * as types from "@/redux/mutation-types";

const breadcrumbState: BreadcrumbState = {
	breadcrumbList: {}
};

const breadcrumbReducer = (preState: BreadcrumbState = breadcrumbState, action: AnyAction) => {
	let newState = { ...preState };
	switch (action.type) {
		case types.SET_BREADCRUMB_LIST:
			newState.breadcrumbList = action.data;
			return newState;
		default:
			return preState;
	}
};

export default breadcrumbReducer;
