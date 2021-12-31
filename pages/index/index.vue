<template>
	<view class="content">
		首页

		<c-tabbar></c-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	// es7, 同步
	async onLoad() {
		// await的用法，请求出错后，之后的代码就不会再执行，有需要使用try、catch
		// await uni.$u.http.get('/api/index').then(response => {
		// 	console.log(response);
		// });
		let res = await this.$u.api.index();
		console.log(res);
	},
	methods: {}
};
</script>

<style lang="scss" scoped></style>
