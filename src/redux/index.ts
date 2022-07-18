import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from "redux-thunk";

import menuReducer from "./reducers/menu/menuReducer";

const reducer = combineReducers({
	menuReducer
});

const store = createStore(reducer, applyMiddleware(reduxThunk));

export default store;
