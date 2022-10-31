<template>
  <div class="Register">
    <div class="register-area">
      <van-nav-bar title="注册" />
      <van-form @submit="register">
        <van-cell-group inset class="UserInfo">
          <!-- 输入任意文本 -->
          <van-field v-model.trim="userForm.uname" label="用户名"
                     @blur="judgeName"
                     @focus="clearError"
                     :error="uname_error"
                     :error-message="uname_message"
                     required >
            <template #right-icon>
              <van-icon name="success" v-if="uname_right===true"
                        color="#07C160"/>
            </template>
          </van-field>
          <!-- 密码-->
          <van-field v-model="userForm.upsw"
                     type="password" label="密码"
                     :rules="[{ required: true, message: '请输入密码' }]"
                     :error="upsw_error"
                     :error-message="upsw_message"
                     required />
          <!-- 确认密码-->
          <van-field v-model="userForm.confirm"
                     type="password" label="确认密码"
                     :error-message="confirm_message"
                     @blur="judgeConfirm"
                     @focus="clearError"
                     :error="confirm_error"
                     :rules="[{ required: true, message: '请输入密码' }]"
                     required >
            <template #right-icon>
              <van-icon name="success" v-if="confirm_right===true"
                        color="#07C160"/>
            </template>
          </van-field>
          <!-- 性别-单选框 -->
          <van-field name="radio" type="text" label="性别" >
            <template #input>
              <van-radio-group v-model="userForm.sex" direction="horizontal">
                <van-radio name="0">女</van-radio>
                <van-radio name="1">男</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 身份证 -->
          <van-field
              v-model="userForm.identityNumber"
              required
              label="身份证号"
              placeholder="请输入身份证号"
              :error="identityNumber_error"
              :error-message="identityNumber_message"
              :rules="[{ required: true, message: '请输入身份证号' }]"
          />
          <!-- 输入银行账户 -->
          <van-field v-model="userForm.bank" type="email" label="银行账户"  />
          <!-- 输入收货地址 -->
          <van-field v-model="userForm.address"  type="email" label="收货地址"
                     :error="address_error"
                     :error-message="address_message"
                     placeholder="请输入收货地址"
                     :rules="[{ required: true, message: '请输入收货地址' }]"
                     required/>
          <!-- 输入验证码 -->
            <div class="confirmCard">
              <van-field  class="input-code" v-model="inputCode"
                          label="验证码 :"
                          :error="code_error"
                          :error-message="code_message"
                          @blur="confirmCode"
                          @focus="clearError"
                          placeholder="请输入验证码"
                          :rules="[{ required: true, message: '请输入验证码' }]"
                          required>
                <template #right-icon>
                  <van-icon name="success"
                            v-if="code_right===true"
                            color="#07C160" />
                </template>
              </van-field>
              <ConfirmCode class="confirmImg" :changeCode.sync='identifyCode' v-on:changeCode="changeCode"></ConfirmCode>

            </div>
        </van-cell-group>

      </van-form>
      <div class="codeArea"></div>

    </div>
    <div class="opeBoard">
      <van-button
          round block type="primary"
          class="opeButton"
          @click="register">注册
      </van-button>
      <van-button
          class="opeButton"
          style="margin-top:5px"
          round block plain type="primary"
          @click="backToLogin" >返回登录界面
      </van-button>
    </div>
  </div>
</template>

<script>
import ConfirmCode from "@/components/ConfirmCode";
import {View,CircleCloseFilled} from "@element-plus/icons-vue";
import request from "@/util/request";
import {NavBar, Icon, Toast} from 'vant'
export default {
  name: "Register",
  components:{
    View,
    CircleCloseFilled,
    ConfirmCode,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
  },
  data(){
    return{
      identifyCode:'',
      inputCode: '',
      rightCode: '',
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
      },
      confirmVisible: 'confirmError',
      uname_message: '',
      confirm_message: '',
      upsw_message: '',
      identityNumber_message:'',
      address_message:'',
      code_message:'',
      uname_error: false,
      confirm_error:false,
      upsw_error: false,
      identityNumber_error:false,
      address_error:false,
      code_error: false,
      code_right:false,
      confirm_right:false,
      uname_right:false,
    }
  },
  computed: {

  },
  methods:{
    created() {
      this.$nextTick(()=>{
        this.initCharts();
      })
    },
    register(){
      //判断用户名密码非空
      if (this.userForm.uname===""||this.userForm.upsw===""){
        this.uname_error=true
        this.uname_message="用户名不能为空"
        this.upsw_error=true
        this.upsw_message="密码不能为空"
        Toast.fail("注册失败，请检查信息是否填写正确")
        return;
      }
      //二次确认密码与密码一致
      if (this.userForm.upsw !== this.userForm.confirm){
        console.log("二次确认不一致")
        this.confirm_error = true
        this.confirm_message = "确认密码不一致!"
        Toast.fail("注册失败，请检查信息是否填写正确")
        return;
      }
      if(this.inputCode !== this.rightCode){
        console.log("验证码错误")
        this.code_error = true
        this.code_message = "验证码错误!"
        Toast.fail("注册失败，请检查信息是否填写正确")
        return;
      }
      request.post("http://39.105.220.225:8081/shop/user",this.userForm).then(res =>{
        if(res.code === '0'){
          Toast.success({
            message: '注册成功',
            position: 'bottom',
          });
          this.$router.push("/login")
        }else if(res.code === '-2'){
          this.unameUnique=false
          this.uname_message="此用户名已存在"
        }
        else{
          Toast.fail(res.msg)
        }
      })
      //判断邮箱格式
      //图片的上传与显示
    },
    backToLogin(){
      this.$router.push("/login")
    },
    judgeConfirm(){
      if (this.userForm.upsw !== this.userForm.confirm){
        console.log("二次确认不一致")
        this.confirm_right=false
        this.confirm_message = "确认密码不一致!"
        return false
      }else{
        console.log("二次确认一致")
        this.confirm_right=true
        this.confirm_message = ''
        return true
      }
    },
    judgeName(){
      if (this.userForm.uname){
        console.log("judge "+this.userForm.uname)
        request.get("http://39.105.220.225:8081/shop/user/judgeName/"+this.userForm.uname).then(res=>{
          if(res.code === '-2'){//此用户名已存在、
            // this.unameUnique=false
            this.uname_message="此用户名已存在"
            this.confirm_right=false
            console.log("此用户名已存在")
            return false
          }else {
            this.uname_right=true
            console.log(res.code)
            this.uname_message = ''
            return true
          }
        })

      }else{
        this.uname_message="请输入用户名"
        this.confirm_right=false
        return false
      }
    },
    confirmCode(){
      if(this.inputCode !== this.rightCode){
        console.log("验证码错误")
        this.code_error = true
        this.code_right = false
        this.code_message = "验证码错误!"
        return false;
      }else{
        console.log("验证码正确")
        this.code_right = true
        this.code_error = false
        return true
      }
    },
    changeCode(val){
      this.rightCode = val;
      console.log("rightCode="+val)
    },
    clearError(){
      this.uname_error= false
      this.confirm_error=false
      this.upsw_error= false
      this.identityNumber_error=false
      this.address_error=false
      this.code_error= false
      this.code_right= false
      this.confirm_right= false
      this.uname_right= false
      this.code_message = ""
    }
  },
}
</script>

<style scoped>

.UserInfo{
  padding: 10px;
  margin:10px
}
.UserDisplayBoard .MerchantDisplayBoard{

}
.confirmCard{
  display: flex;
}
.input-code{
  width: 6rem;
}
.confirmImg{
  padding-top: 0.1rem;
  padding-left: 0.1rem;
}
.opeBoard{
  margin-top: 0.4rem;
  width: 8rem;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.opeButton{
  width: 8rem;
  margin-left: auto;
  margin-right: auto;
}
</style>