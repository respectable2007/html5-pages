const state = {
	isShowList: false,
	address: null
}
const getters = {
	getIsShow () {
		return state.isShowList
	},
	getAddress () {
		return state.address
	}
}
const mutations = {
	setIsShow (state, param) {
		state.isShowList = param
	},
	setAddress (state, param) {
		state.address = param
	}
}
export default {
  state,
  getters,
  mutations
}
