export default {
  namespaced: true,
  state: {
    waveFullScreen: false,
    waveAway: false,
    transition: true,
    signingIn: false
  },
  actions: {
    handleTransition({commit}) {
      commit('setTransition', false)

      setTimeout(() => {
        commit('setTransition', true)
      }, 2000)
    }
  },
  mutations: {
    setFullScreen(state, set) {
      state.waveFullScreen = set
    },
    setWaveAway(state, set) {
      state.waveAway = set
    },
    setTransition(state, set) {
      state.transition = set
    },
    setSigningIn(state, set) {
      state.signingIn = set
    }
  }
}
