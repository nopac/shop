<template>
  <div id="userExpand">
    <el-descriptions border>
      <el-descriptions-item
          label="性别"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">
        <span v-if="userForm.sex === '0'">女</span>
        <span v-if="userForm.sex === '1'">男</span>
        <span v-if="userForm.sex === '-1'">保密</span>
      </el-descriptions-item>
      <el-descriptions-item
          label="城市"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">{{ userForm.city }}</el-descriptions-item>
      <el-descriptions-item
          label="手机号"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">{{ userForm.phone }}</el-descriptions-item>
      <el-descriptions-item
          label="邮箱"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">{{ userForm.email }}</el-descriptions-item>
      <el-descriptions-item
          label="积分"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">{{ userForm.point }}</el-descriptions-item>
      <el-descriptions-item
          label="身份证号"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">{{ userForm.identityNumber }}</el-descriptions-item>
    </el-descriptions>

  </div>
</template>

<script>
import { toRaw } from '@vue/reactivity';

export default {
  name: "userExpand",
  props:{
    user:Object,
  },
  components:{},
  data() {
    return {
      userForm:{
        uid:"",
        uname:"",
        upsw:"",
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
        identityNumber:"",
      }
    }
  },
  created() {
    this.onload()
  },
  methods:{
    onload(){
      this.userForm=toRaw(this.user);
    }
  }
}
</script>

<style scoped>
#userExpand{
  display: block;
}
.Item{
  display: inline-block;
  min-width: 100px;
  min-height: 50px;
  line-height: 50px;
  text-align: left;

}
</style>