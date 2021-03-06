// // 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let indexUrl = '/ebapi/public_api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	vm.$u.api = {};

	/**
	 * api document
	 * https://www.showdoc.com.cn/1207745568269674/6090131032550241
	 * 
	 * 由于uView的封装方式，get带参数时，为get(url,config)，config中的值写为get(url,{params})
	 */

	/**
	 * 首页
	 */
	// get
	vm.$u.api.index = (params = {}) => vm.$u.http.get('/api/index', params);

	/**
	 * 账户操作
	 */
	// 登录
	vm.$u.api.authLogin = params => vm.$u.http.post('/api/auth/login', params);
	// 注册，非小程序注册， 请不要使用openid参数， 否则会导致验证不通过
	vm.$u.api.authRegister = params => vm.$u.http.post('/api/auth/register', params);
	// 退出登录
	vm.$u.api.authLogout = () => vm.$u.http.post('/api/auth/logout');

	/**
	 * 用户信息
	 */
	// 获取用户信息
	vm.$u.api.userInfo = () => vm.$u.http.get('/api/user');
	// 修改用户信息
	vm.$u.api.userInfoUpdate = params => vm.$u.http.put('/api/user', params);

	/**
	 * 阿里云，文件上传
	 */
	// 获取oss token
	vm.$u.api.getOssToken = () => vm.$u.http.get('/api/auth/oss/token');
	// 更新头像，原应使用patch，但uview不自带，自定义patch方法请求报错，现用post也同样成功请求
	vm.$u.api.avatarUpdate = params => vm.$u.patch('/api/user/avatar', params);

	/**
	 * 商品
	 */
	// 商品详情
	vm.$u.api.goodsInfo = id => vm.$u.http.get(`/api/goods/${id}`);
	// 商品收藏和取消
	vm.$u.api.goodsCollect = id => vm.$u.http.post(`/api/collects/goods/${id}`);
	// 商品列表
	vm.$u.api.goodsList = params => vm.$u.http.get('/api/goods', {
		params
	});

	/**
	 * 购物车
	 */
	// 添加购物车
	vm.$u.api.cartAdd = params => vm.$u.http.post('/api/carts', params);
	// 购物车列表
	vm.$u.api.cartList = params => vm.$u.http.get('/api/carts', {
		params
	});


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
