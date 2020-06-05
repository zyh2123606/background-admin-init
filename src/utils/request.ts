import { history } from 'umi'
import { extend, ResponseError } from 'umi-request'
import { notification, message } from 'antd'
import { getCurrentUser, removeCurrentUser } from './appData'
import { IAccount } from './interface'

const codeMessage: Record<number, string> = {
	200: '服务器成功返回请求的数据',
	201: '新建或修改数据成功',
	202: '一个请求已经进入后台排队（异步任务）',
	204: '删除数据成功',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
	401: '用户没有权限（令牌、用户名、密码错误）',
	403: '用户得到授权，但是访问是被禁止的',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
	406: '请求的格式不可得',
	410: '请求的资源被永久删除，且不会再得到的',
	422: '当创建一个对象时，发生一个验证错误',
	500: '服务器发生错误，请检查服务器',
	502: '网关错误',
	503: '服务不可用，服务器暂时过载或维护',
	504: '网关超时'
}

const errorHandler = (error: ResponseError) => {
	const { response, request } = error
	const errorText = codeMessage[response?.status] || response?.statusText || error.message
	const { status, url } = response || {}
	notification.error({
		message: `请求错误${status || error.type}：${url || request.url}`,
		description: errorText
	})
	if (status === 401) refreshToken()
	return error
}

const request = extend({
	timeout: 10000,
	prefix: baseUrl,
	headers: {
		'Content-Type': 'application/jsoncharset=UTF-8'
	},
	credentials: 'include',
	useCache: true,
	ttl: 30000,
	maxCache: 0,
	errorHandler
})

request.use(
	async (ctx, next) => {
		const account: IAccount | null = getCurrentUser(),
			{ req } = ctx
		let auth = appNameSpace + window.btoa(`${appName}:${appSecretkey}`)
		if (account?.isLogin) auth = 'Bearer ' + account.access_token
		req.options.headers = {
			...req.options.headers,
			Authorization: auth
		}
		await next()
		if (ctx.res?.code !== 0) message.warning(ctx.res?.msg || '未知错误')
		if (ctx.res?.code === 401) refreshToken()
	},
	{ global: true }
)

const refreshToken = () => {
	removeCurrentUser()
	history.replace('/auth/login')
}

request.interceptors.response.use(async response => {
	return response
})
export default request
