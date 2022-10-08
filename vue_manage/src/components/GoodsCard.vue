<template>
  <div class="GoodsCard">
    <el-card :body-style="{ padding: '0px' }" style="width: 250px; margin: 0 10px">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"/>
      <div style="padding: 14px">
        <span>{{ goodsForm.gname }}</span>

        <span style="float: right;font-size: 20px">￥{{ goodsForm.price }}</span>

        <div class="bottom">
          <span style="color: gray;font-size: 10px">好评率：{{ goodsForm.likeRate }}</span>
          <el-button text class="button" style="color: red;">加入购物车</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "GoodsCard",
  props:{
    form: Object
  },
  components:{

  },
  data(){
    return{
      goodsForm:[]
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      this.goodsForm=JSON.parse(JSON.stringify(this.form))
      console.log(this.goodsForm)
    }
  }
}
</script>

<style scoped>

</style>