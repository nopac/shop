<template>
  <div class="Register">
    <img class="main-bkgImg" src="../assets/bkg-4.jpg" />
    <div class="main-2"></div>
    <div class="register-bkg"></div>
    <div class="register-area">
      <div class="register-title">注册</div>
      <div id="message"></div>
      <el-form class="userForm" :model="userForm">
        <el-form-item class="el-form-item input-area">
          <span class="">姓&emsp;&emsp;名:&emsp;</span>
          <el-input class="input-cont" v-model="userForm.uname" @blur="judgeName"/>
        </el-form-item>
        <el-form-item class="el-form-item input-area">
          <span class="">密&emsp;&emsp;码:&emsp;</span>
          <el-input class="input-cont" type="password" v-model="userForm.upsw" show-password placeholder=""/>
        </el-form-item>
        <el-form-item class="el-form-item input-area">
          <span class="">确认密码:&emsp;</span>
          <el-input class="input-cont" type="password" v-model="userForm.confirm" placeholder="请再次输入密码以确认" show-password @blur="judgeConfirm"/>
          <span style="margin-left: 10px;" :class="confirmVisible"><el-icon :size="20"><CircleCloseFilled style="color: red" /></el-icon></span>
        </el-form-item>
        <el-form-item class="el-form-item input-area">
          <span class="">年&emsp;&emsp;龄:&emsp;</span><el-input class="input-cont" v-model="userForm.age" />
        </el-form-item>
        <el-form-item class="el-form-item input-area">
          <span class="">性&emsp;&emsp;别:&emsp;</span>
          <el-select v-model="userForm.sex" style="width: 120px">
            <el-option label="男" value="1" />
            <el-option label="女" value="0" />
            <el-option label="保密" value="-1"/>
          </el-select>
        </el-form-item>
        <el-form-item class="el-form-item input-area">
          <span class="">手机号码:&emsp;</span>
          <el-input class="input-cont" v-model="userForm.phone" />
        </el-form-item>
        <el-form-item class="el-form-item input-area">
          <span class="">邮&emsp;&emsp;箱:&emsp;</span>
          <el-input class="input-cont" v-model="userForm.email" />
        </el-form-item>
        <el-form-item class="el-form-item input-area">
          <span class="">所在城市:&emsp;</span>
          <el-input class="input-cont" v-model="userForm.city" />
        </el-form-item>
        <el-form-item class="el-form-item input-area">
          <span class="">银行账户:&emsp;</span>
          <el-input class="input-cont" v-model="userForm.account" />
        </el-form-item>
        <el-form-item class="el-form-item input-area">
          <span class="">身份证号:&emsp;</span>
          <el-input class="input-cont" v-model="userForm.phone" />
        </el-form-item>
        <el-form-item class="el-form-item codeArea">
          <span class="code_label">验证码 :&emsp;</span>
          <el-form :inline="true">
            <el-form-item style="margin-right: 10px">
              <el-input class="input-code" v-model="inputCode" />
            </el-form-item>
            <el-form-item style="margin-right: 10px">
              <ConfirmCode class="confirmImg" :changeCode.sync='identifyCode' v-on:changeCode="changeCode"></ConfirmCode>
            </el-form-item>
            <el-form-item >
              <el-button @click="confirmCode" type="text">验证</el-button>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form>
      <div class="codeArea">



      </div>
      <div class="opeBoard">
        <el-button type="primary" @click="register">注册</el-button>
        <el-button @click="backToLogin">返回登录界面</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmCode from "@/components/ConfirmCode";
import {View,CircleCloseFilled} from "@element-plus/icons-vue";
import request from "@/util/request";
export default {
  name: "Register",
  components:{
    View,
    CircleCloseFilled,
    ConfirmCode
  },
  data(){
    return{
      identifyCode:'',
      inputCode: '',
      rightCode: '',
      userForm:{
        uid:"",
        uname:"",
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
      confirmVisible: 'confirmError'
    }
  },
  computed: {

  },
  methods:{
    register(){
      //判断用户名密码非空
      if (this.userForm.uname===""||this.userForm.upsw===""){
        this.$message({
          type:"error",
          message: '用户名和密码不能为空',
        })
        return;
      }
      //二次确认密码与密码一致
      if (this.userForm.upsw !== this.userForm.confirm){
        this.$message({
          type:"error",
          message: '确认密码不一致',
        })
        return;
      }
      if(this.inputCode !== this.rightCode){
        this.$message({
          type:"error",
          message: '验证码错误',
        })
        return;
      }
      request.post("/user",this.userForm).then(res =>{
        if(res.code === '0'){
          this.$message({
            type:"success",
            message: "注册成功",
          });
          this.$router.push("/login")
        }else{
          this.$message({
            type:"error",
            message: res.msg,
          })
        }
      })
      //判断邮箱格式
      //图片的上传与显示
    },
    backToLogin(){
      this.$router.push("/login")
    },
    judgeConfirm(){
      if (this.userForm.upsw !== this.userForm.confirm){
        this.confirmVisible='confirmError'
      }else{
        this.confirmVisible='confirmRight'
      }
    },
    judgeName(){
      request.get("/user/judgeName/"+this.userForm.uname).then(res=>{
        if(res.code !== '0'){
          this.$message({
            type: "error",
            message: res.msg,
          })
        }else {
        }
      })
    },
    confirmCode(){
      if(this.inputCode !== this.rightCode){
        this.$message({
          type:"error",
          message: '验证码错误',
        })
        return;
      }else{
        this.$message({
          type:"success",
          message: '验证码正确',
        })
      }
    },
    changeCode(val){
      this.rightCode = val;
      console.log("rightCode="+val)
    }
  }
}
</script>

<style scoped>
@import "../assets/css/Register-css.css";
.input-cont{
  width: 350px;
  height: 25px;
}
.userForm{
  width: 500px;
  height: 500px;
  margin-left: 150px;
  margin-top: 50px;
}

.input-area{
  width: 500px;
  height: 25px;
  font-size: 20px;
  left: 140px;
}
.codeArea{
  width: 500px;
  height: 25px;
  font-size: 20px;
  left: 140px;
  margin-top: 40px;
}
.confirmImg{
  float: right;
  /*margin-right: 40px;*/
}
.opeBoard{
  width: 500px;
  margin-left: 150px;
  text-align: center;
  margin-top: 20px;
}
.license_label{
  margin-top: -40px;
}
.code_label{
  margin-top: 0px;
}
.input-code{
  width: 100px;
}
.confirmError{
  visibility: hidden;
}
.confirmRight{
  visibility: hidden;
}
</style>