<template>
<div>123</div>
</template>

<script>
import request from "@/util/request";
import { ref } from 'vue';

export default {
  name: "UserInfo",
  setup() {
    const checked = ref('1');
    return { checked };
  },
  data(){
    return {
      operate: "",
      editable: true,
      DataList:[],
      userForm:{}
    }
  },
  created() {
    alert("123")
    this.userForm.uname=this.$route.query.uname
    console.log("getUser"+this.userForm.uname)
    request.get("http://39.105.220.225:8081/shop/user/getInfo/"+this.userForm.uname).then(res=>{
      if(res.code !== '0'){
        this.$message({
          type: "error",
          message: res.msg,
        })
      }else {
        console.log(res)
        this.userForm = res.data
        this.userForm.sex = String(this.userForm.sex)
      }
    })
  },
  methods:{
    editInfo(){
      //退出不可修改状态
    },
    saveInfo(){
      //点击提交表单
      //进入不可修改状态

    }
  }
}
</script>

<style scoped>
.UserInfo{
  padding: 10px;
}
.userForm{
  float: left;
}
.UserDisplayBoard .MerchantDisplayBoard{
  float: right;
}
.MerchantDisplayBoard{
  margin: 20px;
}
</style>