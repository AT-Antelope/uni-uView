<template>
	<!-- 53集 -->
	<!-- line 59 -> 75 -->
	<view>
		<view style="text-align:center;"><u-image height="220" :src="goodsInfo.cover_url"></u-image></view>
		<view class="top2" style="margin-top:-10px;">
			<view class="title u-line-2">{{ goodsInfo.title }}</view>
			<view class="des">
				<view class="price">￥ {{ goodsInfo.price }}</view>
				<view class="sales">销量 {{ goodsInfo.sales }}</view>
			</view>
		</view>
		<view><u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs></view>

		<!-- 商品详情 -->
		<view v-if="current == 0">
			<view class="info u-p-b-80"><u-parse :content="goodsInfo.details"></u-parse></view>
		</view>

		<!-- 评论区 -->
		<view v-if="current == 1">
			<!-- 有评论 -->
			<block v-if="hasComment">
				<view class="comment" v-for="(res, index) in commentList" :key="res.id">
					<view class="left"><image :src="res.user.avatar_url" mode="aspectFill"></image></view>
					<view class="right">
						<view class="top">
							<view class="name">{{ res.user.name }}</view>
							<view class="like" :class="{ highlight: res.isLike }">
								<!-- 点赞功能，暂无 -->
								<!-- <view class="num">{{ res.likeNum }}</view> -->
								<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
								<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
							</view>
						</view>
						<view class="content">{{ res.content }}</view>
						<!-- 回复功能，暂无 -->
						<!-- <view class="reply-box">
							<view class="item" v-for="(item, index) in res.replyList" :key="item.index">
								<view class="username">{{ item.name }}</view>
								<view class="text">{{ item.contentStr }}</view>
							</view>
							<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
								共{{ res.allReply }}条回复
								<u-icon class="more" name="arrow-right" :size="26"></u-icon>
							</view>
						</view> -->

						<!-- 评论日期 -->
						<view class="bottom">
							{{ res.created_at }}
							<view class="reply">回复</view>
						</view>
					</view>
				</view>
			</block>
			<block v-else>
				<!-- 无评论 -->
				<u--text class="commentEmpty" text="—— 暂无评论 ——" size="18" align="center" lineHeight="150" color="grey"></u--text>
			</block>
		</view>

		<!-- 推荐商品 -->
		<view class="u-p-b-80" v-if="current == 2">
			<u-row gutter="12" class="flex-wrap">
				<u-col v-for="(goods, index) in likeGoodsList" span="5.6" :key="index" class="goods-col"><c-goods-card :goods="goods"></c-goods-card></u-col>
			</u-row>
		</view>

		<!-- 底部按钮栏 -->
		<view class="naviagtion" style="position:fixed;bottom:0;width:100%;display:flex;justify-content: space-around;">
			<view class="left">
				<view class="item" @click="clcGoodsCollect">
					<block v-if="isCollect">
						<u-icon name="star" :size="30" color="red"></u-icon>
						<view class="text u-line-1">已收藏</view>
					</block>
					<block v-else>
						<u-icon name="star" :size="30" :color="$u.color['contentColor']"></u-icon>
						<view class="text u-line-1">收藏</view>
					</block>
				</view>
				<view class="item car">
					<u-badge class="car-num" type="error" :value="cartCount" max="99" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="30" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @click="addCart">加入购物车</view>
				<view class="buy btn u-line-1">立即购买</view>
			</view>
		</view>
		<u-loading-page :loading="flagLoading" color="white" loading-mode="spinner" loadingColor="white" bgColor="rgba(179,179,179,.5)"></u-loading-page>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					name: '商品详情'
				},
				{
					name: '商品评论',
					badge: {
						value: 0
					}
				},
				{
					name: '推荐商品'
				}
			],
			current: 0, // 当前tab页索引
			goodsInfo: {}, // 当前商品信息
			commentList: [], // 评论列表
			hasComment: false, // 有评论状态
			likeGoodsList: [], // 相关推荐列表
			goodsCurrentID: null, // 当前商品ID
			isCollect: false, // 已收藏状态
			flagLoading: true, // 页面加载中状态
			cartCount: 0
		};
	},
	methods: {
		async getData() {
			const res = await this.$u.api.goodsInfo(this.goodsCurrentID);
			this.goodsInfo = res.data.goods; // 商品详情
			this.commentList = res.data.goods.comments; // 评论列表
			this.commentList.length > 0 ? (this.hasComment = true) : (this.hasComment = false); // 是否显示"暂无评论"
			this.list[1].badge.value = res.data.goods.comments.length; // 标签栏角标
			this.likeGoodsList = res.data.like_goods; // 推荐商品
			this.isCollect = res.data.goods.is_collect ? true : false; // 收藏状态
			this.flagLoading = false; // 取消加载中状态
		},
		change(res) {
			this.current = res.index;
		},
		// 跳转到全部回复
		toAllReply() {
			uni.navigateTo({
				url: '/pages/template/comment/reply'
			});
		},
		// 收藏按钮
		async clcGoodsCollect() {
			let res = await this.$u.api.goodsCollect(this.goodsCurrentID);
			console.log(res);
			res.statusCode == 201
				? (() => {
						this.isCollect = 1;
						this.$u.toast('收藏成功');
				  })()
				: (() => {
						this.isCollect = 0;
						this.$u.toast('取消成功');
				  })();
		},
		// 加入购物车
		async addCart() {
			const params = { goods_id: this.goodsCurrentID };
			await this.$u.api.cartAdd(params);
			this.$u.toast('添加成功');
			this.getCartCount();
		},
		// 购物车数量
		async getCartCount() {
			// 判断是否登录，直接使用utils里的判断登录会导致多余操作，未登录时会跳转至登录页
			const token = this.$store.state.vuex_token;
			if (token) {
				const res = await this.$u.api.cartList();
				this.cartCount = res.data.data.length;
			}
		}

		// 点赞
		// getLike(index) {
		// 	this.commentList[index].isLike = !this.commentList[index].isLike;
		// 	if (this.commentList[index].isLike == true) {
		// 		this.commentList[index].likeNum++;
		// 	} else {
		// 		this.commentList[index].likeNum--;
		// 	}
		// }

		// 评论列表
		// 	getComment() {
		// 		this.commentList = [
		// 			{
		// 				id: 1,
		// 				name: '叶轻眉',
		// 				date: '12-25 18:58',
		// 				contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
		// 				url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
		// 				allReply: 12,
		// 				likeNum: 33,
		// 				isLike: false,
		// 				replyList: [
		// 					{
		// 						name: 'uview',
		// 						contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
		// 					},
		// 					{
		// 						name: 'AT',
		// 						contentStr: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
		// 					}
		// 				]
		// 			},
		// 			{
		// 				id: 2,
		// 				name: '叶轻眉1',
		// 				date: '01-25 13:58',
		// 				contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
		// 				allReply: 0,
		// 				likeNum: 11,
		// 				isLike: false,
		// 				url: 'https://cdn.uviewui.com/uview/template/niannian.jpg'
		// 			},
		// 			{
		// 				id: 3,
		// 				name: '叶轻眉2',
		// 				date: '03-25 13:58',
		// 				contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
		// 				allReply: 0,
		// 				likeNum: 21,
		// 				isLike: false,
		// 				allReply: 2,
		// 				url: '../../../static/logo.png',
		// 				replyList: [
		// 					{
		// 						name: 'uview',
		// 						contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
		// 					},
		// 					{
		// 						name: '豆包',
		// 						contentStr: '想吃冰糖葫芦粘豆包，但没钱5555.........'
		// 					}
		// 				]
		// 			},
		// 			{
		// 				id: 4,
		// 				name: '叶轻眉3',
		// 				date: '06-20 13:58',
		// 				contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
		// 				url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
		// 				allReply: 0,
		// 				likeNum: 150,
		// 				isLike: false
		// 			}
		// 		];
		// 	}
	},
	onLoad(options) {
		// 从url参数，获取当前商品id
		this.goodsCurrentID = options.id;

		// this.getComment();
		this.getData(); // 商品数据
		this.getCartCount(); // 购物车数量
	}
};
</script>

<style lang="scss" scoped>
.u-p-b-80 {
	padding-bottom: 150rpx;
}
.top2 {
	margin: 40rpx 0;
	padding: 30rpx 40rpx;
	background: white;
	margin-bottom: 0;
}
.title {
	font-size: 36rpx;
	font-weight: 600;
}
.des {
	margin-top: 30rpx;
	display: flex;
	justify-content: space-between;
}
.price {
	font-size: 36rpx;
	color: red;
	font-weight: 600;
}
.sales {
	color: #333;
}
.comment {
	display: flex;
	padding: 30rpx;
	.left {
		image {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			background-color: #f2f2f2;
		}
	}
	.right {
		flex: 1;
		padding-left: 20rpx;
		font-size: 30rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;
			.name {
				color: #5677fc;
			}
			.like {
				display: flex;
				align-items: center;
				color: #9a9a9a;
				font-size: 26rpx;
				.num {
					margin-right: 4rpx;
					color: #9a9a9a;
				}
			}
			.highlight {
				color: #5677fc;
				.num {
					color: #5677fc;
				}
			}
		}
		.content {
			margin-bottom: 10rpx;
		}
		.reply-box {
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			.item {
				padding: 20rpx;
				border-bottom: solid 2rpx $u-border-color;
				.username {
					font-size: 24rpx;
					color: #999999;
				}
			}
			.all-reply {
				padding: 20rpx;
				display: flex;
				color: #5677fc;
				align-items: center;
				.more {
					margin-left: 6rpx;
				}
			}
		}
		.bottom {
			margin-top: 20rpx;
			display: flex;
			font-size: 24rpx;
			color: #9a9a9a;
			.reply {
				color: #5677fc;
				margin-left: 10rpx;
			}
		}
	}
}
.flex-wrap {
	flex-wrap: wrap; // 允许换行
}
.goods-col {
	/* 使用u-line-1，解决title过长导致下面的所有商品卡片，水平不在对齐 */
	/* 临时，不知道为什么u-line-1会导致width变宽，部分商品封面尺寸更大导致一行只能显示一个商品，把col的width降到47%就不会发生 */
	width: 47%;
}
.naviagtion {
	display: flex;
	margin-top: 100rpx;
	border: solid 2rpx #f2f2f2;
	background-color: #ffffff;
	padding: 16rpx 0;
	.left {
		display: flex;
		font-size: 20rpx;
		.item {
			margin: 0 30rpx;
			&.car {
				text-align: center;
				position: relative;
				.car-num {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
				}
			}
		}
	}
	.right {
		display: flex;
		font-size: 28rpx;
		align-items: center;
		.btn {
			line-height: 66rpx;
			padding: 0 30rpx;
			border-radius: 36rpx;
			color: #ffffff;
		}
		.cart {
			background-color: #ed3f14;
			margin-right: 30rpx;
		}
		.buy {
			background-color: #ff7900;
		}
	}
}
</style>
