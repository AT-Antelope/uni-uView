const install = (Vue, vm) => {
	// 已登录判断
	const isLogin = () => {
		// 实现带参数的回源跳转
		// 获取token
		const token = vm.$store.state.vuex_token;
		// 未登录
		if (!token) {
			// getCurrentPages()获取路由栈，pop()弹出最后一个，就是最后访问的原页面
			const currentPage = getCurrentPages().pop();
			// 获取页面路径和请求参数
			const {
				options,
				route
			} = currentPage; // ps: id=1
			// 获取当前页参数的所有key，为一个数组
			const optionsKey = Object.keys(options);
			let params = '';
			if (optionsKey.length !== 0) {
				params = optionsKey
					.reduce((pre, current) => {
						// return pre + current + '=' + options[current] + '&';
						return `${pre}${current}=${options[current]}&`; // es6
					}, '?')
					.slice(0, -1); // slice(begin, end)	取出数组中的值为新数组，浅拷贝 [begin,end)	// 拿到的值结尾会带一个&，需要另外去除
			}
			// 缓存当前页路径，用于登录或注册后的跳转
			uni.setStorageSync("back_url", route + params);

			vm.$u.toast('请登录');
			setTimeout(() => {
				vm.$u.route({
					url: '/pages/auth/login'
				});
			}, 1500);
			return false;
		}
		// 已登录
		return true;
	};

	/**
	 * 更新用户信息，更新vuex_user
	 * TODO 更新后页面未更新
	 */
	const updateUser = async () => {
		// 请求用户信息
		const userInfo = await vm.$u.api.userInfo();
		// 缓存用户信息
		vm.$u.vuex('vuex_userInfo', userInfo);
	}


	vm.$u.utils = {
		isLogin,
		updateUser
	}
}
export default {
	install
}
