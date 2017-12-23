<template>
  <div class="slider" ref="slider">
    <div class="slider-grop" ref="sliderGrop">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index">{{index}}</span>
    </div>
  </div>
</template>

<script>
import {addClass} from '@/common/js/dom.js'
import BScroll from 'better-scroll'

export default {
  name: 'slider',
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this._initSlider()
      this._initDots()
    }, 20)
  },
  methods: {
    _setSliderWidth () {
      this.children = this.$refs.sliderGrop.children

      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth

      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      this.$refs.sliderGrop.style.width = width + 'px'
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })

      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
      })
    },
    _initDots () {
      this.dots = new Array(this.children.length)
    }
  }
}
</script>

<style lang="stylus" scoped>
.slider
  min-height: 1px
  overflow: hidden
  .slider-grop
    position: relative
    overflow: hidden
    .slider-item
      float: left
      overflow: hidden
      text-align: center
      box-sizing: border-box
      a
        display: block
        width: 100%
      img
        display: block
        width: 100%
  .dots
    position: absolute
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: white
      &.active
        width: 20px
        border-radius: 5px
        background: #afafaf

</style>
