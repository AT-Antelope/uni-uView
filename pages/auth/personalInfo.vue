<template>
	<view class="outter-wrap">
		<view class="avatarUploader"><c-upload></c-upload></view>
		<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<u--form labelPosition="left" :model="form" :rules="rules" ref="uForm">
			<u-form-item label="姓名" prop="name" ref="item1" borderBottom required><u--input v-model="form.name" border="none"></u--input></u-form-item>
		</u--form>
		<u-button text="提交" @tap="submit"></u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: ''
			},
			rules: {
				name: {
					type: 'string',
					required: true,
					message: '请填写姓名',
					trigger: ['blur', 'change']
				}
			}
		};
	},
	methods: {
		submit() {
			this.$refs.uForm
				.validate()
				.then(async res => {
					const params = { name: this.form.name };
					// 修改用户信息，api请求
					const m = await this.$u.api.userInfoUpdate(params);
					console.log(m);
					// 刷新用户信息，更新vuex_	user
					this.$u.utils.updateUser();
					this.$u.toast('更新成功');
					setTimeout(() => {
						this.$u.route({
							type: 'redirectTo',
							url: '/pages/personalCenter/index'
						});
					}, 1500);
				})
				.catch(err => {
					this.$u.toast('更新失败\r' + err);
				});
		}
	},
	onReady() {
		// 设置规则，onload里可能还未创建完毕
		this.$refs.uForm.setRules(this.rules);
		// 默认显示原昵称
		this.form.name = this.$store.state.vuex_userInfo.data ? this.$store.state.vuex_userInfo.data.name : '未登录';
	}
};
</script>

<style lang="scss" scoped>
.avatarUploader {
	// margin-left: 50%;
	// transform: translateX(-15%);
}
.outter-wrap {
	margin: 0 40rpx;
}
</style>
