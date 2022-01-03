<template>
	<view>
		<!-- 轮播图 -->
		<view><u-swiper :list="slides" keyName="img_url" height="320rpx" circular indicator autoplay></u-swiper></view>
		<!-- 标签页，筛选方式 -->
		<view class="tabs-wrap"><u-tabs :list="listSort" :current="indexSort" @change="changeSort" sticky lineWidth="50" :activeStyle="{ color: '#3c9cff' }"></u-tabs></view>
		<view>
			<!-- 分栏布局，商品 -->
			<u-row justify="space-between" gutter="12" class="flex-wrap">
				<u-col span="5.6" v-for="(item, index) in goods" :key="index" class="goods-col">
					<navigator class="goods-item">
						<u-image width="100%" height="300rpx" :src="item.cover_url"></u-image>
						<view class="title u-line-1">{{ item.title }}</view>
						<view class="card-flex">
							<view class="price">￥{{ item.price }}</view>
							<view class="sales ">销量: {{ item.sales }}</view>
						</view>
					</navigator>
				</u-col>
			</u-row>
			<!-- 加载页 -->
			<u-loading-page :loading="flagLoading" color="white" loading-mode="spinner" loadingColor="white" bgColor="rgba(179,179,179,.5)"></u-loading-page>
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
			// 存储轮播图数据，服务器获取
			slides: [],
			/**
			 * 标签页
			 */
			// 标签页数据
			indexSort: 0,
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
			],
			/**
			 * 分栏布局
			 */
			// 货物数据
			goods: [],
			indexPages: 1,
			/**
			 * 其他组件
			 */
			flagLoading: 0
		};
	},
	// es7, 同步
	onLoad() {
		this.getData();
	},
	methods: {
		/**
		 * 标签页
		 */
		// 筛选标签页改变时
		changeSort(index, item) {
			this.indexSort = index.index;
			console.log(this.indexSort);
			// 重置商品数据和分页
			this.goods = [];
			this.indexPages = 1;
			this.getData();
		},
		/**
		 * 分栏布局，商品
		 */
		// 获取页面数据
		async getData() {
			const params = {
				page: this.indexPages
			};
			// 参数处理，标签页筛选时，排序条件，放在这即使触底触发getData时仍有效
			if (this.indexSort == 1) params.sales = 1;
			if (this.indexSort == 2) params.recommend = 1;
			if (this.indexSort == 3) params.new = 1;

			// 启用加载中组件
			this.flagLoading = 1;
			// 请求接口获取数据
			const res = await this.$u.api.index(params);
			// vue是虚拟Dom，没有发生改变时，不会进行重新渲染，不用担心每次请求浪费资源
			this.slides = res.data.slides;
			// this.goods.push(...res.data.goods.data);	// on my way
			this.goods = [...this.goods, ...res.data.goods.data];
			// 更新加载中组件状态
			this.flagLoading = 0;
		}
	},
	// 触底
	onReachBottom() {
		this.indexPages = this.indexPages + 1;
		this.getData();
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
.goods-col {
	/* 使用u-line-1，解决title过长导致下面的所有商品卡片，水平不在对齐 */
	/* 临时，不知道为什么u-line-1会导致width变宽，把col的width降到47%就不会发生 */
	width: 47%;
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
