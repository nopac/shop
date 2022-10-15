<template>

  <div>
    <van-nav-bar
        title=""
        left-text="返回"
        left-arrow
        @click-left="returnGo"
    />

  </div>
</template>

<script>
import { NavBar } from 'vant';

export default {
  name: "ReturnHeader",
  components: {
    [NavBar.name]: NavBar,
  },
  data(){
    return{
      userName: window.localStorage.getItem("uname"),
    }
  },
  methods:{
    returnGo(){
      this.$router.go(-1);
    },
    gotoShoppingCart(){
      this.$router.push({
        name:'ShoppingCart'})
    },
    gotoHome(){
      this.$router.push("/home");
    },
    showInfo(){
      this.$router.push({
        name:'UserInfo',
        query: {
          uname:this.userName,
        }

      })
    },
    exitSystem(){
      this.hasLogin=false
      this.user=[]
      localStorage.clear();
      this.$router.push("/")
    },
  }
}

</script>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>