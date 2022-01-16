// // 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let indexUrl = '/ebapi/public_api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	vm.$u.api = {};

	/**
	 * https://www.showdoc.com.cn/1207745568269674/6090131032550241
	 */

	/**
	 * 首页
	 */
	// get
	vm.$u.api.index = (params = {}) => vm.$u.http.get('/api/index', params);



	/**
	 * 登录
	 */
	vm.$u.api.authLogin = params => vm.$u.http.post('/api/auth/login', params);

	/**
	 * 注册，非小程序注册， 请不要使用openid参数， 否则会导致验证不通过
	 */
	vm.$u.api.authRegister = params => vm.$u.http.POST('/api/auth/register', params);

	/**
	 * 用户信息
	 */
	// 获取用户信息
	vm.$u.api.userInfo = params => vm.$u.http.get('/api/user', params);
	// 修改用户信息
	vm.$u.api.userInfoUpdate = params => vm.$u.http.put('/api/user', params);

}

// // 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
// vm.$u.api = {
// 	index,
// 	authLogin
// };
// }

export default {
	install
}
