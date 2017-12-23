import Vue from 'vue'
import Router from 'vue-router'
import Recomend from '@/components/recomend/recomend'
import Rank from '@/components/rank/rank'
import Search from '@/components/search/search'
import TopList from '@/components/top-list/top-list'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recomend'
    }, {
      path: '/recomend',
      name: 'Recomend',
      component: Recomend
    }, {
      path: '/rank',
      name: 'Rank',
      component: Rank,
      children: [
        {
          path: 'musiclist',
          name: 'topList',
          component: TopList
        }
      ]
    }, {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
