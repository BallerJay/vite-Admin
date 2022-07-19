import * as types from "@/redux/mutation-types";

export const updateCollapse = (isCollapse: boolean) => ({
	type: types.UPDATE_COLLAPSE,
	isCollapse
});
