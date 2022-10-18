
<template>
  <div >
    <div class="infoBoard">
      <!-- <div class="headBoard"> -->
        <!-- <el-avatar class="headImg" :size="100" :src="require('@/assets/'+headSrc+'.jpg')" />
        <div class="headOpt">
        </div> -->
      </div>


  <div>

    <van-cell-group inset class="UserInfo">
     <div style="display:flex">
       <van-image class="headImg"  width="75"
                  height="75" :src="require('../assets/img/head.png')"/>
<div style="margin:5px">
   <div class="card-header">
              <span> <b style="font-size:25px">我的账户信息</b></span>
            </div>
            <div >
            <span style="font-size: 20px;"><b style="color:#FF6600;">余额:</b></span>{{userForm.account}} 元
          </div>
          <div class="likeRate" >
            <span style="font-size: 20px;"><b style="color:#FF6600;">积分:</b></span>{{userForm.point}} 分
          </div>
  <VanDivider></VanDivider>
        </div>
</div> 


<div>
</div>
  <!-- 输入任意文本 -->
  <van-field v-model="userForm.uname" label="用户名" readonly />
  <!-- 密码-->
  <van-field v-model="userForm.upsw" type="number" label="密码" :disabled="diseditable" />
  <!-- 允许输入正整数，调起纯数字键盘 -->
  <van-field v-model="userForm.sex" type="text" label="性别" disable />
  <!-- 输入手机号，调起手机号键盘 -->
  <van-field v-model="userForm.phone" type="tel" label="手机号" :disabled="diseditable"  />
  <!-- 输入城市名称 -->
  <van-field v-model="userForm.city" type="text" label="城市" :disabled="diseditable" />
  <!-- 输入邮件 -->
  <van-field v-model="userForm.email" type="email" label="邮箱" :disabled="diseditable" />
  <!-- 身份证 -->
  <van-field
    v-model="userForm.identityNumber"
    required
    label="身份证号"
    placeholder="请输入身份证号:"
    :disabled="diseditable" 
  />
  <!-- 输入邮件 -->
  <van-field v-model="userForm.bank" type="email" label="银行账户" :disabled="diseditable" />
  <!-- 输入邮件 -->
  <van-field v-model="userForm.address"  type="email" label="收货地址" />
  <van-button round block type="primary" native-type="submit" @click="editInfo">
        编辑
      </van-button>
      <van-button style="margin-top:5px" round block type="success" native-type="submit" @click="saveInfo" >
        保存
      </van-button>
</van-cell-group>
</div>

      
     
      <div class="displayBoard">
        <van-popup
  v-model:show="show"
  round
  position="bottom"
  :style="{ height: '30%' }"
/>
      </div>
      <!-- <div class="displayBoard">
        <el-card class="UserDisplayBoard">
          <template #header>
            <div class="card-header">
              <span>我的账户信息</span>
              <el-button @click="invest">充值</el-button>
            </div>
          </template>
          <div class="account">
            <span>余额:</span>{{userForm.account}}
          </div>
          <div class="likeRate">
            <span>积分:</span>{{userForm.point}}
          </div>
          <div class="beMct">
            <el-button @click="clickBeMct">成为商家</el-button>
          </div>
        </el-card>
      </div>
      <div>
      </div> -->
    </div>

    <!--    充值弹窗-->
    <div>
      <el-dialog
          v-model="investVisible"
          title="充值"
          :visible.sync="investVisible"
          width="700px"
          style="margin-left: 20px"
      >
        <el-form class="userForm" :inline="true" style="text-align: center">
          <el-form-item class="formItem" label="充值金额" label-width="100px">
            <el-input-number style="width:auto" v-model="investNum" :step="1" :min="0"/>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="investVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </span>
        </template>
      </el-dialog>
    </div>
    <!--    成为商家弹窗-->


  <!-- </div> -->
</template>

<script>
import request from "@/util/request";
import {toRaw} from "@vue/reactivity";
export default {
  name: "UserInfo",
  components:{
  },
  data(){
    return {
      operate: "",
      investVisible: false,
      beMctVisible: false,
      diseditable: true,
      userForm:{},
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
    this.load();
  },
  methods:{
    load(){
      this.userForm.uname=localStorage.getItem("uname")
      console.log("getUser"+this.userForm.uname)
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
          //账户余额保留两位小数点
          let ac = this.userForm.account
          ac = parseFloat(ac).toFixed(2)
          this.userForm.account = ac
          
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
    editInfo(){
      //退出不可修改状态
      this.diseditable = false;
    },
    saveInfo(){
      //点击提交表单
      this.updateUser();
      //进入不可修改状态
      this.diseditable = true;
    },
    cancelSave(){
      this.load();
      this.diseditable = true;
    },
    updateUser(){
      request.put("http://39.105.220.225:8081/shop/user",this.userForm).then(res=>{
        // console.log(res)
        if(res.code === '0'){
          this.$message({
            type:"success",
            message: "更新成功",
          });
          this.addUserVisible = false;
        }else{
          this.$message({
            type:"error",
            message: res.msg,
          })
        }
        this.load();
      })
    },
    cancelSubmit(){
      this.investVisible = false
      this.beMctVisible = false
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
    licenseUploadSuccess(res){
      console.log(res.token)
      this.userForm.license = res.token
    },
    idUploadSuccess(res){
      console.log(res.token)
      this.userForm.identity = res.token
    },
    updateImgPath(){
      console.log("license:"+this.userForm.license)
      this.userForm.isMerchant = 2
      request.put("http://39.105.220.225:8081/shop/user",this.userForm).then(res=>{
        // console.log(res)
        if(res.code === '0'){
          this.$message({
            type:"success",
            message: "申请成功，请等待审核通过",
          });
          this.beMctVisible = false;
        }else{
          this.$message({
            type:"error",
            message: res.msg,
          })
        }
        this.load();
      })
    }
  }
}
</script>

<style scoped>
.UserInfo{
  padding: 10px;
  margin:10px
}
.headBoard{
  position: absolute;
  width: 200px;
  height: 160px;
  float: left;
  left: 250px;
}
.UInfo{
  width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.userForm{

}
.UserDisplayBoard .MerchantDisplayBoard{

}
.MerchantDisplayBoard{
  margin-top: 10px;
}
.displayBoard{
  position: absolute;
  width: 300px;
  float: left;
  left: 250px;
  top: 230px;
}
.headImg{
  width: 100px;
  height: 100px;
  margin-left: 50px;
}
.headOpt{
  margin-top: 10px;
  margin-left: 55px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button_head{
  float: right;
}
.img-icon {
    height: 20px;
  }

</style>