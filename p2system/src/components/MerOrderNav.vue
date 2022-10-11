<template>
  <van-tabs v-model:active="active">
    <van-tab title="全部">
      <ShopOrderMNG/>
    </van-tab>
    <van-tab title="发货">
      <OutMNG/>
    </van-tab>
    <van-tab title="退货">
      <BackEXM/>
    </van-tab>
  </van-tabs>
</template>

<script>
import { ref } from 'vue';
import { Tab, Tabs } from 'vant';
import OutMNG from "./shop/OutMNG";
import BackEXM from "./shop/BackEXM";
import ShopOrderMNG from "./shop/ShopOrderMNG";
export default {
  name: "MerOrderNav",
  components:{
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    OutMNG,
    BackEXM,
    ShopOrderMNG,
  }
}
</script>

<style scoped>

</style>