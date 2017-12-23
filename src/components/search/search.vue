<template>
  <div class="search">
    <search-box ref="searchBox" @query="queryChange"></search-box>
    <search-list :query="query"></search-list>
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul class="hot-list">
        <li @click="addQuery(item.k)" v-for="item in hots">{{item.k}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchBox from './search-box'
import SearchList from './search-list'
import {getHotSearch} from '@/common/js/rank.js'

export default {
  data () {
    return {
      hots: [],
      query: ''
    }
  },
  created () {
    this._getHotSearch()
  },
  methods: {
    _getHotSearch () {
      getHotSearch().then(res => {
        this.hots = res.data.hotkey.slice(0, 13)
      })
    },
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
    },
    queryChange (query) {
      this.query = query
    }
  },
  components: {
    SearchBox,
    SearchList
  }
}
</script>

<style lang="stylus" scoped>
.search-hot
  padding-left: 20px
  color: #b3b3b3
  .hot-list
    margin-top: 20px
    display: flex
    flex-wrap: wrap
    li
      margin: 5px
      padding: 5px 10px
      background: #2d2d2d
      border-radius: 10px
      font-size: 12px
      letter-spacing: 3px
.search-list
  display: flex
  width: 100%

</style>
