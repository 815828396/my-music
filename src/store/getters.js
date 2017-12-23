
export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playList = state => state.playList

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
