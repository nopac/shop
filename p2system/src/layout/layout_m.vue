<template>
  <div>
    <Header/>
    <div style="display: flex">
      <SidebarU/>
      <router-view style="flex: 1"/>
    </div>
  </div>
</template>

<script>

import Header from "@/components/Header";
import SidebarU from "@/components/SidebarU"
export default {
  name: "layout_m",
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
    SidebarU
  }
}
</script>

<style scoped>

</style>