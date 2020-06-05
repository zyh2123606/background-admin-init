import { defineConfig } from 'umi'
import Routes from './router.config'
import Theme from './theme'

export default defineConfig({
	title: '瑞和锦程-物流管理系统',
	antd: {
		compact: false
	},
	dva: {
		immer: true,
		hmr: true,
		skipModelValidate: true
	},
	hash: true,
	dynamicImport: {
		loading: '@/loadingComponent'	
	},
	targets: {
		ie: 11
	},
	ignoreMomentLocale: true,
	nodeModulesTransform: {
		type: 'none'
	},
	theme: Theme,
	routes: Routes,
	define: {
		baseUrl: '/api',
		imgPrefix: 'http://devgateway.rhjc56.com',
		appName: 'iotAdmin',
		appSecretkey: 'iotAdmin888',
		appNameSpace: 'Basic '
	}
})
