import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import menuReducer from "./modules/menu/menuReducer";
import globalReducer from "./modules/global/globalReducer";

const reducer = combineReducers({
	menuReducer,
	globalReducer
});

// redux 持久化配置
const persistConfig = {
	key: "redux-state",
	storage: storage
};

const persistReducerConfig = persistReducer(persistConfig, reducer);

const store = createStore(persistReducerConfig, applyMiddleware(reduxThunk));
// 创建持久化 store
const persistor = persistStore(store);

export { store, persistor };
