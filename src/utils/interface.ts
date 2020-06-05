//route props type
export type RouteProps = {
	path: string
	name?: string
	icon?: string
	exact?: boolean
	authority?: undefined | string | string[]
	routes?: Array<RouteProps>
	menuData?: RouteProps[]
}

//route type
export type Route = {
	path: string
	routes: RouteProps[]
	menuData: RouteProps[]
}

export type IAccount = {
	isLogin: boolean
	user: UserType
	authority: any[string] | string
	refresh_token: string
	token_type: string
	access_token: string
}

//user type
interface UserType {
	id: number
	headImgUrl: string
	nickname: string
	username: string
	mobile: number
}

//nav tabs type
export type NavTabsType = {
	name: string
	path: string
	isMusEnter?: boolean
	disabled?: boolean
}

//response type
export type DataType = {
	code?: number
	content?: any
	message?: string
}
