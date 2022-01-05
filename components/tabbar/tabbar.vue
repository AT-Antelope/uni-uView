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
			uni.setStorageSync('tabbarIndex', e);
			this.tabbarIndex = e;
			this.redirectTabber(e);
		},
		redirectTabber(tabbarIndex) {
			if (tabbarIndex == 0) {
				uni.redirectTo({
					url: '/pages/index/index'
					// success: res => {},
					// fail: () => {},
					// complete: () => {}
				});
			} else if (tabbarIndex == 1) {
				uni.redirectTo({
					url: '/pages/goods/goods'
					// success: res => {},
					// fail: () => {},
					// complete: () => {}
				});
			} else if (tabbarIndex == 2) {
				uni.redirectTo({
					url: '/pages/cart/cart'
					// success: res => {},
					// fail: () => {},
					// complete: () => {}
				});
			} else if (tabbarIndex == 3) {
				uni.redirectTo({
					url: '/pages/personalCenter/personalCenter'
					// success: res => {},
					// fail: () => {},
					// complete: () => {}
				});
			}
		}
	},
	created() {
		// TODO 刷新后当前值不会回到首页
		// 实时更新最后选中值，每次到新页面加载底部导航栏时，获取vuex中的tabbarIndex
		this.tabbarIndex = uni.getStorageSync('tabbarIndex') || 0;
	}
};
</script>

<style lang="scss" scoped></style>
