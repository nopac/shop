<template>
  <div>
    <div>

      <van-tabs v-model:active="active" animated @click-tab="onClickTab">
        <van-tab title="买家">
          <OrderNav/>
        </van-tab>
        <van-tab title="卖家">
          <MerOrderNav/>
        </van-tab>
      </van-tabs>

    </div>
  </div>
</template>

<script>

import { ref } from 'vue';
import { Tab, Tabs } from 'vant';
import OrderNav from "../components/OrderNav";
import MerOrderNav from "../components/MerOrderNav";

export default {
  name: "layout_order",
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
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    OrderNav,
    MerOrderNav
  },

}
</script>

<style scoped>

</style>