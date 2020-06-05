import React from 'react'
import { Menu, Avatar, Dropdown } from 'antd'
import Style from './index.less'
import { View } from 'cy-element'
import { WechatOutlined, AliyunOutlined, MenuFoldOutlined, LogoutOutlined,
	LockOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { IconFont } from '@/components'
import ScreenFull from 'screenfull'
import { useModel } from 'umi'

const MenuItem = Menu.Item
const CustomHeader = () => {
	const { initialState, setInitialState } = useModel('@@initialState')
	const fullToggle = () => {
		if(ScreenFull.isEnabled)
			ScreenFull.toggle()
	}
	const collapsedToggle = () => {
		let state = { menuData: initialState?.menuData, collapsed: !initialState?.collapsed }
		setInitialState(state)
	}
	const userMenu = <Menu>
		<MenuItem icon={<UserOutlined />} key='0'>账户信息</MenuItem>
		<MenuItem icon={<LockOutlined />} key="1">修改密码</MenuItem>
		<Menu.Divider />
		<MenuItem icon={<LogoutOutlined />}>退出登录</MenuItem>
	</Menu>
	return <View row className={Style.header}>
		<View width={48}
			onClick={collapsedToggle}
			justContent='center'
			alignItems='middle'
			className={Style.menufold}>
			{initialState?.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
		</View>
		<View flex>
			<Menu mode='horizontal' theme='dark'>
				<Menu.Item icon={<WechatOutlined />}>合同管理</Menu.Item>
				<Menu.Item icon={<AliyunOutlined />}>财务管理</Menu.Item>
			</Menu>
		</View>
		<View row alignItems='middle' style={{ marginRight: 20 }}>
			<IconFont className={Style.fullscreen} type='icon-full-screen' onClick={fullToggle}/>
			<Dropdown overlay={userMenu} trigger={['click']}>
				<View row alignItems='middle' style={{cursor: 'pointer'}}>
					<Avatar className={Style.avatar} size={25} icon={<UserOutlined />} />
					<View style={{marginLeft: 5}}>管理员</View>
				</View>
			</Dropdown>
		</View>
	</View>
}
export default CustomHeader