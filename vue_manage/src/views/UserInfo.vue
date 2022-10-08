<template>
  <div class="UserInfo">
    <div class="infoBoard">
      <el-form class="userForm" :model="userForm" >
        <el-form-item class="formItem" label="用户名" label-width="100px">
          <el-input style="width: 120px" v-model="userForm.uname" :disabled="true"/>
        </el-form-item>
        <el-form-item class="formItem" label="密码" label-width="100px">
          <el-input style="width: 120px" v-model="userForm.upsw"  :disabled="editable"/>
        </el-form-item>
        <el-form-item class="formItem" label-width="100px" label="性别">
          <el-select v-model="userForm.sex" style="width: 120px" >
            <el-option label="男" value='1' :key="1"/>
            <el-option label="女" value='0' :key="0"/>
            <el-option label="保密" value='-1' :key="-1"/>
          </el-select>
        </el-form-item>
        <el-form-item class="formItem" label-width="100px" label="手机号">
          <el-input style="width: 120px" v-model="userForm.phone" :disabled="editable"/>
        </el-form-item>
        <el-form-item class="formItem" label-width="100px" label="城市">
          <el-input style="width: 120px" v-model="userForm.city"  :disabled="editable"/>
        </el-form-item>
        <el-form-item class="formItem" label-width="100px" label="邮件">
          <el-input style="width: 200px" v-model="userForm.email"  :disabled="editable"/>
        </el-form-item>
<!--        身份证号需要额外点击身份认证-->
        <el-form-item class="formItem" label-width="100px" label="身份证号">
          <el-input style="width: 200px" v-model="userForm.identityNumber" :disabled="true"/>
        </el-form-item>
        <!--        银行账号需要额外点击绑定银行卡-->
        <el-form-item class="formItem" label-width="100px" label="银行账户">
          <el-input style="width: 200px" v-model="userForm.bank" :disabled="true"/>
        </el-form-item>

      </el-form>
      <div class="UserDisplayBoard">
        <div class="account">
          <span>余额:</span>{{userForm.account}}
        </div>

        <el-rate
            v-model="userForm.ulikeRate"
            disabled
            show-score
            text-color="#ff9900"
            :texts="userForm.ulikeRate">
        </el-rate>
      </div>
      <!--    仅在已成为商人后显示-->
      <div class="MerchantDisplayBoard">
        <div class="turnover">
          <span>总交易额:</span>{{userForm.turnover}}
        </div>
        <div class="grade">
          <span>商家等级:</span>{{userForm.grade}}
        </div>
        <el-rate
            v-model="userForm.MlikeRate"
            disabled
            show-score
            text-color="#ff9900"
            :texts="userForm.MlikeRate">
        </el-rate>
      </div>
    </div>

  </div>
</template>

<script>
import request from "@/util/request";

export default {
  name: "UserInfo",

  data(){
    return {
      operate: "",
      editable: true,
      DataList:[],
      userForm:{}
    }
  },
  created() {
    this.userForm.uname=this.$route.query.uname
    console.log("getUser"+this.userForm.uname)
    request.get("/user/getInfo/"+this.userForm.uname).then(res=>{
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