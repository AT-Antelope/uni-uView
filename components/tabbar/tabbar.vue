<template>
	<view class="tabber-wrap">
		<u-tabbar :value="tabbarIndex" safeAreaInsetBottom border fixed placeholder>
			<u-tabbar-item text="首页" icon="home" @click="btnTabbar"></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account" @click="btnTabbar"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
export default {
	name: 'tabbar',
	data() {
		return {
			tabbarIndex: 0
		};
	},
	methods: {
		btnTabbar(e) {
			this.tabbarIndex = e;
		}
	}
};
</script>

<style lang="scss" scoped>
.tabber-wrap {
	// width: 100%;
	// bottom: 0;
}
</style>
