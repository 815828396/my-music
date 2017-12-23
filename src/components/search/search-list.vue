<template>
  <div class="search-list">
    <transition name="fade">
      <ul class="result-list" v-show="result.length">
        <p class="tipe">為您搜索:{{result.length}}首歌曲</p>
        <li @click="playMusic(index)" class="music" v-for="(music, index) in result">
          <div class="index iconfont icon-yinle"></div>
          <div class="content">
            <p class="name" v-html="music.name"></p>
            <p class="singer" v-html="music.singer"></p>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script type="text/javascript">
import {getSearchMusic} from '@/common/js/rank.js'
import {createSong} from '@/common/js/song.js'
import {mapActions} from 'vuex'

export default {
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      result: [],
      historyMusic: []
    }
  },
  methods: {
    _getSearchMusic () {
      getSearchMusic(this.query).then(res => {
        let dataArr = res.data.song.list
        dataArr.forEach(item => {
          this.result.push(createSong(item))
        })
      })
    },
    playMusic (index) {
      this.selectPlay({
        list: this.result,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  watch: {
    query () {
      this._getSearchMusic()
      this.result = []
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-list
  width: 100%
  margin: 0 0 10px 0
  .result-list
    width: 100%
    display: flex
    flex-direction: column
    font-size: 14px
    color: #ccc
    .tipe
      padding: 10px 5px
      color: #ed8ce8
    .music
      display: flex
      border-bottom: 1px solid #545454
      padding: 10px 0
      align-items: center
      .index
        width: 40px
        text-align: center
      .content
        .singer
          margin: 10px 0
          font-size: 12px
          color: #796c6c
</style>