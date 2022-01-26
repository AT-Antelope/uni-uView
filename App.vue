<script>
export default {
	onLaunch: async function() {
		// TODO 刷新页面vuex丢失，导致个人信息储存失效，Cannot read property 'commit' of undefined
		// console.log(this.$store.commit);
		// this.$u.utils.updateUser();
	},
	onShow: function() {},
	onHide: function() {}
};
</script>

<style lang="scss">
@import '@/uView/index.scss';
/*每个页面公共css */
</style>
