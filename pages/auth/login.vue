<template>
	<view class="content">
		<view class="header">
			<!-- <image src="../../static/shilu-login/logo.png"></image> -->
			<view class="title">欢迎来到图书商城</view>
		</view>

		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/shilu-login/1.png"></image>
				<input class="sl-input" v-model="email" type="string" maxlength="32" placeholder="输入邮箱" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/shilu-login/2.png"></image>
				<input class="sl-input" v-model="passwords" type="text" maxlength="32" placeholder="输入密码" password="true" />
			</view>
		</view>

		<view class="button-login" hover-class="button-hover" @tap="btnLogin()"><text>登录</text></view>

		<view class="agreenment">
			<navigator url="forget" open-type="navigate">忘记密码</navigator>
			<text>|</text>
			<navigator url="./register" open-type="navigate">注册账户</navigator>
		</view>
		<!-- 消息提示 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			passwords: ''
		};
	},
	methods: {
		async btnLogin() {
			// if (this.email.length != 11) {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: '手机号不正确'
			// 	});
			// 	return;
			// }
			// if (this.password.length < 6) {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: '密码不正确'
			// 	});
			// 	return;
			// }
			// 数据检验
			if (!uni.$u.test.email(this.email) || !(this.passwords.length >= 6)) {
				this.$refs.uToast.show({
					type: 'error',
					title: '错误',
					message: '账号或密码错误',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
				});
				return;
			}
			const params = {
				email: this.email,
				password: this.passwords
			};
			// api请求，登录
			const loginRes = await this.$u.api.authLogin(params);
			this.$u.vuex('vuex_token', loginRes.data.access_token);
			this.$u.toast('登录成功');
			// api请求，获取用户信息
			const userInfo = await this.$u.api.userInfo();
			this.$u.vuex('vuex_userInfo', userInfo);
			// 登录后，跳转到来源页
			const backUrl = uni.getStorageSync('back_url') || 'pages/index/index';
			setTimeout(() => {
				this.$u.route({
					type: 'reLaunch',
					url: backUrl
				});
			}, 1500);
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.header {
	// width: 161rpx;
	height: 161rpx;
	/* background: rgba(63, 205, 235, 1); */
	/* box-shadow: 0rpx 12rpx 13rpx 0rpx rgba(63, 205, 235, 0.47); */
	border-radius: 50%;
	margin-top: 30rpx;
	// margin-left: auto;
	// margin-right: auto;
	.title {
		width: 100%;
		margin-left: 15%;
		margin-top: 15%;
		font-size: 54rpx;
		font-weight: bold;
	}
}

.header image {
	width: 161rpx;
	height: 161rpx;
	border-radius: 50%;
}

.list {
	display: flex;
	flex-direction: column;
	// padding-top: 50rpx;
	padding-top: 100rpx;
	padding-left: 70rpx;
	padding-right: 70rpx;
}

.list-call {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 100rpx;
	color: #333333;
	border-bottom: 0.5px solid #e2e2e2;
}

.list-call .img {
	width: 40rpx;
	height: 40rpx;
}

.list-call .sl-input {
	flex: 1;
	text-align: left;
	font-size: 32rpx;
	margin-left: 16rpx;
}

.button-login {
	color: #ffffff;
	font-size: 34rpx;
	width: 470rpx;
	height: 100rpx;
	background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
	box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
	border-radius: 50rpx;
	line-height: 100rpx;
	text-align: center;
	margin-left: auto;
	margin-right: auto;
	margin-top: 100rpx;
}

.button-hover {
	background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
}

.agreenment {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	font-size: 30rpx;
	margin-top: 80rpx;
	color: #ffa800;
	text-align: center;
	height: 40rpx;
	line-height: 40rpx;
}

.agreenment text {
	font-size: 24rpx;
	margin-left: 15rpx;
	margin-right: 15rpx;
}
</style>
