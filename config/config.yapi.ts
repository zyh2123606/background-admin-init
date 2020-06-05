export default {
	proxy: {
		'/api': {
			target: 'http://devgateway.rhjc56.com',
			changeOrigin: true,
			pathRewrite: { '^/api': '' }
		}
	}
}
