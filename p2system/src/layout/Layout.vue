<template>
  <div>
    <Header/>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import '@/assets/css/Home.css'

export default {
  name: "Layout",
  components:{
    Header,
  }
}
</script>

<style scoped>

</style>