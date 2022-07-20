import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "antd";

import NProgress from "@/config/nprogress";
import { store } from "@/redux";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { ResultEnum } from "@/enums/httpEnums";
import { setToken } from "@/redux/modules/global/action";
import { ResultData } from "@/api/interface";

import { AxiosCanceler } from "./helper/axiosCancel";
import { checkStatus } from "./helper/checkStatus";

const axiosCanceler = new AxiosCanceler();

const config = {
	// 默认地址请求地址，可在 .env 开头文件中修改
	baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间（10s）
	timeout: 10000,
	// 跨域时候允许携带凭证
	withCredentials: true
};

class RequestInstance {
	instance: AxiosInstance;
	constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.instance = axios.create(config);

		this.instance.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				NProgress.start();
				// * 将当前请求添加到 pending 中
				axiosCanceler.addPending(config);
				// * 如果当前请求不需要显示 loading,在api服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
				config.headers!.noLoading || showFullScreenLoading();
				const token: string = store.getState().globalReducer.token;
				return { ...config, headers: { "x-access-token": token } };
			},
			(err: AxiosError) => {
				return Promise.reject(err);
			}
		);
		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.instance.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data, config } = response;
				NProgress.done();
				// * 在请求结束后，移除本次请求(关闭loading)
				axiosCanceler.removePending(config);
				tryHideFullScreenLoading();
				// * 登陆失效（code == 599）
				if (data.code == ResultEnum.OVERDUE) {
					store.dispatch(setToken(""));
					message.error(data.msg);
					window.location.hash = "/login";
					return Promise.reject(data);
				}
				// * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					message.error(data.msg);
					return Promise.reject(data);
				}
				// * 成功请求
				return data;
			},
			async (error: AxiosError) => {
				const { response } = error;
				NProgress.done();
				tryHideFullScreenLoading();
				// 根据响应的错误状态码，做不同的处理
				if (response) return checkStatus(response.status);
				// 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理:可以跳转到断网页面
				if (!window.navigator.onLine) return (window.location.hash = "/500");
				return Promise.reject(error);
			}
		);
	}
	// * 常用请求方法封装
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.instance.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.instance.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.instance.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.instance.delete(url, { params, ..._object });
	}
}

export default new RequestInstance(config);
