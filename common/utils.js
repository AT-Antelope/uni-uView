const install = (Vue, vm) => {
	// 已登录判断
	const isLogin = () => {
		// 获取token
		const token = vm.$store.state.vuex_token;
		// 未登录
		if (!token) {
			// getCurrentPages()获取路由栈，pop()弹出最后一个，就是最后访问的原页面
			const currentPage = getCurrentPages().pop();
			// 缓存当前页路径，用于登录或注册后的跳转
			uni.setStorageSync("back_url", currentPage.route);

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
	}


	vm.$u.utils = {
		isLogin
	}
}
export default {
	install
}
