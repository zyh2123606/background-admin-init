const AccountKey = 'RHJC_ADMIN_USER'
import { IAccount } from '@/utils/interface'

//保存当前登录用户信息
export const saveCurrentUser = (obj: IAccount): void => {
	if (!localStorage) return console.error('localStorage is not defined')
	localStorage.setItem(AccountKey, JSON.stringify(obj))
}

//读取用户信息
export const getCurrentUser = (): IAccount | null => {
	if (!localStorage) {
		console.error('localStorage is not defined')
		return null
	}
	const uinfo = localStorage.getItem(AccountKey)
	if (!uinfo) return null
	try {
		return JSON.parse(uinfo)
	} catch (e) {
		console.warn(e)
	}
	return null
}

//获取token
export const getToken = (): string | undefined => {
	const _account = getCurrentUser()
	try {
		return _account?.access_token
	} catch (err) {
		console.log(err)
	}
	return undefined
}

//获取userId
export const getUserId = (): number | undefined => {
	const _account = getCurrentUser()
	try {
		return _account?.user.id
	} catch (err) {
		console.warn(err)
	}
	return undefined
}

//删除当前用户信息
export const removeCurrentUser = (): void => {
	if (!localStorage) return console.error('localStorage is not defined')
	localStorage.removeItem(AccountKey)
}
