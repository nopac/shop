<template>
  <div>
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="user.uname"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="user.upsw"
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

  </div>


    <!-- <div class="main">
        <img class="main-bkgImg" src="../assets/bkg-4.jpg"/>
        <div class="main-2"></div>
        <div class="login-bkg"></div>
        <div id="login-area" class="login-area">
          <div class="loginContent">
            <div class="login-title">登录</div>
            <el-form :model="user" style="margin-top: 40px" label-position="left">
              <el-form-item class="input-area" >
                <span class="login-label">用户名:</span><el-input class="input-cont" v-model="user.uname"/>
              </el-form-item>
              <el-form-item class="input-area" >
                <span class="login-label">密 码 :</span><el-input class="input-cont" v-model="user.upsw" type="password" show-password/>
              </el-form-item>
            </el-form>
            <div class="opeBoard">
              <el-button type="primary" @click="Login">登录</el-button>
              <el-button  type="button" @click="toRegister">注册</el-button>
            </div>
          </div>

    </div>

</div> -->

</template>

<script>
    import request from "@/util/request";
    import jwtDecode from "jwt-decode"

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
            request.post("/user/login",this.user).then(res =>{
              if(res.code === '0'){
                this.$message({
                  type:"success",
                  message: "登录成功",
                });
                let decode = jwtDecode(res.token)
                console.log("decode:"+JSON.stringify(decode))
                localStorage.setItem("uid",decode.info.uid)
                localStorage.setItem("uname",decode.info.uname)
                this.$router.push({
                  name:'Layout',
                  // name:'layout_shop',
                })
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
