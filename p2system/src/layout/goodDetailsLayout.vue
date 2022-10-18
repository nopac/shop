<template style="height: 100%">
  <div style="height: 100%">
    <ReturnHeader/>
    <div style="height: 100%;background-color: #f9f9f9;">
      <router-view/>
    </div>
  </div>
</template>

<script>
import ReturnHeader from "@/components/ReturnHeader";

export default {
  name: "goodDetailsLayout",
  components:{
    ReturnHeader,
  }
}
</script>

<style scoped>

</style>