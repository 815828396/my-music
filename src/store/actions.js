import * as types from './mutation-types'

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_PLAYING_STATE, true) // 播放状态
  commit(types.SET_FULL_SCREEN, true) // 是否全屏
  commit(types.SET_PLAYLIST, list) // 播放列表
  commit(types.SET_CURRENT_INDEX, index) // 当前播放索引
}
