<template>
	<view>
		<u-upload :fileList="avatarFileList" @afterRead="afterRead" :name="`${userName}-Avatar`" :maxCount="1" maxSize="5*1024*1024" :deletable="false" previewImage>
			<!-- slot -->
			<!-- <u-avatar :src="userAvtarUrl" size="60"></u-avatar> -->
		</u-upload>
	</view>
</template>

<script>
/**
 * 注意: 在小程序中，有些方法是由组件内部的属性触发的，this可能会丢失，声明一个全局_this，然后页面创建完毕后_this=this，就可以了
 */
let _this = {};
export default {
	name: 'upload',
	props: {},
	data() {
		return {
			avatarFileList: []
		};
	},
	methods: {
		// 新增图片
		async afterRead(event) {
			// 当设置 mutiple(多选) 为 true 时, file 为数组格式，否则为对象格式
			// 储存文件路径
			_this.avatarFileList[0] = event;
			/**
			 * H5:		file.name
			 * 小程序:	file.path
			 */
			// 储存即将上传的文件名，guid()，uView封装的唯一标识符
			_this.avatarNameGuid = `${this.avatarFileList[0].name}_${uni.$u.guid(20)}.jpg`;

			// 获取oss token
			const resOssToken = await _this.$u.api.getOssToken();
			// 储存上传域名
			_this.uploadHost = resOssToken.data.host;
			// 额外的上传参数
			_this.uploadFormData = {
				key: _this.avatarNameGuid,
				policy: resOssToken.data.policy,
				OSSAccessKeyId: resOssToken.data.accessid,
				success_action_status: '200', //让服务端返回200,不然，默认会返回204
				signature: resOssToken.data.signature
			};

			// 获取文件路径
			const params = {
				host: resOssToken.data.host,
				url: _this.avatarFileList[0].file.url,
				formData: _this.uploadFormData
			};
			// 执行文件上传
			const resOssUpload = await _this.uploadFilePromise(params);
			if (resOssUpload === 200) {
				_this.onOssUploaded();
			}
		},
		// 文件上传，返回状态码
		uploadFilePromise(params) {
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: params.host,
					filePath: params.url,
					name: 'file',
					formData: params.formData,
					success: res => {
						// setTimeout(() => {
						resolve(res.statusCode);
						// }, 1000);
					}
				});
			});
		},
		// oss上传完毕后
		async onOssUploaded() {
			const avatarUpdateParams = {
				avatar: this.avatarNameGuid
			};
			// 更新用户头像
			const res = await this.$u.api.avatarUpdate(avatarUpdateParams);
			if (res.statusCode === 204) {
				// 更新缓存的用户信息
				this.$u.utils.updateUser();
				this.$u.toast('更新成功');
			}
		}
	},
	computed: {
		// 头像url
		userAvtarUrl() {
			if (!this.$store.state.vuex_userInfo.data) return 'https://uviewui.com/common/logo.png';
			return this.$store.state.vuex_userInfo.data.avatar_url;
		},
		// TODO 暂用当前用户名，有需要改用用户id等账户识别码，否则用户经常改名时，oss储存占用浪费
		userName() {
			if (!this.$store.state.vuex_userInfo.data) return '未登录';
			return this.$store.state.vuex_userInfo.data.name;
		}
	},
	created() {
		_this = this;
	}
};
</script>

<style lang="scss" scoped></style>
