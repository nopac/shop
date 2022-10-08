<template>
  <div class="UserInfo">
    <div class="infoBoard">
      <div class="headBoard">
        <el-avatar class="headImg" :size="100" :src="require('@/assets/'+headSrc+'.jpg')" />
        <div class="headOpt">
        </div>
      </div>
      <el-card class="UInfo">
        <template #header>
          <div class="card-header">
            <span>我的信息</span>
            <div class="button_head">
              <el-button v-if="diseditable === true" class="button_head" text @click="editInfo">编辑</el-button>
              <el-button v-if="diseditable === false" class="button_head" text @click="cancelSave">取消</el-button>
              <el-button v-if="diseditable === false" class="button_head" text @click="saveInfo">保存</el-button>
            </div>
          </div>
        </template>
        <el-form class="userForm" :model="userForm" :label-position="labelPosition">
          <el-form-item class="formItem" label="用户名" :label-width="labelWith">
            <el-input style="width: 120px" v-model="userForm.uname" :disabled="true"/>
          </el-form-item>
          <el-form-item class="formItem" label="密码" :label-width="labelWith">
            <el-input style="width: 120px" v-model="userForm.upsw"  :disabled="diseditable"/>
          </el-form-item>
          <el-form-item class="formItem" label="性别" :label-width="labelWith">
            <el-select v-model="userForm.sex" style="width: 120px" :disabled="diseditable">
              <el-option label="男" value='1' :key="1"/>
              <el-option label="女" value='0' :key="0"/>
              <el-option label="保密" value='-1' :key="-1"/>
            </el-select>
          </el-form-item>
          <el-form-item class="formItem" label="手机号" :label-width="labelWith">
            <el-input style="width: 120px" v-model="userForm.phone" :disabled="diseditable"/>
          </el-form-item>
          <el-form-item class="formItem" label="城市" :label-width="labelWith">
            <el-input style="width: 120px" v-model="userForm.city"  :disabled="diseditable"/>
          </el-form-item>
          <el-form-item class="formItem" label="邮件" :label-width="labelWith">
            <el-input style="width: 200px" v-model="userForm.email"  :disabled="diseditable"/>
          </el-form-item>
          <!--        身份证号需要额外点击身份认证-->
          <el-form-item class="formItem" label="身份证号" :label-width="labelWith">
            <el-input style="width: 200px" v-model="userForm.identityNumber" :disabled="true"/>
          </el-form-item>
          <!--        银行账号需要额外点击绑定银行卡-->
          <el-form-item class="formItem" label="银行账户" :label-width="labelWith">
            <el-input style="width: 200px" v-model="userForm.bank" :disabled="true"/>
          </el-form-item>
          <el-form-item class="formItem" label="收货地址" :label-width="labelWith">
            <el-input type="textarea" style="width:  200px" v-model="userForm.address"  :disabled="diseditable"/>
          </el-form-item>

        </el-form>
      </el-card>
      <div class="displayBoard">
        <el-card class="UserDisplayBoard">
          <template #header>
            <div class="card-header">
              <span>我的账户信息</span>
              <el-button @click="invest">充值</el-button>
            </div>
          </template>
          <div class="account">
            <span>余额:</span>{{userForm.account}}
          </div>
          <div class="likeRate">
            <span>积分:</span>{{userForm.point}}
          </div>
          <div class="beMct">
            <el-button @click="clickBeMct">成为商家</el-button>
          </div>
        </el-card>
      </div>
      <div>
      </div>
    </div>

    <!--    充值弹窗-->
    <div>
      <el-dialog
          v-model="investVisible"
          title="充值"
          :visible.sync="investVisible"
          width="700px"
          style="margin-left: 20px"
      >
        <el-form class="userForm" :inline="true" style="text-align: center">
          <el-form-item class="formItem" label="充值金额" label-width="100px">
            <el-input-number style="width: 120px" v-model="investNum" :step="1" :min="0"/>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="investVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </span>
        </template>
      </el-dialog>
    </div>
    <!--    成为商家弹窗-->
    <div>
      <el-dialog
          v-model="beMctVisible"
          title="申请成为商家"
          :visible.sync="beMctVisible"
          width="700px"
          style="margin-left: 20px"
      >
        <el-form class="userForm" :inline="true" style="text-align: center">
          <el-form-item class="el-form-item input-area">
            <span class="license_label">营业执照:&emsp;</span>
            <el-upload
                :action=licenseUrl
                :on-success="licenseUploadSuccess"
                :limit="1"
            >
              <el-button type="primary">点击上传营业执照</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item class="el-form-item input-area">
            <span class="license_label">身份证照片:&emsp;</span>
            <el-upload
                :action=idUrl
                :on-success="idUploadSuccess"
                :limit="1"
            >
              <el-button type="primary">点击上传身份证照片</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelSubmit">取消</el-button>
        <el-button type="primary" @click="updateImgPath">提交</el-button>
      </span>
        </template>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import request from "@/util/request";
import {toRaw} from "@vue/reactivity";
export default {
  name: "UserInfo",
  components:{
  },
  data(){
    return {
      operate: "",
      investVisible: false,
      beMctVisible: false,
      diseditable: true,
      userForm:{},
      recordForm:{},
      baseURL:"http://localhost:9090/files/upload/",
      imageUrl:"",
      licenseUrl: "",
      idUrl: "",
      investNum: 0,
      headSrc: 'default_head',
      labelPosition: 'right',
      labelWith: '70px',
      //存放上传文件
      fileList: [],
      idfileList:[],
    }
  },
  created() {
    this.load();
  },
  methods:{
    load(){
      this.userForm.uname=localStorage.getItem("uname")
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
          if (this.userForm.license!==null)
            this.licenseUrl = this.baseURL+this.userForm.license
          else
            this.licenseUrl = this.baseURL
          if (this.userForm.identity!==null)
            this.idUrl = this.baseURL+this.userForm.identity
          else {
            this.idUrl = this.baseURL
            console.log("idURL"+this.idUrl)
          }
        }
      })
    },
    submit(){
      this.recordForm.type=0
      this.recordForm.amount = this.investNum
      this.recordForm.uid = this.userForm.uid
      this.recordForm.account = this.userForm.account
      request.post("/account",this.recordForm).then(res=>{
        if(res.code !== '0'){
          this.$message({
            type: "error",
            message: res.msg,
          })
        }else {
          console.log(res)
          this.investVisible=false;
          this.load()
        }
      })

    },
    invest(){
      this.investVisible=true;
    },
    editInfo(){
      //退出不可修改状态
      this.diseditable = false;
    },
    saveInfo(){
      //点击提交表单
      this.updateUser();
      //进入不可修改状态
      this.diseditable = true;
    },
    cancelSave(){
      this.load();
      this.diseditable = true;
    },
    updateUser(){
      request.put("/user",this.userForm).then(res=>{
        // console.log(res)
        if(res.code === '0'){
          this.$message({
            type:"success",
            message: "更新成功",
          });
          this.addUserVisible = false;
        }else{
          this.$message({
            type:"error",
            message: res.msg,
          })
        }
        this.load();
      })
    },
    cancelSubmit(){
      this.investVisible = false
      this.beMctVisible = false
    },
    clickBeMct(){
      request.get("/merchant/isMerchant/"+this.userForm.uid).then(res=>{
        console.log("code="+res.code)
        if(res.code === '0'){
          this.$message({
            type: "error",
            message: "此用户已经是商家了"
          })
        }else {
          this.load()
          this.beMctVisible = true
          console.log()
        }
    })

    },
    licenseUploadSuccess(res){
      console.log(res.token)
      this.userForm.license = res.token
    },
    idUploadSuccess(res){
      console.log(res.token)
      this.userForm.identity = res.token
    },
    updateImgPath(){
      console.log("license:"+this.userForm.license)
      this.userForm.isMerchant = 2
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
    }
  }
}
</script>

<style scoped>
.UserInfo{
  padding: 10px;
}
.headBoard{
  position: absolute;
  width: 200px;
  height: 160px;
  float: left;
  left: 250px;
}
.UInfo{
  width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.userForm{

}
.UserDisplayBoard .MerchantDisplayBoard{

}
.MerchantDisplayBoard{
  margin-top: 10px;
}
.displayBoard{
  position: absolute;
  width: 300px;
  float: left;
  left: 250px;
  top: 230px;
}
.headImg{
  width: 100px;
  height: 100px;
  margin-left: 50px;
}
.headOpt{
  margin-top: 10px;
  margin-left: 55px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button_head{
  float: right;
}
</style>