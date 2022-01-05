const state = {
	tabbarIndex: 0
}
const getters = {
	tabbarIndex: (state) => this.$u.getStorage("tabbarIndex")
}
const mutations = {

}
const actions = {

}
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
