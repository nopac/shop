<template>
  <div class="GoodsExpend">
    <el-row>
      <el-col :span="4" :push="1">
        <div class="goodImg">
          <el-image class="imageArea"
                    style=""
                    :src="this.showPictureUrl">
            <template #error>
              <div class="image-slot">
                <el-icon><Picture /></el-icon>
              </div>
            </template>
          </el-image>
        </div>
      </el-col>
      <el-col :span="15" >
        <div  class="goodInfo">
          <el-descriptions border column="2">
            <el-descriptions-item
                label="类别"
                label-align="center"
                align="center"
                label-class-name="Item"
                width="150px">
              <span>{{ goodsForm.storage }}</span>
            </el-descriptions-item>
            <el-descriptions-item
                label="好评率"
                label-align="center"
                align="center"
                label-class-name="Item"
                width="150px">
              <span>{{ goodsForm.likeRate }}</span>
            </el-descriptions-item>
            <el-descriptions-item
                label="尺寸"
                label-align="center"
                align="center"
                label-class-name="Item"
                width="150px">
              <span>{{ goodsForm.size }}</span>
            </el-descriptions-item>
            <el-descriptions-item
                label="是否可议价"
                label-align="center"
                align="center"
                label-class-name="Item"
                column-key="filterStatus"
                width="150px">
              <span v-if="goodsForm.bargain === 'true'">可议价</span>
              <span v-else>一口价</span>
            </el-descriptions-item>
            <el-descriptions-item
                label="销量"
                label-align="center"
                align="center"
                label-class-name="Item"
                width="150px">
              <span>{{ goodsForm.sale }}</span>
            </el-descriptions-item>
            <el-descriptions-item
                label="新旧程度"
                label-align="center"
                align="center"
                label-class-name="Item"
                width="150px">
              <span>{{ goodsForm.gcondition }}</span>
            </el-descriptions-item>
            <el-descriptions-item
                label="商品介绍"
                label-align="center"
                align="center"
                label-class-name="Item"
                width="150px">
              <span>{{ goodsForm.introduction }}</span>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
      <el-col :span="2" :push="1">
        <div class="opeBoard">
          <slot name="upButton" class="opeButton"></slot>
          <slot name="downButton" class="opeButton"></slot>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { toRaw } from '@vue/reactivity';
import GoodsCard from "@/components/shop/GoodsCard";
export default {
  name: "GoodsExpend",
  components:{
    GoodsCard
  },
  props:{
    goods:Object,
  },
  data() {
    return {
      goodsForm:{
        gid:"",
        gname:"",
        type:"",
        price:"",
        size:"",
        picture:"",
        introduction:"",
        bargain:"",
        storage:"",
        gcondition:"",
        mid:"",
        oid:"",
        sale:"",
        likeRate:"",
        status:"",
      },
      canBargain: 4,
      baseURL:"http://localhost:9090/files/",
      showPictureUrl:""
    }
  },
  created() {
    this.onload()
  },
  methods:{
    onload(){
      this.goodsForm=toRaw(this.goods);
      this.showPictureUrl = this.baseURL+"download/"+this.goodsForm.picture
      console.log(this.showPictureUrl)
    },
  }
}
</script>

<style scoped>
.GoodsExpend{
}
.goodImg{
  width: 130px;
  height: 160px;
  border: 1px solid black;
}
.goodInfo{
  /*width: 400px;*/
}
.goodIntroduction{
  width: 400px;
}
.opeBoard{
  height: 160px;
}
.opeButton{
  margin: 10px auto;
}
</style>