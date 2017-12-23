<template>
  <div class="recomend">
    <div v-if="recommends.length" class="slider-wrapper">
      <slider>
        <div v-for="item in recommends">
          <a :href="item.linkUrl">
            <img class="needsclick" :src="item.picUrl">
          </a>
        </div>
      </slider>
    </div>
    <div class="recomend-list">
      <div><!--better-scroll-->
        <h1 class="title">热门歌曲推荐</h1>
        <ul v-if="disclists.length" class="item-list">
          <p class="item-length">为您推荐{{disclists.length}}首:</p>        
          <li v-for="(item, index) in disclists" class="item" @click="selectItem(item, index)">
            <div class="item-index">
              <img v-if="index < 3" :src="'src/common/images/icon'+index+'.png'">
              <span v-else>{{index+1}}</span>
            </div>
            <div class="item-content">
              <h3>{{item.name}}</h3>
              <p>{{item.singer}}</p>
              <i class="icon iconfont icon-bofang"></i>
            </div>
          </li>
        </ul>
        <div v-else class="loading">
          <div class="loding-inner">
            <img src="./loding.gif">
            <p>正在加载中</p>          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '@/base/slider/slider'
import {getAxios} from '@/common/js/axios.js'
import {createSong} from '@/common/js/song.js'
import {mapActions} from 'vuex'

export default {
  data () {
    return {
      recommends: [],
      disclists: []
    }
  },
  created () {
    this._getRecommend()
    this._getDisclist()
  },
  methods: {
    _getRecommend () { // 获取轮播
      getAxios('https://bird.ioliu.cn/v1?url=https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg')
      .then(res => {
        this.recommends = res.data.data.slider
      })
    },
    _getDisclist () {
      getAxios('https://bird.ioliu.cn/v1?url=https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=26&_=1513664661791')
      .then(res => {
        this.disclists = this.musicData(res.data.songlist.slice(0, 100))
      })
    },
    musicData (list) {
      let ret = []
      list.forEach(item => {
        const data = item.data
        if (data.albumid && data.albumname) {
          ret.push(createSong(data))
        }
      })
      return ret
    },
    selectItem (item, index) {
      this.selectPlay({
        list: this.disclists,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  components: {
    Slider
  }
}
</script>

<style lang="stylus" scoped>
.recomend
  color: 
  .slider-wrapper
    position: relative
    width: 100%
    overflow: hidden
  .recomend-list
    color: #ccc
    .title
      margin: 30px 0
      text-align: center
      font-size: 14px
    .item-length
      padding: 10px 10px
      border-left: 3px solid #ffda22
      color: #ffda22
      font-size: 14px
    .item
      position: relative
      display: flex
      padding: 3px 0
      height: 60px
      border-bottom: 1px solid #353535
      .item-index
        width: 45px
        text-align: center
        line-height: 60px
        color: #ee90ef
        img
          width: 42%
      .item-content
        position: relative
        flex-grow: 1
        line-height: 20px
        overflow: hidden
        h3
          margin: 10px 0
          max-width: 80%
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
        p
          font-size: 12px
        .icon
          position: absolute
          top: 33%
          right: 30px
          img
            width: 20px
.item 
  &:nth-child(2) 
    .item-index
      color: red
</style>
