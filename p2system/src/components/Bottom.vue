<template>
  <div>
    <van-tabbar v-model="active" safe-area-inset-bottom border>
      <van-tabbar-item icon="home-o" @click="showHome">首页</van-tabbar-item>
      <van-tabbar-item icon="cart-o" @click="showCart">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" @click="showOrders">订单</van-tabbar-item>
      <van-tabbar-item icon="friends-o" @click="showMy">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
import { ref } from 'vue';
import {Tabbar,TabbarItem,ConfigProvider } from 'vant';
export default {
  name: "Bottom",
  components:{
    [Tabbar.name]:Tabbar,
    [TabbarItem.name]:TabbarItem,
    [ConfigProvider.name]:ConfigProvider,
  },
  setup() {
    const active = ref(0);
    return { active };
  },
  methods:{
    showHome(){
      this.$router.push({
        name:'Home',
      })
    },
    showCart(){
      this.$router.push({
        name:'ShoppingCart',
      })
    },
    showMy(){
      this.$router.push({
      })
    },
    showOrders(){
      this.$router.push({
        name: 'layout_m'
      })
    },

  }
}
</script>

<style scoped>

</style>