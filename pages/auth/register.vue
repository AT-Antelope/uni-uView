<template>
	<view class="content">
		<!-- brand-sign -->
		<view class="header"><image :src="pic"></image></view>

		<view class="list">
			<!-- name -->
			<view class="list-call"><input class="sl-input" v-model="name" type="number" maxlength="11" placeholder="用户名" /></view>
			<!-- email -->
			<view class="list-call"><input class="sl-input" v-model="email" type="text" maxlength="32" placeholder="邮箱" :password="!showPassword" /></view>
			<!-- passwords -->
			<view class="list-call"><input class="sl-input" v-model="passwords" type="text" maxlength="32" placeholder="密码" :password="!showPassword" /></view>
			<!-- password_confirmation -->
			<view class="list-call"><input class="sl-input" v-model="password_confirmation" type="text" maxlength="32" placeholder="确认密码" :password="!showPassword" /></view>
		</view>

		<!-- btnSubmit -->
		<view class="button-login" hover-class="button-hover" @tap="submit"><text>注册</text></view>

		<!-- <view class="agreement">
			<image @tap="agreementSuccess" src=""></image>
			<text @tap="agreementSuccess">同意</text>
			<navigator url="agreement?id=1" open-type="navigate">《软件用户协议》</navigator>
		</view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			name: '',
			email: '',
			passwords: '',
			password_confirmation: '',
			pic: 'https://uviewui.com/common/logo.png'
		};
	},
	methods: {
		// TODO 注册页的改造
		// 注册
		async submit() {
			// 1.表单验证
			// 2.准备提交参数
			const params = {
				name: this.name,
				email: this.email,
				passwords: this.passwords,
				password_confirmation: this.password_confirmation
			};
			// 3.请求API，执行注册
			const res = this.$u.api.authRegister(params);
			// 4.注册成功后，重定向到登录页(redirect)
			console.log(params);
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
	width: 161rpx;
	height: 161rpx;
	background: rgba(63, 205, 235, 1);
	box-shadow: 0rpx 12rpx 13rpx 0rpx rgba(63, 205, 235, 0.47);
	border-radius: 50%;
	margin-top: 30rpx;
	margin-left: auto;
	margin-right: auto;
}

.header image {
	width: 161rpx;
	height: 161rpx;
	border-radius: 50%;
}

.list {
	display: flex;
	flex-direction: column;
	padding-top: 50rpx;
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

.yzm {
	color: #ff7d13;
	font-size: 24rpx;
	line-height: 64rpx;
	padding-left: 10rpx;
	padding-right: 10rpx;
	width: auto;
	height: 64rpx;
	border: 1rpx solid #ffa800;
	border-radius: 50rpx;
}

.yzms {
	color: #999999 !important;
	border: 1rpx solid #999999;
}

.button-login {
	color: #ffffff;
	font-size: 34rpx;
	width: 470rpx;
	height: 100rpx;
	line-height: 100rpx;
	background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
	box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
	border-radius: 50rpx;
	text-align: center;
	margin-left: auto;
	margin-right: auto;
	margin-top: 100rpx;
}

.button-hover {
	background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
}

.agreement {
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

.agreement image {
	width: 40rpx;
	height: 40rpx;
}
</style>
