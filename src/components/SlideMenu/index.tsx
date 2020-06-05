import React from 'react'
import Menu from './menu'

const SideMenu: React.FunctionComponent = React.memo(props => {
	return <Menu {...props} />
})
export default SideMenu
