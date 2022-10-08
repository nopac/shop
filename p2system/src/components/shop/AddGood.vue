<template>
  <div>
    <div style="margin: 20px 40px">
      <div style="float: left;width: 35%;">
        <el-image class="imageArea"
            style=""
            :src="this.showPictureUrl">
          <template #error>
            <div class="image-slot">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-image>
        <div>
          <el-upload
              :action=pictureUrl
              :on-success="pictureUploadSuccess"
              :show-file-list="false"
              :on-change="handleChange"
              :file-list="fileList"
              :limit="1"
          >
            <el-button type="primary">点击上传商品图片</el-button>
          </el-upload>
        </div>

      </div>
      <div style="float: right;width: 60%">
        <el-form :model="goodsForm" class="goodsForm">
          <el-form-item label="名称:" >
            <el-input v-model="goodsForm.gname"></el-input>
          </el-form-item>
          <el-form-item label="价格:" >
            <el-input v-model="goodsForm.price"></el-input>
          </el-form-item>
          <el-form-item label="大小:" >
            <el-input v-model="goodsForm.size"></el-input>
          </el-form-item>
          <el-form-item label="类别:" >
            <el-input v-model="goodsForm.type"></el-input>
          </el-form-item>
          <el-form-item label="库存:" >
            <el-input v-model="goodsForm.storage"></el-input>
          </el-form-item>
          <el-form-item label="新旧程度:" >
            <el-input v-model="goodsForm.gcondition"></el-input>
          </el-form-item>
          <el-form-item label="是否可议价:" >
            <el-select v-model="goodsForm.bargain" style="width: 120px">
              <el-option label="一口价" value="false" />
              <el-option label="可议价" value="true" />
            </el-select>
          </el-form-item>
          <el-form-item label="详情">
            <el-input v-model="goodsForm.introduction" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div style="margin: 10px auto;">
          <el-button type="primary" @click="saveGoods">确认添加</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ShoppingCart,Picture } from '@element-plus/icons-vue'
import request from "@/util/request";
export default {
  name: "AddGood",
  components: {
    ShoppingCart,Picture
  },
  data(){
    return {
      gid: this.$route.query.gid,
      num: 1,
      goodsForm: {},
      pictureUrl:"",
      baseURL:"http://localhost:9090/files/",
      fileList:[],
      showPictureUrl:""
    }
  },
  created() {
    this.pictureUrl = this.baseURL+"upload"
  },
  methods: {
    saveGoods(){
      this.goodsForm.mid=localStorage.getItem("uid")
      console.log("addGoods:"+this.goodsForm.picture)
      request.post("/goods",this.goodsForm).then(res=>{
        console.log(res)
        this.$router.push("/mngG")
      })
    },
    pictureUploadSuccess(res){
      console.log(res.token)
      this.goodsForm.picture = res.token
      this.showPictureUrl = this.baseURL+"download/"+this.goodsForm.picture
    },
    handleChange(file){
      this.fileList=[file]
      this.showPictureUrl = this.baseURL+"download/"+this.goodsForm.picture
    },
    getPicture(){
      console.log(this.goodsForm.picture)
      this.showPictureUrl = this.baseURL+"download/"+this.goodsForm.picture
    },
    updateImgPath(){
      console.log("picture:"+this.goodsForm.picture)
      request.put("/user",this.userForm).then(res=>{
        // console.log(res)
        if(res.code === '0'){
          this.$message({
            type:"success",
            message: "申请成功，请等待审核通过",
          });
          this.beMctVisible = false;
        }else{
          this.$message({
            type:"error",
            message: res.msg,
          })
        }
        this.load();
      })
    },
  }
}
</script>

<style scoped>
  .infoItem{
    margin-top: 0;
  }
  .goodsForm{
    width: 300px;
  }
  .image-slot{
    width: 400px;
    border: 1px solid;
    height: 300px;
  }
  .imageArea{
    width: 400px;
    height: 300px;
  }
</style>