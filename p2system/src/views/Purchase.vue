<template style="background-color: #f9f9f9">
<div style="margin-left: 10px;margin-right: 10px;height: 100%">
  <div class="cellContainer">
    <van-cell center  icon="location-o" class="cell">
      <div>
        <p>北京市{{user.address}}</p>
        <p>{{ user.uname }} {{ user.phone }}</p>
        <p>{{}}</p>
      </div>
    </van-cell>
  </div>
  <div>
    <el-card
        v-for="(value, o, index) in tableData"
        :key="o"
        :offset="index > 0 ? tableData.length : 0"
        style="width: 100%;margin-top: 10px;padding: 0">
      <div style="display: flex;justify-content: flex-start;">
        <el-image class="imageArea"
                  style="flex: 0 0 35%"
                  :src="value.picture">
          <template #error>
            <div class="image-slot" style="text-align: center;">
              图片未上传
            </div>
          </template>
        </el-image>
        <div style="flex: 0 0 50%">
          <span style="font-size: 25px">{{ value.gname }}</span>

        </div>
        <div style="flex: 1">
          <p style="float: right;">￥{{ value.price }}</p>
          <p style="float: right;color: #bbb;font-size: 20px;">x{{ value.number }}</p>

        </div>
      </div>

    </el-card>

  </div>
  <div>
    <van-action-bar style="background-color: #fafafa">
      <div style="width: 50%;">
        <p style="font-size: 15px;float: right">&ensp;合计：￥{{this.sum}}</p>
        <div style="float: right">
          <span style="font-size: 15px;">&ensp;积分{{ user.point }}</span>
          <span style="font-size: 15px;">  可抵消{{(this.user.point/100)}}元</span>
        </div>
      </div>
      <van-action-bar-button type="danger" text="提交订单" @click="submitOrder" safe-area-inset-bottom/>
    </van-action-bar>

  </div>
</div>
</template>

<script>
import '@/assets/css/Purchase.css'
import { ActionBar, ActionBarIcon, ActionBarButton } from 'vant';

import axios from "axios";
export default {
  name: "Purchase",
  components:{
    [ActionBar.name]: ActionBar,
    [ActionBarIcon.name]: ActionBarIcon,
    [ActionBarButton.name]: ActionBarButton,
  },
  data(){
    return{
      uid: window.localStorage.getItem("uid"),
      tableData: [],
      good: this.$route.params.good,
      checkList: this.$route.params.checkList,
      number: this.$route.params.number,
      sum: 0,
      user: [],
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      if (this.good!=null){
        this.tableData[0] = JSON.parse(this.$route.params.good);
        this.tableData[0].number = this.number;
      }
      if (this.checkList!=null){
        this.tableData = JSON.parse(this.checkList)
      }
      this.tableData.forEach((item,index)=>{
        item.sum = item.price*item.number
        this.sum += item.sum
      })
      axios.get("http://39.105.220.225:8081/shop/user/userone", {
        params:{
          uid: this.uid
        }
      }).then(res => {
        console.log(res.data)
        this.user = res.data.data
        this.sum -= this.user.point/100;
      })
    },
    submitOrder(){
      var orders = [];
      for (var i=0; i<this.tableData.length; i++){
        var order = {};
        order.gid = this.tableData[i].gid;
        order.gname = this.tableData[i].gname;
        order.number = this.tableData[i].number;
        order.price = this.tableData[i].price;
        order.sum = this.tableData[i].sum;
        order.address = this.user.address;
        order.uid = this.user.uid;
        orders.push(order);
      }
      // alert(JSON.stringify(carts))
      axios.post("http://39.105.220.225:8081/shop/orders/insertOrders",orders).then(res=>{
        console.log(res.data)
        if (res.data.code=='0'){
          this.$message({
            message:'购买成功',
            type:"success"
          })
          this.$router.push({name: 'waiting'});
        }else {
          this.$message({
            message:res.data.msg,
            type:"error"
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.cellContainer{
  padding: 0px;
  height: 150px;
  /*border: 1px solid black;*/
  display: flex;
}
</style>