<template>
  <div>
    <van-row>
      <van-col span="24">
        顶部栏
        <!--<Header/>-->
      </van-col>
    </van-row>
    <van-row>
      <van-col span="6">
        <Sidebar/>
      </van-col>
      <van-col span="18">
        主内容
        <router-view style="flex: 1"/>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        底部栏
      </van-col>
    </van-row>


    <!--<Header/>
    <div style="display: flex">
      <Sidebar/>
      <router-view style="flex: 1"/>
    </div>-->
  </div>
</template>

<script>

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar"
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
    Sidebar
  }
}
</script>

<style scoped>

</style>
