<template>
  <div><!--导航栏二级,下部-->
    <van-row>
      <van-col span="24">
        <p>我是二级导航栏</p>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import {Setting,Menu,UserFilled,GoodsFilled,User,Goods,Shop,Briefcase,Tickets} from "@element-plus/icons-vue";
  export default {
    name: "SidebarSecond",
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