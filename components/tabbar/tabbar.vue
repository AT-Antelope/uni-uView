<template>
	<view>
		<u-tabbar :value="tabbarIndex" @change="changeTabbar" safeAreaInsetBottom border fixed placeholder>
			<u-tabbar-item text="首页" icon="home"></u-tabbar-item>
			<u-tabbar-item text="商品" icon="bag"></u-tabbar-item>
			<u-tabbar-item text="购物车" icon="shopping-cart"></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
export default {
	name: 'tabbar',
	data() {
		return {
			tabbarIndex: 0
			// 本想用数组循环代替数据绑定，使用block包裹也无法实现点击事件绑定，又不想用传参if(index)的方式
			// listTabbar: [
			// 	{
			// 		text: '首页',
			// 		icon: 'home',
			// 		clickEvent: 'btnIndex'
			// 	},
			// 	{
			// 		text: '商品',
			// 		icon: 'bag',
			// 		clickEvent: 'btnGoods'
			// 	},
			// 	{
			// 		text: '购物车',
			// 		icon: 'shopping-cart',
			// 		clickEvent: 'btnCart'
			// 	},
			// 	{
			// 		text: '我的',
			// 		icon: 'account',
			// 		clickEvent: 'btnPersonalCenter'
			// 	}
			// ]
		};
	},
	methods: {
		changeTabbar(e) {
			this.tabbarIndex = e;
			// 储存当前激活状态，使用vuex，刷新后自动清空，回到默认值0
			this.$u.vuex('tabbarIndex', e);
			this.redirectTabber(e);
		},
		// 转到对应路由，根据当前激活状态
		redirectTabber(tabbarIndex) {
			if (tabbarIndex == 0) {
				uni.$u.route({
					type: 'redirect',
					url: '/pages/index/index'
				});
			} else if (tabbarIndex == 1) {
				uni.$u.route({
					type: 'redirect',
					url: '/pages/goods/index'
				});
			} else if (tabbarIndex == 2) {
				uni.$u.route({
					type: 'redirect',
					url: '/pages/cart/index'
				});
			} else if (tabbarIndex == 3) {
				uni.$u.route({
					type: 'redirect',
					url: '/pages/personalCenter/index'
				});
			}
		}
	},
	computed: {},
	/**
	 * 组件生命周期
	 */
	created() {
		// TODO 刷新后当前值不会回到首页
		// 实时更新最后选中值，每次到新页面加载底部导航栏时，获取vuex中的tabbarIndex
		this.tabbarIndex = this.$store.state.tabbarIndex || 0;
	}
};
</script>

<style lang="scss" scoped></style>
