import * as types from './mutation-types'

const matutaions = {

  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  }

}

export default matutaions
