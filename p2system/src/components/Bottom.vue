<template>
  <div>
    <van-tabbar v-model="active" safe-area-inset-bottom>
      <van-tabbar-item name="shop" icon="shop-o" @click="showHome">商城</van-tabbar-item>
      <van-tabbar-item name="cart" icon="cart-o" @click="showCart">购物车</van-tabbar-item>
      <van-tabbar-item name="order" icon="orders-o" @click="showOrders">订单</van-tabbar-item>
      <van-tabbar-item name="my" icon="friends-o" @click="showMy">我的</van-tabbar-item>
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
    const active = ref('shop');
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
        name: 'UserPage'
      })
    },
    showOrders(){
      this.$router.push({
        name: 'layout_order'
      })
    },

  }
}
</script>

<style scoped>

</style>