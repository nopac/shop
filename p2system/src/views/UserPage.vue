<template>
<div class="UserPage" >
  <div class="HeadContainer">
    <van-image class="headImg" :src="require('../assets/img/head.png')" @click="toLogin"/>
    <span class="headName">{{userForm.uname}}</span>
  </div>
  <div class="contentContainer">
    <div class="cellContainer">
      <van-cell center  icon="home-o" class="cell" is-link
                @click="showMyInfo">我的信息</van-cell>
    </div>
    <div class="cellContainer">
      <van-cell center icon="balance-o" class="cell" title="我的余额"
                @click="showMyInfo">
        <van-button type="default" @click="">充值</van-button>
      </van-cell>
    </div>
    <div class="cellContainer">
      <van-cell center icon="balance-list-o" class="cell" is-link
                @click="showMyInfo">收支记录
      </van-cell>
    </div>
    <div class="cellContainer" >
      <van-cell center disabled="{{isMerchant}}"
                icon="send-gift-o" class="cell" is-link
                @click="showMyInfo" >商品管理
      </van-cell>
    </div>
    <div class="cellContainer">
      <van-cell center class="cell"
                @click="showMyInfo">成为商家
      </van-cell>
    </div>
  </div>
</div>
</template>

<script>
import {Cell,Image,Icon,Button} from 'vant'
export default {
  name: "UserPage",
  components:{
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Button.name] : Button,
  },
  methods: {
    created() {
      this.userForm.uname = window.localStorage.getItem("uname")
    },
    toLogin(){
      this.$router.push("/login")
    },
  },
  data(){
    return{
      userForm:{
        uid:"",
        uname:"请先登录",
        upsw:"",
        phone:"",
        email:"",
        city:"",
        sex:"",
        bank:"",
        account:"",
        point:"",
        status:"",
        license:"",
        identity:"",
        grade:"",
        turnover:"",
        likeRate:"",
        MLikeRate:"",
      },
      defaultName:'请先登录',
      isMerchant: false,
    }
  },
}
</script>

<style scoped>
.UserPage{
  height: 100%;
  background-color: #f9f9f9;
}
.contentContainer{
    margin-top: 20px;
}
.HeadContainer{
  height: 200px;
  display: flex;
  padding: 20px;
}
.headImg{
  /*margin-left: 20px;*/
  width: 150px;
  height: 150px;
  margin-left: 50px;
  display: block;
}
.headName{
  height: 150px;
  display: block;
  margin-left: 30px;
  line-height: 150px;
}
.cellContainer{
  padding: 10px;
  height: 150px;
  /*border: 1px solid black;*/
  display: flex;
}
.cell{
  /*height: 150px;*/
  /*width: 60%;*/
  /*margin-right: 10px;*/
  /*margin-left: auto;*/
  /*background-color: #ececec;*/
  /*font-size: 50px;*/
  /*line-height: 90px;*/
}
</style>