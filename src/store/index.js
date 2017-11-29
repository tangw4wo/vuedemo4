/**
 * Created by dell on 2017/11/27.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import orderList from'./modules/orderList'
Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    orderList
  }
})
