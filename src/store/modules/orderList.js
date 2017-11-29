/**
 * Created by dell on 2017/11/27.
 */
import Vue from'vue'
const state={
    orderList:[],
    params:{}
}
const getters={
  getOrderList:state=>state.orderList
}
const actions={
  fetchOrderList({commit,state}){
    Vue.http.post('/api/getOrderList',state.params).then((res)=>{
      commit('updateOrderList',res.data.list)
      state.total=res.data.total
    },(err)=>{
      console.log(err)
    })
  }
}
const mutations={
  updateOrderList(state,payload){
    state.orderList=payload
  },
  updateParams(state,{key,val}){
    state.params[key]=val
    console.log(state.params)
  }

}
export default{
    state,
    getters,
    actions,
    mutations
}
