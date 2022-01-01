<template>
	<view class="content">
		<!-- 轮播图 -->
		<view><u-swiper :list="listCarousel" circular indicator></u-swiper></view>
		<!-- 标签页，筛选方式 -->
		<view class="tabs-wrap"><u-tabs :list="listSort" @change="changeSort" sticky lineWidth="50" :activeStyle="{ color: '#3c9cff' }"></u-tabs></view>
		<!-- 分栏布局 -->
		<view>
			<u-row justify="space-between" gutter="12" class="flex-wrap">
				<u-col span="5.6" v-for="i in 6" :key="i">
					<navigator class="goods-item">
						<u-image width="100%" height="300rpx" src="https://oss.shop.eduwork.cn/product/2020-0820-5f3e177b79824.png"></u-image>
						<view class="title">Linux私房菜</view>
						<view class="card-flex">
							<view class="price">￥99</view>
							<view class="sales">销量: 10</view>
						</view>
					</navigator>
				</u-col>
			</u-row>
		</view>
		<!-- tabbar底部 -->
		<c-tabbar></c-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			/**
			 * 轮播图
			 */
			listCarousel: [
				'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				'https://cdn.uviewui.com/uview/swiper/swiper2.png',
				'https://cdn.uviewui.com/uview/swiper/swiper3.png'
			],
			/**
			 * 标签页
			 */
			listSort: [
				{
					name: '默认'
				},
				{
					name: '销量'
				},
				{
					name: '推荐'
				},
				{
					name: '最新'
				}
			]
		};
	},
	// es7, 同步
	async onLoad() {
		console.log(await this.$u.api.index());
	},
	methods: {
		changeSort(index, item) {
			console.log(index);
			console.log(item);
		}
	}
};
</script>

<style lang="scss" scoped>
/**
	 * 轮播图
	 */
.margin-top-30 {
	margin-top: 30rpx;
}
/**
 * 标签页
 */
.tabs-wrap {
	margin: 30rpx 60rpx 0 60rpx;
}
/**
 * 分栏布局
 */
.flex-wrap {
	flex-wrap: wrap;
}
.goods-item {
	padding: 40rpx;
	margin-top: 30rpx;
	box-shadow: 0 12rpx 20rpx 0 rgba(0, 0, 0, 0.1);
	.title {
		margin: 10rpx 0;
		font-weight: 500;
		font-size: 32rpx;
	}
	.card-flex {
		display: flex;
		justify-content: space-between;
		.price {
			color: red;
		}
		.sales {
			color: #888;
		}
	}
}
</style>
