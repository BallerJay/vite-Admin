import React from "react";

export interface MetaProps {
	keepAlive?: boolean;
	requiresAuth?: boolean;
	title: string;
	key?: string;
}

export interface RouteObj {
	element?: React.ReactNode;
	path?: string;
	meta?: MetaProps;
	children?: RouteObj[];
	caseSensitive?: boolean;
	isLink?: string;
}
