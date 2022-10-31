<template>
  <div>
    <van-row><!--顶部栏-->
      <van-col span="24">
        <Header/>
      </van-col>
    </van-row>

    <!--<van-row>&lt;!&ndash;导航栏二级目录(上面)&ndash;&gt;
      <van-col span="24">
        <SidebarSecond/>
      </van-col>
    </van-row>-->

    <van-row><!--主内容-->
      <van-col span="24">
        <router-view style="flex: 1"/>
      </van-col>
    </van-row>

    <van-row><!--导航栏一级目录(下面)-->
      <van-col span="24">
        <SidebarFirst/>
      </van-col>
    </van-row>

    <!--
    ///////////////////////////////////////////////////
    -->
    <!--<van-row>
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
    </van-row>-->


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
import SidebarFirst from "@/components/SidebarFirst";
import SidebarSecond from "@/components/SidebarSecond";
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
    SidebarSecond,
    SidebarFirst,
    Header,
    Sidebar
  }
}
</script>

<style scoped>

</style>
