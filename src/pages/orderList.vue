<template>
    <div class="order-wrap">
      <h3>您的产品</h3>
      <div class="order-list-choose">
        <div class="order-list-option">
          选择产品：
          <v-selection :selections="products" @on-change="productChange"></v-selection>
        </div>

        <div class="order-list-option">
          开始日期：
          <v-date-picker-local v-model="starDate"></v-date-picker-local>
        </div>

        <div class="order-list-option">
          结束日期：
          <v-date-picker-local v-model="endDate"></v-date-picker-local>
        </div>
        <div class="order-list-option">
          关键词：
          <input type="text" v-model.lazy="query" class="order-query">
        </div>
      </div>
      <div class="order-list-table">
        <table>
          <tr>
            <th v-for="head in tableHeads" @click="changeOrderType(head)" :class="{active:head.active}">{{ head.label }}</th>
          </tr>
          <tr v-for="item in tableData" :key="item.period">
            <td v-for="head in tableHeads">{{ item[head.key] }}</td>
          </tr>
        </table>
      </div>
    </div>
  </template>
<script>
  import VSelection from'../components/base/selection'
  import VDatePickerLocal from'vue-datepicker-local'
  import _ from'lodash'
  export default{
      components:{
        VSelection,
        VDatePickerLocal
      },
      data(){
          return{
            starDate:new Date(),
            endDate:new Date(),
            query:'',
            productId:0,
            products: [
              {
                label: '数据统计',
                value: 0
              },
              {
                label: '数据预测',
                value: 1
              },
              {
                label: '流量分析',
                value: 2
              },
              {
                label: '广告发布',
                value: 3
              }
            ],
            tableHeads: [
              {
                label: '订单号',
                key: 'orderId'
              },
              {
                label: '购买产品',
                key: 'product'
              },
              {
                label: '版本类型',
                key: 'version'
              },
              {
                label: '有效时间',
                key: 'period'
              },
              {
                label: '购买日期',
                key: 'date'
              },
              {
                label: '数量',
                key: 'buyNum'
              },
              {
                label: '总价',
                key: 'amount'
              }
            ],
            currentOrder: 'asc',

          }
      },
    computed:{
      setStarDate(){
        return  this.starDate.getFullYear()+'-'+(this.starDate.getMonth()+1)+'-'+this.starDate.getDate()
      },
      setEndDate(){
        return  this.endDate.getFullYear()+'-'+(this.endDate.getMonth()+1)+'-'+this.endDate.getDate()
      },
      tableData(){
          return this.$store.getters.getOrderList
      }
    },
    methods:{
      productChange(obj){
          this.productId=obj.value
          this.$store.commit('updateParams',{
              key:'productId',
              val:obj.value
          })
        this.$store.dispatch('fetchOrderList')
        console.log(this.tableData[0])
//          this.getList();
      },
//      getList () {
//        let reqParams = {
//          query: this.query,
//          productId: this.productId,
//          startDate: this.setStarDate,
//          endDate: this.setEndDate
//        }
//        this.$http.post('/api/getOrderList', reqParams)
//          .then((res) => {
//            this.tableData = res.data.list
//          }, (err) => {
//
//          })
//      },
      changeOrderType (headItem) {
        this.tableHeads.map((item) => {
          item.active = false
          return item
        })
        headItem.active = true
        if (this.currentOrder === 'asc') {
          this.currentOrder = 'desc'
        }
        else if (this.currentOrder === 'desc') {
          this.currentOrder = 'asc'
        }
        this.tableData = _.orderBy(this.tableData, headItem.key, this.currentOrder)
      }
    },
    watch:{
          starDate(){
            this.$store.commit('updateParams',{
              key:'starDate',
              val:this.setStarDate
            })
            this.$store.dispatch('fetchOrderList')
          },
          endDate(){
            this.$store.commit('updateParams',{
              key:'endDate',
              val:this.setEndDate
            })
//            this.getList()
            this.$store.dispatch('fetchOrderList')
          },
          query(){
            this.$store.commit('updateParams',{
              key:'query',
              val:this.query
            })
//            this.getList()
            this.$store.dispatch('fetchOrderList')
          }

    },
    mounted () {
      this.$store.dispatch('fetchOrderList')
//      this.getList()

    }

  }
</script>

<style scoped>
  .order-wrap {
    width: 1200px;
    min-height: 800px;
    margin: 20px auto;
    overflow: hidden;
  }
  .order-wrap h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .order-query {
    height: 25px;
    line-height: 25px;
    border: 1px solid #e3e3e3;
    outline: none;
    text-indent: 10px;
  }
  .order-list-option {
    display: inline-block;
    padding-left: 15px;
  }
  .order-list-option:first-child {
    padding-left: 0;
  }
  .order-list-table {
    margin-top: 20px;
  }
  .order-list-table table {
    width: 100%;
    background: #fff;
  }
  .order-list-table td,
  .order-list-table th {
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 10px 0;
  }
  .order-list-table th {
    background: #4fc08d;
    color: #fff;
    border: 1px solid #4fc08d;
    cursor: pointer;
  }
  .order-list-table th.active {
    background: #35495e;
  }
</style>
