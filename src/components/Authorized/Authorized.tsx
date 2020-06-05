import React from 'react'
import { Result } from 'antd'
import CheckPermission, { AuthorizedProps } from './CheckPermissions'

interface IProps {
	authority: AuthorizedProps
	noMatch?: React.ReactNode
}
type IAuthorizedType = React.FunctionComponent<IProps> & {
	check: typeof CheckPermission
}
const Authorized: React.FunctionComponent<IProps> = ({
	children,
	authority,
	noMatch = (
		<Result
			status="403"
			title="403"
			subTitle="您没有访问的权限，请联系管理员"
		/>
	),
	...rest
}) => {
	const childrenRender: React.ReactNode =
		typeof children === 'undefined' ? null : children
	const comp = CheckPermission(authority, childrenRender, noMatch)
	return <>{comp}</>
}
export default Authorized as IAuthorizedType
