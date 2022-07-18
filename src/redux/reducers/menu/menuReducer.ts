const menuReducer = (
	preState = {
		collapsed: false
	},
	action: any
) => {
	let newState = { ...preState };
	switch (action.type) {
		case "unfold":
			newState.collapsed = action.data;
			return newState;
		default:
			return preState;
	}
};

export default menuReducer;
