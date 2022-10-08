<template>
  <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex;">

    <div style="width: 200px; padding-left: 30px; font-weight: bold; color: dodgerblue;cursor: pointer" @click="returnGo">

      <el-icon style="position: relative;top: 3px" size="large"><ArrowLeftBold /></el-icon>
      <span>返回</span>
    </div>

    <div style="flex: 1"></div>
    <div style="width: 100px">
      <el-dropdown style="line-height: 50px;">
        <span class="el-dropdown-link">
          <span >{{ userName }}</span>
          <el-icon class="el-icon--right">
            <ArrowDown/>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="gotoShoppingCart">我的购物车</el-dropdown-item>
            <el-dropdown-item @click="showInfo">个人信息</el-dropdown-item>
            <el-dropdown-item @click="gotoHome">首页</el-dropdown-item>
            <el-dropdown-item @click="exitSystem">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { ArrowDown } from '@element-plus/icons-vue'

export default {
  name: "ReturnHeader",
  components: {
    ArrowLeftBold,
    ArrowDown
  },
  data(){
    return{
      userName: window.localStorage.getItem("uname"),
    }
  },
  methods:{
    returnGo(){
      this.$router.go(-1);
    },
    gotoShoppingCart(){
      this.$router.push({
        name:'ShoppingCart'})
    },
    gotoHome(){
      this.$router.push("/home");
    },
    showInfo(){
      this.$router.push({
        name:'UserInfo',
        query: {
          uname:this.userName,
        }

      })
    },
    exitSystem(){
      this.hasLogin=false
      this.user=[]
      localStorage.clear();
      this.$router.push("/")
    },
  }
}

</script>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>