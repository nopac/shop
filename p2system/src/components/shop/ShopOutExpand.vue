<template>
  <el-descriptions border >
    <el-descriptions-item
        label="地址"
        label-align="center"
        align="center"
        label-class-name="Item"
        width="150px">
      <span>{{ orderForm.address }}</span>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import {toRaw} from "@vue/reactivity";

export default {
  name: "ShopOutExpand",
  props:{
    orders:Object
  },
  data() {
    return {
      orderForm:{},
    }
  },
  created() {
    this.onload()
  },
  methods:{
    onload(){
      this.orderForm=toRaw(this.orders);
      console.log(this.orderForm.bargain.length)
    },
  }
}
</script>

<style scoped>

</style>