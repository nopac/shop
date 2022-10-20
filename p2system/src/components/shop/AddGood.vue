<template>
  <van-form @submit="saveGoods">
    <van-cell-group inset>
      <!-- 输入任意文本 -->
      <van-field v-model="goodsForm.gname" label="商品名:" />
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field v-model="goodsForm.storage" type="digit" label="存货量:" />
      <!-- 允许输入正整数，调起纯数字键盘 -->
      <van-field v-model="goodsForm.price" type="number" label="价格:" />
      <van-field v-model="goodsForm.size" label="尺寸:" />


      <!-- 输入密码 -->
      <van-field v-model="goodsForm.type" label="商品类型" />
      <van-field
          v-model="goodsForm.introduction"
          label="商品介绍:"
          rows="3"
          type="textarea"
          maxlength="100"
          input-align="left"
      />
      <div>
        <van-radio-group v-model="checked" direction="horizontal" icon-size="10px">
          <van-radio name="1" icon-size="15px"><font size="2">可议价</font></van-radio>
          <van-radio name="0" icon-size="15px"><font size="2">一口价</font></van-radio>
        </van-radio-group>
      </div>
      <br>
      <div>
        <font size="2">上传图片:     </font>
<!--        <van-uploader v-model="fileList" multiple :max-count="1" :after-read="pictureUploadSuccess"/>-->

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
                    <el-button type="primary" size="medium">点击上传商品图片</el-button>
                  </el-upload>
                </div>

              </div>

      </div>
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>

    </van-cell-group>
  </van-form>

  <!--  <div>-->
<!--    <div style="margin: 20px 40px">-->
<!--      <div style="float: left;width: 35%;">-->
<!--        <el-image class="imageArea"-->
<!--            style=""-->
<!--            :src="this.showPictureUrl">-->
<!--          <template #error>-->
<!--            <div class="image-slot">-->
<!--              <el-icon><Picture /></el-icon>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-image>-->
<!--        <div>-->
<!--          <el-upload-->
<!--              :action=pictureUrl-->
<!--              :on-success="pictureUploadSuccess"-->
<!--              :show-file-list="false"-->
<!--              :on-change="handleChange"-->
<!--              :file-list="fileList"-->
<!--              :limit="1"-->
<!--          >-->
<!--            <el-button type="primary">点击上传商品图片</el-button>-->
<!--          </el-upload>-->
<!--        </div>-->

<!--      </div>-->
<!--      <div style="float: right;width: 60%">-->
<!--        <el-form :model="goodsForm" class="goodsForm">-->
<!--          <el-form-item label="名称:" >-->
<!--            <el-input v-model="goodsForm.gname"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="价格:" >-->
<!--            <el-input v-model="goodsForm.price"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="大小:" >-->
<!--            <el-input v-model="goodsForm.size"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="类别:" >-->
<!--            <el-input v-model="goodsForm.type"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="库存:" >-->
<!--            <el-input v-model="goodsForm.storage"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="新旧程度:" >-->
<!--            <el-input v-model="goodsForm.gcondition"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="是否可议价:" >-->
<!--            <el-select v-model="goodsForm.bargain" style="width: 120px">-->
<!--              <el-option label="一口价" value="false" />-->
<!--              <el-option label="可议价" value="true" />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="详情">-->
<!--            <el-input v-model="goodsForm.introduction" type="textarea"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <div style="margin: 10px auto;">-->
<!--          <el-button type="primary" @click="saveGoods">确认添加</el-button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import { ShoppingCart,Picture } from '@element-plus/icons-vue'
import request from "@/util/request";
import {Toast} from "vant";
export default {
  name: "AddGood",
  components: {
    ShoppingCart,Picture
  },
  data(){
    return {
      checked: 1,
      gid: this.$route.query.gid,
      num: 1,
      goodsForm: {},
      pictureUrl:"",
      baseURL:"http://39.105.220.225:8081/shop/files/",
      fileList:[],
      showPictureUrl:""
    }
  },
  created() {
    this.pictureUrl = this.baseURL+"upload"
  },
  methods: {
    saveGoods(){
      if(this.checked === 1) {
        this.goodsForm.bargain = "true"
      } else {
        this.goodsForm.bargain = "false"
      }
      this.goodsForm.mid=localStorage.getItem("uid")
      console.log("addGoods:"+this.goodsForm.picture)
      request.post("http://39.105.220.225:8081/shop/goods",this.goodsForm).then(res=>{
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
      request.put("http://39.105.220.225:8081/shop/user",this.userForm).then(res=>{
        // console.log(res)
        if(res.code === '0'){
          Toast.success("申请成功，请等待审核通过")
          this.beMctVisible = false;
        }else{
          Toast.fail(res.msg)
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