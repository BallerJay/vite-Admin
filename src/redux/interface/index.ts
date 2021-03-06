import type { SizeType } from "antd/lib/config-provider/SizeContext";

/* themeConfigProp */
export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
	weakOrGray: string;
}
export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}

/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: any;
	assemblySize: SizeType;
	language: string;
	themeConfig: ThemeConfigProp;
}

/* BreadcrumbState */
export interface BreadcrumbState {
	breadcrumbList: {
		[key: string]: any;
	};
}
