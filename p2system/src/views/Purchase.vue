<template>
<div style="margin: 10px">
  <div style="width: 70%;margin: 50px auto;border-radius: 20px;">

    <el-table :data="tableData"
              highlight-current-row
              style="width: 100%;background-color: #cccccc" class="tableBox">
      <el-table-column prop="gname" label="商品名称"  />
      <el-table-column prop="price" label="单价" />
      <el-table-column prop="number" label="数量" />
      <el-table-column prop="sum" label="金额" />
    </el-table>
  </div>
  <div data-halo-id="realPayPC_1" data-halo-type="realPay" style="width: 70%;margin: 0 auto;">
    <div class="realpay order-payInfo" id="realPayPC_1" style="float:right;">
      <div class="box">
        <div class="box__wrapper">
          <div class="box__shadow">
            <div>
              <span>积分{{ user.point }}</span>
              <span>可抵消{{(this.user.point/100)}}元</span>
            </div>
            <div>
              <span class="realpay--title">实付款：</span>
              <span class="realpay--price-symbol">￥</span>
              <span class="realpay--price" style="color: rgb(255, 0, 54);">{{ this.sum }}</span>
            </div>
            <div class="order-confirmAddr">
              <div class="confirmAddr-addr">
                <span class="confirmAddr-title">寄送至：</span>
                <span class="confirmAddr-addr-bd">{{ user.address }}</span>
              </div>
              <div class="confirmAddr-addr-user">
                <span class="confirmAddr-title">收货人：</span>
                <span class="confirmAddr-addr-bd">{{ user.uname }} {{ user.phone }}</span>
              </div>
            </div>
            <div class="order-confirm-eticket"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="width: 100%;height: 100px;float: right">
    <el-button type="danger"
               plain size="large"
               style="margin-right: 15%;float: right"
               @click="submitOrder"
    >确认下单</el-button>
  </div>

</div>
</template>

<script>
import '@/assets/css/Purchase.css'
import axios from "axios";
export default {
  name: "Purchase",
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
      axios.get("http://localhost:9090/user/userone", {
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
      axios.post("http://localhost:9090/orders/insertOrders",orders).then(res=>{
        console.log(res.data)
        if (res.data.code=='0'){
          this.$message({
            message:'购买成功',
            type:"success"
          })
          this.$router.push("/waiting");
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
