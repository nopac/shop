<template>
  <div>
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        class="el-menu-vertical-demo"
        :default-openeds="defaultOpens"
        :default-active="$route.path"
        @open="handleOpen"
        @close="handleClose"
        style="width: 200px;min-height: calc(100vh - 50px)"
    >
      <el-menu-item @click="backToUser">
        <template #title>
          <el-icon><Back /></el-icon>
          <span>返回</span>
        </template>
      </el-menu-item>
      <el-sub-menu index="myShop">
        <template #title>
          <el-icon><Shop /></el-icon>
          <span>我的店铺</span>
        </template>
        <el-menu-item index="out" @click="showOut">
          <el-icon><Box /></el-icon>
          <template #title>发货管理</template>
        </el-menu-item>
        <el-menu-item index="back" @click="showBack">
          <el-icon><Failed /></el-icon>
          <template #title>退货审核</template>
        </el-menu-item>
        <el-menu-item index="orders" @click="showOrder">
          <el-icon><Tickets /></el-icon>
          <template #title>订单管理</template>
        </el-menu-item>
        <el-menu-item index="goodsM" @click="showGoodsMNG">
          <el-icon><Goods /></el-icon>
          <template #title>商品管理</template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="blackList" disabled>
        <el-icon><Avatar /></el-icon>
        <template #title>黑名单管理</template>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script>
import {Box,Location,Failed,Shop,Tickets,Goods,Back,Avatar} from "@element-plus/icons-vue";
export default {
  name: "Sidebar",
  components:{
    Box,Location,Failed,Shop,Tickets,Goods,Back,Avatar,
  },
  data() {
    return {
      activePage: "",
      user:[],
      defaultOpens:['myShop']
    }
  },
  created() {
    this.load()
  },
  methods: {
    load(){
      this.user.uname=localStorage.getItem("uname");
    },
    handleClose(key,keyPath){
      this.$refs.menus.open(keyPath)
    },
    showOut(){
      this.$router.push({
        name:'OutMNG',
      })
    },
    showBack(){
      this.$router.push({
        name:'BackEXM',
        query: {
          uname:this.user.uname,
        }
      })
    },
    showOrder(){
      this.$router.push({
        name:'ShopOrderMNG',
      })
    },
    showGoodsMNG(){
      this.$router.push({
        name:'GoodsMNG',
      })
    },
    backToUser(){
      this.$router.push({
        name:'layout_m',
      })
    },
    // showGoodsHome(){
    //   this.$router.push("/home")
    // },
  },

}

</script>

<style scoped>

</style>