<template>
  <div class="layout" style="bottom: 50px;padding-top: 50px; position: relative; height: 80%">
    <div class="content" >
      <router-view/>
    </div>
    <Bottom/>
  </div>
</template>

<script>
import '@/assets/css/Home.css'
import Bottom from "@/components/Bottom";

export default {
  name: "Layout",
  components:{
    Bottom,
  }
}
</script>

<style scoped>

</style>