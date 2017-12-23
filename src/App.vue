<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <transition name="app" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <player></player>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
import Tab from '@/components/tab/tab'
import Player from '@/components/player/player'

export default {
  name: 'app',
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loading
  position: absolute
  top: 60%
  width: 100%
  transform: translateY(-50%)
  height: 40px;
  .loding-inner
    width: 100%
    position: absolute
    text-align: center
    img
      width: 30px
      height: 30px
    p
      font-size: 12px
      margin-top: 20px
.app-enter-active, .app-leave-active
  transition: all 0.3s ease

.app-enter, .app-leave-to
  transform: translate3d(-100%, 0, 0)
</style>
