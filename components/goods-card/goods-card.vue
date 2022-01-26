<template>
	<navigator class="goods-item" :url="'/pages/goods/goods-details?id=' + goods.id">
		<u-image width="100%" height="300rpx" :src="goods.cover_url"></u-image>
		<view class="title u-line-1">{{ goods.title }}</view>
		<view class="card-flex">
			<view class="price">￥{{ goods.price }}</view>
			<view class="sales ">销量: {{ goods.sales }}</view>
		</view>
	</navigator>
</template>

<script>
export default {
	// <u-row justify="space-between" gutter="12" class="flex-wrap">
	// 		<u-col span="5.6" v-for="(item, index) in goods" :key="index" class="goods-col">
	// 			<c-goods-card :goods="item"></c-goods-card>
	// 		</u-col>
	// </u-row>
	name: 'goods-card',
	props: {
		goods: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {};
	}
};
</script>

<style></style>
