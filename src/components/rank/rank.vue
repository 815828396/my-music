<template>
  <div class="rank">
    <div v-if="ranks.length" class="rank-inner">
      <div v-for="item in ranks" class="rank-item" @click="selectItem(item)">
        <div class="img">
          <img :src="item.picUrl" alt="">
        </div>
        <ul class="content">
          <li v-for="(song, index) in item.songList">{{index+1}}:{{song.songname}}-{{song.singername}}</li>
        </ul>
      </div>
    </div>
    <div v-else class="loading">
      <div class="loding-inner">
        <img src="../recomend/loding.gif">
        <p>正在加载中</p>          
      </div>
    </div>
    <transition name="rank">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {getRank} from '@/common/js/rank.js'

export default {
  name: 'rank',
  data () {
    return {
      ranks: []
    }
  },
  created () {
    setTimeout(() => {
      this._getRank()
    }, 20)
  },
  methods: {
    _getRank () {
      getRank().then(res => {
        this.ranks = res.data.topList
      })
    },
    selectItem (item) {
      this.$router.push({
        name: 'topList',
        params: {
          id: item.id,
          picUrl: item.picUrl,
          topTitle: item.topTitle
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.rank
  width: 100%
  .rank-inner
    width: 90%
    margin: 10px auto
    .rank-item
      display: flex
      margin-top: 20px
      background: #313131
      img
        width: 100px
      .content
        flex: 1
        display: flex
        flex-direction: column
        padding: 10px 20px
        font-size: 14px
        color: #848484
        justify-content: center
        overflow: hidden
        li
          flex-grow: 1
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          line-height: 26px
.rank-enter-active, .rank-leave-active
  transition: all 0.3s ease

.rank-enter, .rank-leave-to
  transform: translate3d(0, -100%, 0)
</style>
