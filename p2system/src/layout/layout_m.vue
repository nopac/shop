<template>
  <div>
    <div>
      <van-button type="primary">切换</van-button>
    </div>
    <div>
      <OrderNav/>
<!--      <router-view style="flex: 1"/>-->
    </div>
  </div>
</template>

<script>

import OrderNav from "@/components/OrderNav";
import { Button } from 'vant';
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
    [Button.name]: Button,
    OrderNav,
  }
}
</script>

<style scoped>

</style>