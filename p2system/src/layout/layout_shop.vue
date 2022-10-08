<template>
  <div>
    <Header/>
    <div style="display: flex">
      <SidebarShop/>
      <router-view style="flex: 1"/>
    </div>
  </div>
</template>

<script>

import Header from "@/components/HeaderShop";
import SidebarShop from "@/components/SidebarShop"
export default {
  name: "layout_shop",
  data(){
    return{
      user:[]
    }
  },
  created() {
    // this.user = this.$route.params
    // console.log("get user:"+this.$route.query.uname)
  },
  components:{
    Header,
    SidebarShop
  }
}
</script>

<style scoped>

</style>