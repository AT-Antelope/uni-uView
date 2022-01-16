<template>
	<view>
		<!-- <u-navbar :is-back="false" title="　" :border-bottom="false">
			<view class="my-flex u-row-right" style="width: 100%;">
				<view class="camera u-flex u-row-center"><u-icon name="camera-fill" color="#000000" size="48"></u-icon></view>
			</view>
		</u-navbar> -->

		<!-- 头像栏 -->
		<view class="my-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10 flex-grow-1"><u-avatar :src="userAvtarUrl" size="60"></u-avatar></view>
			<view class="u-flex-1 flex-grow-2">
				<view class="u-font-18 u-p-b-20">{{ userName }}</view>
				<view class="u-font-14 u-tips-color">{{ userEmail }}</view>
			</view>
			<!-- <view class="u-m-l-10 u-p-10"></view> -->
			<view class="my-flex flex-grow-1 u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>

		<view class="u-m-t-20">
			<u-cell-group class="bg-white"><u-cell icon="setting" title="个人信息" url="/pages/auth/personalInfo" isLink></u-cell></u-cell-group>
		</view> 

		<view class="u-m-t-20">
			<u-cell-group class="bg-white">
				<u-cell icon="shopping-cart" title="所有订单" isLink></u-cell>
				<u-cell icon="star" title="商品收藏" isLink></u-cell>
				<u-cell icon="map" title="收货地址" isLink></u-cell>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group class="bg-white"><u-cell icon="info-circle" title="退出登录" isLink></u-cell></u-cell-group>
		</view>
		<!-- 底部导航栏 -->
		<c-tabbar></c-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pic: 'https://uviewui.com/common/logo.png'
		};
	},
	methods: {},
	onLoad() {
		// 未登录时中断
		if (this.$u.utils.isLogin()) return;
	},
	computed: {
		// 头像url
		userAvtarUrl() {
			if (!this.$store.state.vuex_userInfo) return 'https://uviewui.com/common/logo.png';
			return this.$store.state.vuex_userInfo.data.avatar_url;
		},
		// 头像url
		userName() {
			if (!this.$store.state.vuex_userInfo) return '未登录';
			return this.$store.state.vuex_userInfo.data.name;
		},
		// 头像url
		userEmail() {
			if (!this.$store.state.vuex_userInfo) return '';
			return `微信号: ${this.$store.state.vuex_userInfo.data.email}`;
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #ededed;
}
.my-flex {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.flex-grow-1 {
	flex-grow: 1;
}
.flex-grow-2 {
	flex-grow: 4;
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
	padding: 30rpx 0;
	background-color: #fff;
}
.u-m-t-20 {
	margin-top: 20rpx;
}
.u-m-r-10 {
	margin-right: 10rpx;
}
.u-m-l-10 {
	margin-left: 10rpx;
}
.u-p-10 {
	padding: 10rpx;
}
.u-p-r-20 {
	padding-right: 20rpx;
}
.u-p-b-30 {
	padding-bottom: 30rpx;
}
.u-p-l-30 {
	padding-left: 30rpx;
}
</style>
