<template>
  <div>
    <van-nav-bar title="管理员登录" />
    <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="user.admid"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit" @click="Login">
        提交
      </van-button>
      <van-button round block native-type="submit" @click="toRegister">
        注册
      </van-button>
    </div>
  </van-form>
    <!-- <div class="main">
        <img class="main-bkgImg" src="../assets/bkg-1.jpg"/>
        <div class="main-2"></div>
        <div class="login-bkg"></div>
        <div id="login-area" class="login-area">
          <div class="loginContent">
            <div class="login-title">管理员登录</div>
            <el-form style="margin-top: 50px;margin-left: -80px" :model="user" :label-position="right">
              <el-form-item class="input-area">
                <span slot="label" style="color: black;width: 100px;text-align: right">I D :</span>
                <el-input  class="input-cont" v-model="user.admid" />
              </el-form-item>
              <el-form-item class="input-area">
                <span slot="label" style="color: black;width: 100px;text-align: right">密码 :</span>
                <el-input  class="input-cont" v-model="user.password" type="password" show-password/>
              </el-form-item>
            </el-form>
            <div class="opeBoard">
              <el-button type="primary" @click="Login">登录</el-button>
              <el-button  type="button" @click="toRegister">注册</el-button>
            </div>
          </div>

    </div> -->
  </div>
    
</template>

<script>
  import jwtDecode from "jwt-decode"
  import request from "@/util/request";

  export default {
        name: 'Login',
        data: function() {
        return { 
                user: {
                },
            }
        },
        methods: {
          Login(){
            request.post("/adm/login",this.user).then(res =>{
              if(res.code === '0'){
                this.$message({
                  type:"success",
                  message: "登录成功",
                });
                let decode = jwtDecode(res.token)
                console.log("decode:"+JSON.stringify(decode))
                localStorage.setItem("admid",decode.info.admid)
                this.$router.push({
                  name:'layout_m'})
              }else{
                this.$message({
                  type:"error",
                  message: res.msg,
                })
              }
            })
          },
          toRegister(){
            this.$router.push("/register")
          },
        }
    }
</script>

<style>
@import "../assets/css/Login-css.css";
.login-bkg{
  position: absolute;
  z-index: 30;
  left: 350px;
  top:40px;
  width: 800px;
  height: 500px;
  background-color: white;
  border-radius: 5px;
  border-color: white;
  opacity: 0.85;
}
.input-id .input-pwd{
  width: 150px;
  height: 25px;
  font-size: 15px;
}
.input-area{
  width: 320px;
  font-size: 30px;
}
.login-label{
  font-size: 15px;
}
.loginContent{
  width: 280px;
  margin-left: auto;
  margin-right: auto;
}
.input-cont{
  width: 210px;
  height: 25px;
  margin-left: 10px;
}
.opeBoard{
  margin-top: 30px;
  width: 150px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.login-title{
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  width: 150px;
  font-size: 30px;
  /*font-family: YouYuan;*/
  text-align: center;
}
</style>
