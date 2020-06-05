export default [
	{
		path: '/auth',
		component: '../layouts/AuthLayout',
		routes: [
			{
				path: '/auth/login',
				component: './login'
			}
		]
	},
	{
		path: '/',
		component: '../layouts/BasicLayout',
		routes: [
			{ path: '/home', component: './home' },
			{ path: '/user-manager', component: './userManager', icon: 'icon-user' },
			{ path: '/role-manager', component: './roleManager', icon: 'icon-role' },
			{ path: '/menu-manager', component: './menuManager', icon: 'icon-menu' }
		]
	}
]
