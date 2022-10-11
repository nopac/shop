<template>
  <div>
    <div>
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