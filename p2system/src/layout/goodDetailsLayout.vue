<template>
  <div>
    <ReturnHeader/>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import ReturnHeader from "@/components/ReturnHeader";
export default {
  name: "goodDetailsLayout",
  components:{
    ReturnHeader
  }
}
</script>

<style scoped>

</style>