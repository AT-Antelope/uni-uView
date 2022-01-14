<template>
	<view>
		<!-- <u-navbar :is-back="false" title="　" :border-bottom="false">
			<view class="my-flex u-row-right" style="width: 100%;">
				<view class="camera u-flex u-row-center"><u-icon name="camera-fill" color="#000000" size="48"></u-icon></view>
			</view>
		</u-navbar> -->

		<!-- 头像栏 -->
		<view class="my-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10"><u-avatar :src="pic" size="50"></u-avatar></view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">uView ui</view>
				<view class="u-font-14 u-tips-color">微信号:helang_uView</view>
			</view>
			<view class="u-m-l-10 u-p-10"><u-icon name="scan" color="#969799" size="28"></u-icon></view>
			<view class="u-m-l-10 u-p-10"><u-icon name="arrow-right" color="#969799" size="28"></u-icon></view>
		</view>

		<view class="u-m-t-20">
			<u-cell-group class="bg-white"><u-cell icon="rmb-circle" title="支付"></u-cell></u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group  class="bg-white">
				<u-cell icon="star" title="收藏" ></u-cell>
				<u-cell icon="photo" title="相册"></u-cell>
				<u-cell icon="coupon" title="卡券"></u-cell>
				<u-cell icon="heart" title="关注"></u-cell>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group class="bg-white"><u-cell icon="setting" title="设置"></u-cell></u-cell-group>
		</view>
		<!-- 底部导航栏 -->
		<c-tabbar></c-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pic: 'https://uviewui.com/common/logo.png',
			show: true
		};
	},
	methods: {},
	onLoad() {
		// 未登录时中断
		if (this.$u.utils.isLogin()) return;
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #ededed;
}
u-cell {
	background-color: #fff;
}
.my-flex {
	display: flex;
	justify-content: space-around;
}

.profile-photo {
	width: 140rpx;
	height: 140rpx;
}

// .camera {
// 	width: 54px;
// 	height: 44px;

// 	&:active {
// 		background-color: #ededed;
// 	}
// }
.bg-white {
	background-color: #fff;
}
.user-box {
	padding-top: 40rpx;
	background-color: #fff;
}
.u-m-l-10 {
	margin-left: 10rpx;
}
.u-p-10 {
	padding: 10rpx;
}
.u-m-t-20 {
	margin-top: 20rpx;
}
</style>
