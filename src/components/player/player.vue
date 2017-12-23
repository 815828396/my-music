<template>
  <div class="player" v-show="playList.length > 0">
    <transition name="normal">
      <!-- 全屏播放器界面 -->
      <div class="normal-player" v-show="fullScreen">

        <!-- 播放器背景歌手图片 -->
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image" alt="">
        </div>

        <!-- 播放器顶部缩小按钮 -->
        <div class="top">
          <div class="back" @click="close">
            <i class="iconfont icon-xia"></i>
          </div>
        </div>

        <!-- 播放器唱片旋转图片 -->
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd" :class="cdRotate">
                <img :src="currentSong.image" alt="" class="image">
              </div>
            </div>
          </div>
          <h1 class="title" v-html="'曲名:' + currentSong.name"></h1>
          <h2 class="singer" v-html="'歌手:' + currentSong.singer"></h2>
        </div>

        <!-- 播放器功能 -->
        <div class="bottom">

          <!-- 进度条 -->
          <div class="progress-wrapper">
            <span class="time current-time">{{stampTime(currentTime)}}</span>
            <div class="progress" @click="progressClick">
              <div class="progress-bar" ref="prgressBar"
                @touchstart.prevent="progressStart"
                @touchmove.prevent="progressMove"
                @touchend="progressEnd"
              >
                <span class="bar-btn" ref="barBtn"></span>
                <div class="bar-track" ref="barTrack"></div>
              </div>
            </div>
            <span class="time duration">{{stampTime(duration)}}</span>
          </div>
          
          <!-- 按钮 -->
          <div class="operators">
            <div class="icon icon-left" @click="randomPlay">
              <i class="iconfont icon-cloud-circulation"></i>
            </div>
            <div class="icon icon-left" @click="prev">
              <i class="iconfont icon-xiayige1"></i>
            </div>
            <div class="icon icon-center" @click="toggle">
              <i class="iconfont" :class="iconPlay"></i>
            </div>
            <div class="icon icon-right" @click="next">
              <i class="iconfont icon-xiayige"></i>
            </div>
            <div class="icon icon-right">
              <i class="icon icon-yinle"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="mini">
      <!-- 小屏幕播放器界面 -->
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img width="40" height="40" :src="currentSong.image" alt="">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">

        </div>
        <div class="control">
          <i class="iconfont" :class="iconPlay" @click.stop="toggle"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  data () {
    return {
      currentTime: 0,
      duration: 0
    }
  },
  computed: {
    iconPlay () {
      return this.playing ? 'icon-iconfont32' : 'icon-bofang'
    },
    cdRotate () {
      return this.playing ? 'play' : 'pause'
    },
    speedProgress () {
      return this.currentTime / this.duration
    },
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong',
      'playing',
      'currentIndex'
    ])
  },
  created () {
    this.touch = {} // 存储一些touch 事件初始属性
  },
  methods: {
    close () { // 缩小播放器
      this.setFullScreen(false)
    },
    open () { // 展开播放器
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingDate: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    }),
    toggle () {
      this.setPlayingDate(!this.playing)
    },
    next () { // 播放下一首
      if (!this.playing) {
        this.toggle()
      }
      let index = this.currentIndex + 1
      index = (index === this.playList.length ? 0 : index)
      this.setCurrentIndex(index)
    },
    prev () { // 播放上一首
      if (!this.playing) {
        this.toggle()
      }
      let index = this.currentIndex - 1
      index = (index === -1 ? this.playList.length - 1 : index)
      this.setCurrentIndex(index)
    },
    updateTime (ev) { // 时间显示
      this.currentTime = ev.target.currentTime
      this.duration = ev.target.duration
      if (this.currentTime === this.duration) {
        this.next()
      }
    },
    error () { // 播放错误
      setTimeout(() => {
        this.next()
      }, 2000)
    },
    stampTime (time) { // 将时间戳 转化
      time = time | 0 // 向下取整
      let minute = time / 60 | 0
      let second = time % 60
      if (second < 10) {
        second = '0' + second
      }
      return `${minute}:${second}`
    },
    randomPlay () { // 随机播放
      let index = Math.random() * this.playList.length | 0
      this.setCurrentIndex(index)
    },
    progressClick (ev) {
      let barWidth = this.$refs.prgressBar.clientWidth - 5
      let precent = ev.offsetX / barWidth
      this.$refs.audio.currentTime = this.currentSong.duration * precent
    },
    progressStart (ev) {
      this.touch.init = true // 是否开始拖动
      this.touch.startX = ev.touches[0].pageX
      this.touch.left = this.$refs.barTrack.clientWidth
    },
    progressMove (ev) {
      if (!this.touch.init) {
        return
      }
      let deltaX = ev.touches[0].pageX - this.touch.startX
      let offsetWidth = Math.min(this.$refs.prgressBar.clientWidth - 5, Math.max(0, this.touch.left + deltaX))
      this.touch.deviaX = offsetWidth
      this.$refs.barTrack.style.width = `${offsetWidth}px`
      this.$refs.barBtn.style.left = `${offsetWidth}px`
    },
    progressEnd (ev) {
      this.touch.init = false
      let barWidth = this.$refs.prgressBar.clientWidth - 5
      let precent = this.touch.deviaX / barWidth
      this.$refs.audio.currentTime = this.currentSong.duration * precent
    }
  },
  watch: {
    currentSong () {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing (date) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        date ? audio.play() : audio.pause()
      })
    },
    speedProgress (newVal) {
      if (newVal >= 0 && !this.touch.init) {
        let barWidth = this.$refs.prgressBar.clientWidth - 5
        this.$refs.barTrack.style.width = `${barWidth * newVal}px`
        this.$refs.barBtn.style.left = `${barWidth * newVal}px`
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.player
  .normal-player
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 150
    background: #222
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      opacity: 0.6
      filter: blur(2px)
    .top
      position: relative
      margin-bottom: 25px
      .back
        position absolute
        top: 12px
        left: 18px
        z-index: 50
        font-size: 32px
        .icon-backback
          display: block
          padding: 9px
          font-size: $font-size-large-x
          color: $color-theme
          transform: rotate(-90deg)
    .middle
      position: fixed
      width: 100%
      top: 80px
      bottom: 170px
      white-space: nowrap
      font-size: 0
      .title, .singer
        width: 100%
        height: 20px
        font-size: 14px
        margin-top: 23px
        opacity: 0
        text-align: center
      .play-error
        color: #f5f7fd
        font-size: 16px
        text-align: center
        margin-top: 12px
      .title
        animation: yi .3s forwards .6s
      .singer
        animation: fan-yi .3s forwards .6s
      .middle-l
        display: inline-block
        vertical-align: top
        position: relative
        width: 100%
        height: 0
        padding-top: 80%
        .cd-wrapper
          position: absolute
          left: 10%
          top: 0
          width: 80%
          height: 100%
          .cd
            width: 100%
            height: 100%
            box-sizing: border-box
            border: 10px solid rgba(255, 255, 255, 0.1)
            border-radius: 50%
            &.play
              animation: rotate 20s linear infinite
            &.pause
              animation-play-state: paused
            .image
              position: absolute
              left: 0
              top: 0
              width: 100%
              height: 100%
              border-radius: 50%

        .playing-lyric-wrapper
          width: 80%
          margin: 30px auto 0 auto
          overflow: hidden
          text-align: center
          .playing-lyric
            height: 20px
            line-height: 20px
            font-size: $font-size-medium
            color: $color-text-l
      .middle-r
        display: inline-block
        vertical-align: top
        width: 100%
        height: 100%
        overflow: hidden
        .lyric-wrapper
          width: 80%
          margin: 0 auto
          overflow: hidden
          text-align: center
          .text
            line-height: 32px
            color: $color-text-l
            font-size: $font-size-medium
            &.current
              color: $color-text
    .bottom
      position: absolute
      bottom: 50px
      width: 100%
      .progress-wrapper
        display: flex
        flex-grow: 1
        width: 90%
        margin: 0 auto 20px
        justify-content: center
        font-size: 12px
        .time
          width: 40px
          text-align: center
        .progress
          position: relative
          flex-grow: 1
          .progress-bar
            position: absolute
            top: 50%;
            width: 100%
            height: 5px
            border-radius: 5px
            background: #635e5e61
            margin-top: -5px
            .bar-btn
              position: absolute
              top: -5px
              left: 1px
              width: 5px
              height: 15px
              background: #ccc
            .bar-track
              width: 1px
              height: 5px
              background: white
      .operators
        display: flex
        align-items: center
        .icon
          flex: 1
          color: #fff
          text-align: center
          &.disable
            color: #fd6868
          i
            font-size: 30px
        .i-left
          text-align: right
        .i-center
          padding: 0 20px
          text-align: center
          i
            font-size: 40px
        .i-right
          text-align: left
        .icon-favorite
          color: $color-sub-theme
  .mini-player
    display: flex
    align-items: center
    position: fixed
    left: 0
    bottom: 0
    z-index: 180
    width: 100%
    height: 60px
    background: #353535
    .icon
      margin: 0 10px
    .text
      display: flex
      flex-direction: column
      justify-content: center
      flex: 1
      line-height: 20px
      overflow: hidden
      .name
        margin-bottom: 2px
        font-size: 12px
        color: white
      .desc
        font-size: 12px
        color: white
    .control
      flex: 0 0 30px
      width: 30px
      padding: 0 10px
      .icon-mini
        font-size: 32px
        position: absolute
        left: 0
        top: 0

.normal-enter-active, .normal-leave-active
  transition: all 0.4s
.normal-enter, .normal-leave-to
  opacity: 0
  transform: translateY(100%)
@keyframes rotate
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)
@keyframes yi
  0%
    transform: translateY(-10px)
  100%
    opacity: 1
    transform: translateY(0)
@keyframes fan-yi
  0%
    transform: translateY(10px)
  100%
    opacity: 1
    transform: translateY(0)
</style>
