import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from '@/store';
import uView from 'uView'
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
// 引入http拦截器
require('@/common/http.interceptor.js')(app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

app.$mount()
// #endif


// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
