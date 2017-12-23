<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
      probeType: {
          type: Number,
          default: 1
      },
      click: {
          type: Boolean,
          default: true
      },
      data: {
          type: Array,
          default: null
      }
  }
}
</script>

<style lang="stylus" scoped>
</style>
