<template>
	<view>
		personalCenter
		<c-tabbar></c-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {},
	onLoad() {
		// 未登录时中断
		if (this.$u.utils.isLogin()) return;
	}
};
</script>

<style></style>
