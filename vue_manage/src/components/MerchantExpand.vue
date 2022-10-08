<template>
  <div id="MerchantExpand">
    <el-descriptions border>
      <el-descriptions-item
          :column="6"
          label="身份证"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">
        <el-image
            style="width: 200px;height: 200px"
            :src="this.identityURL">
          <template #error>
            <div class="image-slot">
              图片未上传
            </div>
          </template>
        </el-image>
      </el-descriptions-item>
      <el-descriptions-item
          :column="6"
          label="营业执照"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">
        <el-image
            style="width: 200px;height: 200px"
            :src="this.licenseURL">
          <template #error>
            <div class="image-slot">
              图片未上传
            </div>
          </template>
        </el-image></el-descriptions-item>
    </el-descriptions>

  </div>
</template>

<script>
import { toRaw } from '@vue/reactivity';
export default {
  name: "MerchantExpand",
  props:{
    user:Object,
  },
  components:{},
  data() {
    return {
      userForm:{
        uid:"",
        name:"",
        psw:"",
        phone:"",
        email:"",
        city:"",
        sex:"",
        bank:"",
        account:"",
        point:"",
        status:"",
        license:"",
        identity:"",
        grade:"",
        turnover:"",
        likeRate:"",
        MLikeRate:"",
      },
      baseURL:"http://localhost:9090/files/download/",
      licenseURL:"",
      identityURL:"",
    }
  },
  created() {
    this.onload()
  },
  methods:{
    onload(){
      this.userForm=toRaw(this.user);
      this.licenseURL = this.baseURL+this.userForm.license
      this.identityURL = this.baseURL+this.userForm.identity
      console.log(this.identityURL)
    }
  }
}
</script>

<style scoped>

</style>