<template>
  <div class="search-box">
    <i class="icon iconfont icon-chaxun"></i>
    <input class="box" type="text" v-model="query" :placeholder="placeholder">
    <i v-show="query" @click="clearQuery" class="icon iconfont icon-quxiao"></i>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请搜索'
    }
  },
  data () {
    return {
      query: ''
    }
  },
  created () {
    this.$watch('query', this.debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 200))
  },
  methods: {
    debounce (func, delay) { // 延迟搜索
      let timer
      return function (...args) {
        if (timer) {
          clearInterval(timer)
        }
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    clearQuery () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    }
  }

}
</script>

<style lang="stylus" scoped>
.search-box
  display: flex
  width: 90%
  height: 40px
  margin: 30px auto
  padding: 10px
  background: #333131
  justify-content: center
  align-items: center
  .box
    width: 90%
    height: 30px
    margin: 0 10px
    padding-left: 10px
    background: transparent
    border: 2px solid transparent
    border-radius: 10px
    transition: border .3s
    color: #9a9a9a
    outline: none
    &:focus
      border: 2px solid #7d7a7a
</style>
