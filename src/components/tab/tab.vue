<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recomend">
        <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
        <span class="tab-link">排行榜</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
        <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="stylus" scoped>
.tab
  display: flex
  margin-top: 10px
  text-align: center
  .tab-item
    flex: 1
    padding: 5px 0
    color: #ccc
    &.router-link-active
      color: #f18ce8
      border-bottom: 2px solid #f18ce8
</style>
