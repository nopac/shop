<template>
<div class="UserPage" >
  <div class="HeadContainer">
    <van-image class="headImg" :src="require('../assets/img/head.png')"/>
    <div style="font-size: 45px">
    </div>
    <span class="headName" @click="toLogin" style="text-decoration: underline;" v-if="hasLogin===false" >{{defaultName}}</span>
    <span class="headName" v-if="hasLogin===true">{{userForm.uname}}</span>
  </div>
  <div class="contentContainer">
    <div class="cellContainer" :disabled="hasLogin === false">
      <van-cell center  icon="home-o" class="cell" is-link :clickable="hasLogin"
                @click="showMyInfo">我的信息</van-cell>
    </div>
    <div class="cellContainer">
      <van-cell center icon="balance-o" class="cell" title="我的余额"  :clickable="hasLogin"
                @click="showInvest">
        <template #title>
          <span class="accountNum">我的余额：
            <span style="color: #FF6600" v-if="hasLogin === true">{{userForm.account}}元</span>
          </span>
        </template>
        <van-button type="default" @click="showInvest">充值</van-button>
      </van-cell>
    </div>
    <div class="cellContainer">
      <van-cell center icon="balance-list-o" class="cell" is-link  :clickable="hasLogin" :disabled="!hasLogin"
                @click="showRecords">收支记录
      </van-cell>
    </div>
    <div class="cellContainer" v-if="isMerchant===true && hasLogin === true">
      <van-cell center disabled="{{isMerchant}}"
                icon="send-gift-o" class="cell" is-link
                @click="showGoods" >商品管理
      </van-cell>
    </div>
    <div class="cellContainer"
         v-if="isMerchant===false&&hasLogin === true">
      <van-cell center class="cell"
                @click="clickBeMct">成为商家
      </van-cell>
    </div>
    <div class="cellContainer" v-if="hasLogin===true">
      <van-cell center class="cell"
                @click="outLogin">退出登录
      </van-cell>
    </div>
    <van-popup v-model:show="investVisible"
               closeable class="investPopUp">
      <span class="invest-Title">充值</span>
      <div class="popupBottom">
        <van-field class="inputInvest" v-model="investNum" type="number" placeholder="请输入充值金额" >

        </van-field>
        <van-button type="primary" @click="submit" style="margin-right: 1rem">充值</van-button>
      </div>
    </van-popup>

    <div class="popupBoard">
      <van-popup v-model:show="beMctVisible"
         closeable style="width: 9rem;"
         class="dialogBoard">
        <van-form @submit="updateImgPath">
          <van-cell-group inset style="margin-top: 0.2rem;" title="申请成为商家">
            <van-field name="uploader" label="上传营业执照">
              <template #input>
                <el-upload
                    :action=licenseUrl
                    :on-success="licenseUploadSuccess"
                    :limit="1"
                >
                  <van-button type="primary" plain>
                      点击上传营业执照
                  </van-button>
                </el-upload>
              </template>
            </van-field>
            <van-field name="uploader" label="上传身份证">
              <template #input>
                <el-upload
                    :action=idUrl
                    :on-success="idUploadSuccess"
                    :limit="1"
                >
                  <van-button type="primary" plain>
                    点击上传身份证照片
                  </van-button>
                </el-upload>
              </template>
            </van-field>
          </van-cell-group>

          <div class="opeBoard">
            <van-button
                round block type="success"
                class="opeButton"
                style="width: 3rem"
                native-type="submit">提交
            </van-button>
          </div>
        </van-form>
      </van-popup>
    </div>

  </div>
</div>
</template>

<script>
import {Cell, Image, Icon, Button, Popup, Field, NumberKeyboard, Uploader, Toast} from 'vant'
import request from "@/util/request";
import axios from "axios";
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
    [Uploader.name] : Uploader,
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
      investNum: null,
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
          Toast.fail(res.msg)
        }else {
          console.log(res)
          this.userForm = res.data
          this.userForm.sex = String(this.userForm.sex)
          //账户余额保留两位小数点
          let ac = this.userForm.account
          ac = parseFloat(ac).toFixed(2)
          this.userForm.account = ac
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
    updateImgPath(){
      console.log("license:"+this.userForm.license)
      this.userForm.isMerchant = 2
      axios.put("http://39.105.220.225:8081/shop/user",this.userForm).then(res=>{
        console.log(res.data);
        if(res.data.code === '0'){
          Toast.success("申请成功，请等待审核通过")
          this.beMctVisible = false;
        }else{
          Toast.fail(res.msg)
        }
        this.load();
      })
    },
    submit(){
      this.recordForm.type=0
      this.recordForm.amount = this.investNum
      this.recordForm.uid = this.userForm.uid
      this.recordForm.account = this.userForm.account
      request.post("http://39.105.220.225:8081/shop/account",this.recordForm).then(res=>{
        if(res.code !== '0'){
          Toast(res.msg)
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
          Toast.fail("此用户已经是商家了")
        }else {
          this.load()
          this.beMctVisible = true
          console.log()
        }
      })

    },
    showMyInfo(){
      if (this.hasLogin)
        this.$router.push("/infoU")
    },
    showInvest(){
      if (this.hasLogin)
        this.investVisible = true
    },
    showRecords(){
      if (this.hasLogin)
        this.$router.push("/record")
    },
    showGoods(){
      if (this.hasLogin)
      this.$router.push("/mngG")

    },
    showBeMerchant(){
      if (this.hasLogin)
        this.beMctVisible = true
    },
    outLogin(){
      this.hasLogin=false
      this.userForm=[]
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
.investPopUp{
  width: 8rem;
  height: 2rem;
  display: flex;

}
.invest-Title{
  width: 2rem;
  padding-left: 15px;
}
.inputInvest{
  width: 50%;
  font-size: 0.4rem;
  margin-left: auto;
  margin-right: auto;
}
.searchBoard {
  margin: 10px 0;
}
.dialogBoard{
  width: 9rem;
}
.opeBoard{

}
.opeButton{
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0.2rem;
}
.popupBoard{
  width: 9rem;
}
</style>