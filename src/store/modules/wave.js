export default {
  namespaced: true,
  state: {
    waveFullScreen: false,
    waveAway: false
  },
  mutations: {
    setFullScreen(state) {
      state.waveFullScreen = true
    },
    setWaveAway(state) {
      state.waveAway = true
    }
  }
}
