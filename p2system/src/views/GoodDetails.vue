<template>
  <div style="margin: 46px 40px">
    <div style="width: 100%;">
      <el-image class="imageArea"
                style=""
                :src="good.picture">
        <template #error>
          <div class="image-slot" style="text-align: center;">
            图片未上传
          </div>
        </template>
      </el-image>
    </div>
    <div style="width: 100%;">
    </div>
    <div style="width: 100%">
      <p style="margin-top: 0;color: #fe4d19">￥{{good.price}}</p>
      <p style="margin-top: 0;">{{good.gname}}</p>
      <el-descriptions border column="3" title="">
        <el-descriptions-item
            label="大小"
            label-align="center"
            align="center"
            label-class-name="my-label"
            class-name="my-content"
            width="150px">
          <span>{{ good.size }}</span>
        </el-descriptions-item>
        <el-descriptions-item
            label="能否议价"
            label-align="center"
            align="center"
            label-class-name="Item"
            width="150px">
          <span>{{ this.good.bargain==true? '能' : '否' }}</span>
        </el-descriptions-item>
        <el-descriptions-item
            label="库存"
            label-align="center"
            align="center"
            label-class-name="Item"
            width="150px">
          <span>{{ good.storage }}</span>
        </el-descriptions-item>
        <el-descriptions-item
            label="成色"
            label-align="center"
            align="center"
            label-class-name="Item"
            width="150px">
          <span>{{ good.gcondition }}</span>
        </el-descriptions-item>
        <el-descriptions-item
            label="销量"
            label-align="center"
            align="center"
            label-class-name="Item"
            width="150px">
          <span>{{ good.sale }}</span>
        </el-descriptions-item>
        <el-descriptions-item
            label="好评率"
            label-align="center"
            align="center"
            label-class-name="Item"
            width="150px">
          <span>{{ good.likeRate }}</span>
        </el-descriptions-item>
        <el-descriptions-item
            label="详情信息"
            label-align="center"
            align="center"
            label-class-name="Item"
            width="450px">
          <span>{{ good.introduction }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div style="width: 100%;margin-top: 10px">
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
      <van-stepper v-model="num" integer :min="1" :max="this.good.storage"/>
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
      uid: -1,
      num: 1,
      good: {},
      reviewData:[],
      baseURL:"http://39.105.220.225:8081/shop/files/download/",
      tableData:[]
    }
  },
  created() {
    this.searchGood();
    this.loadReview();
  },
  methods: {
    searchGood(){
      let u = window.localStorage.getItem("uid")
      if(u !== null) {
        this.uid = u
      }
      axios.get("http://39.105.220.225:8081/shop/goods/goodDetails", {
        params:{
          Gid: this.gid,
          Uid: this.uid
        }
      }).then(res => {
        console.log(res.data)
        this.good = res.data.data;
        this.good.picture = this.baseURL+this.good.picture;
        this.tableData=[{
          type: '大小',
          information: this.good.size,
        },{
          type: '能否议价',
          information: this.good.bargain==true? '能' : '否',
        },{
          type: '库存',
          information: this.good.storage,
        },{
          type: '成色',
          information: this.good.gcondition,
        },{
          type: '销量',
          information: this.good.sale,
        },{
          type: '好评率',
          information: this.good.likeRate,
        },{
          type: '详情信息',
          information: this.good.introduction,
        }]
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
