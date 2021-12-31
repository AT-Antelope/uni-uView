// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.baseURL = 'https://api.shop.eduwork.cn'; /* 根域名 */

		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		config.header.authorizationCode = "Bearer " + vm.access_token;
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = config.data || {}
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if (config?.custom?.auth) {
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			config.header.token = vm.$store.state.userInfo.token
		}
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const {
			statusCode,
			data
		} = response;

		// 自定义参数
		const custom = response.config?.custom
		if (statusCode < 400) {

			return response;
		} else if (statusCode == 400) {
			vm.$u.toast(data.message)
			return false;
		} else if (statusCode == 401) {
			// 假设401为token失效，跳转登录
			vm.$u.toast("验证失败，请重新登录")
			setTimeout(() => {
				vm.$u.route("@/pages/index/index.vue")
			}, 1500)
			return false;
		} else if (statusCode == 400) {
			const {
				errors
			} = data;
			vm.$u.toast(Object.values(errors)[0][0]);
			return false;
		} else {
			return false;
		}
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})

	vm.$u.patch = (url, params = {}, header = {}) => {
		const _params = {
			...params,
			_method: "PATCH"
		}
		return vm.$u.post(url, _params, header)
	}
}
