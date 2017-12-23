<template>
	<div class="top-list">
    <div v-if="musicList.length">
      <div class="list-top">
        <div class="title">
          <i class="icon iconfont icon-zuo-copy" @click="goBack"></i>
          <h3>{{topList.topTitle}}</h3>
        </div>
        <div class="img">
          <img :src="topList.picUrl">
        </div>
      </div>
      <div class="list-song">
        <ul class="song-item">
          <li class="song" v-for="(song, index) in musicList"  @click="selectItem(song, index)">
            <div class="text">
              <img v-if="index < 3" :src="'../../src/common/images/icon'+index+'.png'">
              <span v-else>{{index+1}}</span>
            </div>
            <div class="content">
              <h3>{{song.name}}</h3>
              <p>{{song.singer}}</p>
              <i class="icon iconfont icon-bofang"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="loading">
      <div class="loding-inner">
        <img src="../recomend/loding.gif">
        <p>正在加载中</p>          
      </div>
    </div>
	</div>
</template>

<script>
import {getTopList} from '@/common/js/rank.js'
import {createSong} from '@/common/js/song.js'
import {mapActions} from 'vuex'

export default {
  data () {
    return {
      topList: [],
      musicList: [],
      CategoryId: ''
    }
  },
  created () {
    this._getTopList()
  },
  methods: {
    _getTopList () {
      let topid = this.$route.params.id
      this.topList = this.$route.params

      getTopList(topid).then(res => {
        if (res.code === 0) {
          // console.log(res)
          this.musicList = this._musicList(res.songlist)
        }
      })
      if (!topid) {
        this.$router.push('/rank')
      }
    },
    _musicList (list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    goBack () {
      this.$router.back()
    },
    selectItem (item, index) { // 跳转播放器
      this.selectPlay({
        list: this.musicList,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.top-list
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: #222
  .list-top
    .title
      position: absolute
      left: 0
      right: 0
      margin-top: 20px
      z-index: 10
      text-align: center
      color: #ffcd32
      .icon
        position: absolute
        top: -3px
        left: 20px
        font-size: 20px
    .img
      text-align: center
      img
        width: 100%
        height: 80%
        opacity: .5
  .list-song
    position absolute
    top: 40%
    width: 100%
    max-height: 100%
    overflow: auto
    background: #222
    .song-item
      display: flex
      flex-direction: column
      justify-content: center
      .song
        position: relative
        display: flex
        height: 60px
        overflow: hidden
        padding: 5px
        border-bottom: 1px solid #353535
        .text
          width: 45px
          line-height: 45px
          text-align: center
          color: #ee90ef
          img
            width: 42%
        .content
          display: flex
          flex-direction: column
          flex: 1
          line-height 30px
          overflow: hidden
          h3
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
          p
            font-size: 12px
            color: #ccc
        .icon
          position: absolute
          top: 10px
          right: 23px
</style>
