<template>
<div class="UserPage" >
  <div class="HeadContainer">
    <van-image class="headImg" :src="require('../assets/img/head.png')"/>
    <div  v-if="hasLogin===false">
      <span class="headName" @click="toLogin" style="text-decoration: underline;">{{defaultName}}</span></div>

    <span class="headName" v-if="hasLogin===true">{{userForm.uname}}</span>
  </div>
  <div class="contentContainer">
    <div class="cellContainer" disabled="hasLogin">
      <van-cell center  icon="home-o" class="cell" is-link
                @click="showMyInfo">我的信息</van-cell>
    </div>
    <div class="cellContainer">
      <van-cell center icon="balance-o" class="cell" title="我的余额"
                @click="showInvest">
        <template #title>
          <span class="accountNum">我的余额：
            <span style="color: #FF6600"><b>{{userForm.account}} 元</b></span></span>
        </template>
        <van-button type="default" @click="showInvest">充值</van-button>
      </van-cell>
    </div>
    <div class="cellContainer">
      <van-cell center icon="balance-list-o" class="cell" is-link
                @click="showRecords">收支记录
      </van-cell>
    </div>
    <div class="cellContainer" v-if="isMerchant===true">
      <van-cell center disabled="{{isMerchant}}"
                icon="send-gift-o" class="cell" is-link
                @click="showGoods" >商品管理
      </van-cell>
    </div>
    <div class="cellContainer" v-if="isMerchant===false">
      <van-cell center class="cell"
                @click="showBeMerchant">成为商家
      </van-cell>
    </div>
    <div class="cellContainer" v-if="hasLogin===true">
      <van-cell center class="cell"
                @click="outLogin">退出登录
      </van-cell>
    </div>
    <van-popup v-model:show="investVisible"
               closeable >
      <span style="margin: 5px; font-size: 15px "><b>充值页面</b></span>
      <div class="popupBottom" style="margin: 10px">
        <van-field v-model="investNum" type="number" placeholder="请输入充值金额" label="输入充值金额"/>
        <div>
        <van-button type="success"  @click="submit" style="margin: 10px;">充值</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</div>
</template>

<script>
import {Cell,Image,Icon,Button,Popup,Field,NumberKeyboard} from 'vant'
import request from "@/util/request";
export default {
  name: "UserPage",
  components:{
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Button.name] : Button,
    [Popup.name] : Popup,
    [Field.name] : Field,
    [NumberKeyboard.name] : NumberKeyboard,
  },
  data(){
    return{
      userForm:{      },
      hasLogin: true,
      defaultName:'请先登录',
      isMerchant: false,
      investVisible: false,
      beMctVisible: false,
      diseditable: true,
      showKeybord: false,
      recordForm:{},
      baseURL:"http://39.105.220.225:8081/shop/files/upload/",
      imageUrl:"",
      licenseUrl: "",
      idUrl: "",
      investNum: 0,
      headSrc: 'default_head',
      labelPosition: 'right',
      labelWith: '70px',
      //存放上传文件
      fileList: [],
      idfileList:[],
    }
  },
  created() {
    this.userForm.uname = window.localStorage.getItem("uname")
    console.log("getUser"+this.userForm.uname)
    if (this.userForm.uname == null){
      this.hasLogin=false
      console.log("未登录")
    }else{
      this.hasLogin=true
      console.log("已登录")
      this.load();
    }
  },
  methods: {
    load(){
      request.get("http://39.105.220.225:8081/shop/user/getInfo/"+this.userForm.uname).then(res=>{
        if(res.code !== '0'){
          this.$message({
            type: "error",
            message: res.msg,
          })
        }else {
          console.log(res)
          this.userForm = res.data
          this.userForm.sex = String(this.userForm.sex)
          if (this.userForm.isMerchant === 1){
            this.isMerchant = true
          }else{
            this.isMerchant = false
          }
          if (this.userForm.license!==null)
            this.licenseUrl = this.baseURL+this.userForm.license
          else
            this.licenseUrl = this.baseURL
          if (this.userForm.identity!==null)
            this.idUrl = this.baseURL+this.userForm.identity
          else {
            this.idUrl = this.baseURL
            console.log("idURL"+this.idUrl)
          }
        }
      })
    },
    invest(){
      this.investVisible=true;
    },
    submit(){
      this.recordForm.type=0
      this.recordForm.amount = this.investNum
      this.recordForm.uid = this.userForm.uid
      this.recordForm.account = this.userForm.account
      request.post("http://39.105.220.225:8081/shop/account",this.recordForm).then(res=>{
        if(res.code !== '0'){
          this.$message({
            type: "error",
            message: res.msg,
          })
        }else {
          console.log(res)
          this.investVisible=false;
          this.load()
        }
      })

    },
    toLogin(){
      this.$router.push("/login")
    },
    clickBeMct(){
      request.get("http://39.105.220.225:8081/shop/merchant/isMerchant/"+this.userForm.uid).then(res=>{
        console.log("code="+res.code)
        if(res.code === '0'){
          this.$message({
            type: "error",
            message: "此用户已经是商家了"
          })
        }else {
          this.load()
          this.beMctVisible = true
          console.log()
        }
      })

    },
    showMyInfo(){
      this.$router.push("/infoU")
    },
    showInvest(){
      this.investVisible = true
    },showRecords(){
      this.$router.push("/record")
    },showGoods(){
      this.$router.push("/mngG")

    },showBeMerchant(){
      this.beMctVisible = true
    },outLogin(){
      this.hasLogin=false
      this.user=[]
      localStorage.clear();
      this.$router.push("/userPage")
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
.popupBottom{
  width: 8rem;
  height: 2rem;
  display: flex;
  margin-top: 1.2rem;
}
</style>