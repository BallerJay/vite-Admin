import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "@/redux/index";

import "@/styles/reset.scss";
import "@/styles/common.scss";
import "antd/dist/antd.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<App />
	</Provider>
);
