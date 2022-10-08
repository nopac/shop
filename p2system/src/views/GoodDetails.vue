<template>
  <div style="margin: 20px 40px">
    <div style="float: left;width: 35%;">
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
    <div style="float: right;width: 60%">
      <p style="margin-top: 0;">名称：{{good.gname}}</p>
      <p style="margin-top: 0;">价格：{{good.price}}</p>
      <p style="margin-top: 0;">大小：{{good.size}}</p>
      <p style="margin-top: 0;">是否议价：{{good.bargain}}</p>
      <p style="margin-top: 0;">详情信息：{{good.introduction}}</p>
      <p style="margin-top: 0;">库存：{{good.storage}}</p>
      <p style="margin-top: 0;">成色：{{good.gcondition}}</p>
      <p style="margin-top: 0;">销量：{{good.sale}}</p>
      <p style="margin-top: 0;">好评率：{{good.likeRate}}</p>
      <el-input-number v-model="num" :min="1" :max="this.good.storage"/>
      <div style="margin: 10px auto;">
        <el-button type="danger" plain size="large" @click="gotoPurchase">立即购买</el-button>
        <el-button type="danger" size="large" @click="addCart">
          <el-icon style="color: white"><ShoppingCart /></el-icon>&ensp;加入购物车
        </el-button>
      </div>
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
</template>

<script>
import { ref } from 'vue'
import axios from "axios";
import { ShoppingCart } from '@element-plus/icons-vue'
import moment from "moment";

export default {
  name: 'GoodDetails',
  components: {
    ShoppingCart
  },
  data(){
    return {
      gid: this.$route.query.gid,
      num: 1,
      good: {},
      reviewData:[],
      baseURL:"http://localhost:9090/files/download/",
    }
  },
  created() {
    this.searchGood();
    this.loadReview();
  },
  methods: {
    searchGood(){
      axios.get("http://localhost:9090/goods/goodDetails", {
        params:{
          Gid: this.gid
        }
      }).then(res => {
        console.log(res.data)
        this.good = res.data.data;
        this.good.picture = this.baseURL+this.good.picture;
      })
    },
    loadReview(){
      axios.get("http://localhost:9090/review", {
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
      axios.post("http://localhost:9090/cart", {
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
    }
  }

}

</script>
