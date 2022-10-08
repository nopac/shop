<template>
  <div class="head">
    <div class="leftMenu">P2System</div>
    <div style="flex: 1"></div>
    <div class="rightMenu">
      <el-dropdown>
        <span class="el-dropdown-link" style="margin-top: 5px">
          <el-avatar> {{ user.uname }} </el-avatar>
<!--          <el-icon class="el-icon&#45;&#45;right">-->
<!--            <arrow-down/>-->
<!--          </el-icon>-->
        </span>
        <template #dropdown>
          <el-dropdown-menu v-if="hasLogin===true">
            <el-dropdown-item @click="gotoShoppingCart">我的购物车</el-dropdown-item>
            <el-dropdown-item @click="showInfo">个人信息</el-dropdown-item>
            <el-dropdown-item @click="exitSystem">退出系统</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu v-if="hasLogin===false">
            <el-dropdown-item @click="gotoLogin">去登录</el-dropdown-item>
            <el-dropdown-item @click="gotoRegister">去注册</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {ArrowDown} from "@element-plus/icons-vue";

import { toRaw } from '@vue/reactivity';
import request from "@/util/request";
export default {
  name: "Header",
  components:{
    ArrowDown
  },
  data(){
    return{
      user:[],
      hasLogin: false,
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      this.user.uname=localStorage.getItem("uname")
      if (this.user.uname == null){
        this.hasLogin=false
        console.log("未登录")
      }else{
        this.hasLogin=true
        console.log("已登录")
      }
    },
    exitSystem(){
      this.hasLogin=false
      this.user=[]
      localStorage.clear();
      this.$router.push("/")
    },
    gotoLogin(){
      this.$router.push("/login")
    },
    gotoRegister(){
      this.$router.push("/register")
    },
    showInfo(){
      this.$router.push({
        name:'UserInfo'})
    },
    gotoShoppingCart(){

      this.$router.push("/shoppingCart");
      // // this.$router.push("/shoppingCart");
      // let href = "http://localhost:8080/shoppingCart"; //网站链接
      // window.open(href, "_blank");
    }
  }
}
</script>
<style>
.head {
  height: 50px;
  line-height: 50px;
  padding-left: 30px;
  font-weight: bold;
  color: dodgerblue;
  border-bottom: 1px solid #ccc;
  display: flex;
}

.leftMenu {
  width: 200px;
  font-size: 20px;
}

.rightMenu {
  width: 100px;
  /*padding-top: 12px;*/
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}


</style>