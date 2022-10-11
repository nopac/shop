<template>
<div>
  <van-tabs v-model:active="active">
    <van-tab title="全部">
      <AllOrders/>
    </van-tab>
    <van-tab title="待发货">
      <Waiting/>
    </van-tab>
    <van-tab title="待收货">
      <Receiving/>
    </van-tab>
    <van-tab title="待评价">
      <Review/>
    </van-tab>
  </van-tabs>

</div>
</template>

<script>
import { ref } from 'vue';
import { Tab, Tabs } from 'vant';
import AllOrders from "../views/AllOrders";
import Waiting from "../views/Waiting";
import Receiving from "../views/Receiving";
import Review from "../views/Review";

export default {
  name: "OrderNav",
  components:{
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    AllOrders,
    Waiting,
    Receiving,
    Review,
  },
  setup() {
    const active = ref(0);
    return { active };
  },
}
</script>

<style scoped>

</style>