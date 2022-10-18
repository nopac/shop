<template>
  <div style="margin: 20px 40px;position:relative;bottom: 50px">
    <div style="width: 100%;">
      <el-image class="imageArea"
                style=""
                :src="good.picture">
        <template #error>
          <div class="image-slot">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
    </div>
    <div style="width: 100%">
      <p style="margin-top: 0;color: #fe4d19">￥{{good.price}}</p>
      <p style="margin-top: 0;">{{good.gname}}</p>
      <p style="margin-top: 0;">大小：{{good.size}}</p>
      <p style="margin-top: 0;">是否议价：{{good.bargain}}</p>
      <p style="margin-top: 0;">详情信息：{{good.introduction}}</p>
      <p style="margin-top: 0;">库存：{{good.storage}}</p>
      <p style="margin-top: 0;">成色：{{good.gcondition}}</p>
      <p style="margin-top: 0;">销量：{{good.sale}}</p>
      <p style="margin-top: 0;">好评率：{{good.likeRate}}</p>
      购买数量：<van-stepper v-model="num" integer :min="1" :max="this.good.storage"/>

    </div>
    <div style="width: 100%">
      <el-table
          :data="reviewData"
          style="width: 100%">
        <el-table-column
            label="评价"
            width="600px">
          <template #default="scope">
            <p>{{scope.row.uid}}</p>
            <p>{{scope.row.remark}}</p>
            <p>{{scope.row.time}}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <div>
    <van-action-bar safe-area-inset-bottom style="background-color: #fff">
      <van-action-bar-icon icon="cart-o" text="购物车" @click="showCart"/>
      <van-action-bar-button type="warning" text="加入购物车" @click="addCart"/>
      <van-action-bar-button type="danger" text="立即购买" @click="gotoPurchase"/>
    </van-action-bar>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from "axios";
import { ShoppingCart } from '@element-plus/icons-vue'
import moment from "moment";
import { ActionBar, ActionBarIcon, ActionBarButton } from 'vant';
import { Stepper } from 'vant';

export default {
  name: 'GoodDetails',
  components: {
    ShoppingCart,
    [ActionBar.name]: ActionBar,
    [ActionBarIcon.name]: ActionBarIcon,
    [ActionBarButton.name]: ActionBarButton,
    [Stepper.name]: Stepper,
  },
  data(){
    return {
      gid: this.$route.query.gid,
      num: 1,
      good: {},
      reviewData:[],
      baseURL:"http://39.105.220.225:8081/shop/files/download/",
    }
  },
  created() {
    this.searchGood();
    this.loadReview();
  },
  methods: {
    searchGood(){
      axios.get("http://39.105.220.225:8081/shop/goods/goodDetails", {
        params:{
          Gid: this.gid,
          Uid: window.localStorage.getItem("uid")
        }
      }).then(res => {
        console.log(res.data)
        this.good = res.data.data;
        this.good.picture = this.baseURL+this.good.picture;
      })
    },
    loadReview(){
      axios.get("http://39.105.220.225:8081/shop/review", {
        params:{
          gid: this.gid
        }
      }).then(res => {
        console.log(res.data)
        this.reviewData = res.data.data;
        this.reviewData.forEach((item,index)=>{
          item.time = this.time(item.time);
        })
      })
    },
    time(date){
      return moment(date).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
    },
    addCart() {
      axios.post("http://39.105.220.225:8081/shop/cart", {
        uid: window.localStorage.getItem("uid"),//用户名！！！
        gid: this.gid,
        number: this.num,
        price: this.good.price,
        gname: this.good.gname,
      }).then(res => {
        console.log(res)
        if(res.data.code=='0'){
          this.$message({
            message:'成功加入购物车',
            type:"success"
          })
        }else {
          this.$message({
            message: res.data.msg,
            type:"error"
          });
        }

      })
    },
    gotoPurchase(){
      this.$router.push({name: "Purchase", params: {good: JSON.stringify(this.good),number: this.num}});
    },
    showCart(){
      this.$router.push({
        name:'ShoppingCart',
      })
    },
  }

}

</script>
