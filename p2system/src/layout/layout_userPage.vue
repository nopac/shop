<template>
  <div>
    <van-nav-bar
        title=""
        left-text="返回"
        left-arrow
        @click-left="goBack()"
    />
    <router-view style="flex: 1"/>
  </div>
</template>

<script>
import {NavBar} from 'vant'
export default {
  name: "layout_userPage",
  components:{
    [NavBar.name]: NavBar
  },
  data(){
  },
  methods:{
    goBack(){
      this.$router.push("/userPage")
    }

  }
}
</script>

<style scoped>

</style>