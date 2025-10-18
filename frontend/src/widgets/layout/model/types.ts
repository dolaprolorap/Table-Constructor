export interface HeaderLinkConfig {
	type: 'link';
	to: string;
	label: string;
}

export type HeaderNavigationConfig = HeaderLinkConfig[]

export enum HeaderConfigTypes {
	link = 'link'
}