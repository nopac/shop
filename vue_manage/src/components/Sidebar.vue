<template>
  <div>
    <el-menu
        :uniqueOpened="true"
        :default-openeds="['1']"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        style="width: 200px;min-height: calc(100vh - 50px)"
    >
      <el-sub-menu index="1" >
        <template #title>
          <el-icon><Menu /></el-icon>
          <span>审核管理</span>
        </template>
        <el-menu-item index="userExm" @click="showUserEXM">
          <el-icon><User /></el-icon>
          <template #title>用户审核</template>
        </el-menu-item>
        <el-menu-item index="merchantExm" @click="showMerchantEXM">
          <el-icon><Shop /></el-icon>
          <template #title>商家审核</template>
        </el-menu-item>
        <el-menu-item index="goodsExm" @click="showGoodsEXM">
          <el-icon><Goods /></el-icon>
          <template #title>商品审核</template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="userM" @click="showUserMNG">
        <el-icon><UserFilled /></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>
      <el-menu-item index="goodsM" @click="showGoodsMNG">
        <el-icon><GoodsFilled /></el-icon>
        <template #title>商品管理</template>
      </el-menu-item>
      <el-menu-item index="merchantM" @click="showMerchantMNG">
        <el-icon><Briefcase /></el-icon>
        <template #title>商家管理</template>
      </el-menu-item>
      <el-menu-item index="charge" @click="showChargeMNG">
        <el-icon><Tickets /></el-icon>
        <template #title>手续费管理</template>
      </el-menu-item>
      <el-menu-item index="blackList" disabled>
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
import {Setting,Menu,UserFilled,GoodsFilled,User,Goods,Shop,Briefcase,Tickets} from "@element-plus/icons-vue";
export default {
  name: "Sidebar",
  components:{
    Setting,
    Menu,
    UserFilled,
    GoodsFilled,
    User,
    Goods,
    Shop,Briefcase,Tickets
  },
  data() {
    return {
      activePage: ""
    }
  },
  methods: {
    showUserEXM(){
      this.$router.push("/exmU")
    },
    showUserMNG(){
      this.$router.push("/home")
    },
    showGoodsEXM(){
      this.$router.push("/exmG")
    },
    showGoodsMNG(){
      this.$router.push("/mngG")
    },
    showMerchantEXM(){
      this.$router.push("/exmM")
    },
    showMerchantMNG(){
      this.$router.push("/mngM")
    },
    showChargeMNG(){
      this.$router.push("/mngC")
    },
  },

}

</script>

<style scoped>

</style>