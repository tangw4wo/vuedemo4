// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from'./components/layout'
import vueRouter from'vue-router'
import indexPage from './pages/index'
import vueResource from'vue-resource'
import DetailPage from'./pages/detail'
import DetailAnaPage from'./pages/detail/analysis'
import DetailCouPage from'./pages/detail/count'
import DetailForPage from'./pages/detail/forecast'
import DetailPubPage from'./pages/detail/publish'
import orderListPage from'./pages/orderList'
import Store from'./store'

Vue.use(vueRouter)
Vue.use(vueResource)
Vue.config.productionTip = false
/* eslint-disable no-new */
let router = new vueRouter({
  mode:'history',                       //使用html5模式解读地址
  routes:[
    {
      path:'/',
      component:indexPage
    },
    {
      path:'/orderList',
      component:orderListPage
    },
    {
      path:'/detail',
      redirect:'/detail/analysis',
      component:DetailPage,
      children:[
        {
          path:'analysis',
          component:DetailAnaPage
        },
        {
          path:'count',
          component:DetailCouPage
        },
        {
          path:'forecast',
          component:DetailForPage
        },
        {
          path:'publish',
          component:DetailPubPage
        },

      ]
    }
  ]
})
new Vue({
  el: '#app',
  router,
  store:Store,
  template: '<Layout/>',
  components: { Layout }
})
