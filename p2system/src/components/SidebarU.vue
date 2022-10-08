<template>
  <div>
    <el-menu
        :default-openeds="['infoMNG','ordersMng']"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        style="width: 200px;min-height: calc(100vh - 50px)"
    >
      <el-menu-item @click="backToHome">
        <template #title>
          <el-icon><Back /></el-icon>
          <span>返回商城</span>
        </template>
      </el-menu-item>
      <el-sub-menu index="infoMNG" >
        <template #title>
          <el-icon><UserFilled /></el-icon>
          <span>我的信息</span>
        </template>
        <el-menu-item index="myInfo"  @click="showUserInfo">
          <el-icon><User /></el-icon>
          <template #title>个人信息</template>
        </el-menu-item>
        <el-menu-item index="amountRecord" @click="showAmtRecord">
          <el-icon><Tickets /></el-icon>
          <template #title>收支记录</template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="cart" @click="gotoShoppingCart">
        <el-icon><ShoppingCart /></el-icon>
        <template #title>我的购物车</template>
      </el-menu-item>
      <el-sub-menu index="ordersMng" >
        <template #title>
          <el-icon><Menu /></el-icon>
          <span>我的订单</span>
        </template>
        <el-menu-item index="shipping" @click="gotoWaiting">
          <el-icon><Box /></el-icon>
          <template #title>待发货</template>
        </el-menu-item>
        <el-menu-item index="delivering" @click="gotoReceiving">
          <el-icon><Location /></el-icon>
          <template #title>待收货</template>
        </el-menu-item>
<!--        <el-menu-item index="backing" @click="">-->
<!--          <el-icon><Failed /></el-icon>-->
<!--          <template #title>退货中</template>-->
<!--        </el-menu-item>-->
        <el-menu-item index="reviewing" @click="gotoReview">
          <el-icon><Comment /></el-icon>
          <template #title>待评价</template>
        </el-menu-item>
        <el-menu-item index="allorders" @click="gotoAllOrders">
          <el-icon><Comment /></el-icon>
          <template #title>全部订单</template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="myShop" @click="showGoodsHome" :disabled="!isMerchant">
        <template #title>
          <el-icon><Shop /></el-icon>
          <span>我的店铺</span>
        </template>
      </el-menu-item>
      <el-menu-item index="blackList">
        <i class="el-icon-document"></i>
        <template #title>黑名单管理</template>
      </el-menu-item>
<!--      <el-menu-item index="4">-->
<!--        <i class="el-icon-setting"></i>-->
<!--        <template #title>黑名单</template>-->
<!--      </el-menu-item>-->
<!--      <el-sub-menu index="5">-->
<!--        <template #title>-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>导航一</span>-->
<!--        </template>-->
<!--      </el-sub-menu>-->
    </el-menu>

  </div>
</template>

<script>
import {Setting,Menu,UserFilled,Goods,User,Comment,ShoppingCart} from "@element-plus/icons-vue";
import {Box,Location,Failed,Shop,Tickets} from "@element-plus/icons-vue";
import request from "@/util/request";
export default {
  name: "Sidebar",
  components:{
    Setting,
    Menu,
    UserFilled,
    Goods,
    User,
    Comment,
    ShoppingCart,
    Box,Location,Failed,Shop,Tickets
  },
  data() {
    return {
      activePage: "",
      userForm:[],
      isMerchant: true,
    }
  },
  created() {
    this.load()
  },
  methods: {
    load(){
      this.userForm.uname=localStorage.getItem("uname")
      console.log("getUser"+this.userForm.uname)
      request.get("/user/getInfo/"+this.userForm.uname).then(res=>{
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
        }
      })
    },
    showGoodsHome(){
      this.$router.push("/mngG")
    },
    showAmtRecord(){
      this.$router.push({
        name:'AmountRecordMNG',
      })
    },
    showUserInfo(){
      this.$router.push({
        name:'UserInfo',
      })
      // this.$router.push("/infoU")
    },
    gotoShoppingCart(){
      this.$router.push("/shoppingCart");
    },
    gotoWaiting(){
      this.$router.push({
        name:'Waiting',
      });
    },
    gotoReceiving(){
      this.$router.push({
        name:'Receiving',
      });
    },
    gotoAllOrders(){
      this.$router.push({
        name:'AllOrders',
      });
    },
    gotoReview(){
      this.$router.push({
        name:'Review',
      });
    },
    backToHome(){
      this.$router.push({
        name:'Home',
      })
    }
  },


}

</script>

<style scoped>

</style>