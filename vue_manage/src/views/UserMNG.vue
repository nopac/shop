<template>
  <div class="home">
    <!--<div class="opeBoard">
      <el-button type="primary" @click="addUser">新增</el-button>
      <el-button type="primary" @click="load">刷新</el-button>
    </div>
    <div class="searchBoard">
      <el-input v-model="searchText" placeholder="输入关键字" style="width: 50%" clearable/>
      <el-button type="primary" style="margin: 0 5px"
                 @click="searchName">查询</el-button>
    </div>-->

    <div class="searchBoard">

      <el-input v-model="searchText" placeholder="输入关键词" style="width: 100%" clearable>
      </el-input>
      <van-row justify="end">

        <van-col span="3">
          <el-button type="primary" style="margin: 0 5px"
                     @click="searchName">查询</el-button>
        </van-col>
        <van-col span="3">
          <el-button type="primary" @click="load">刷新</el-button>
        </van-col>
      </van-row>
      <van-row justify="end">
        <van-col span="3">
          <el-button type="primary"
                     @click="addUser">新增</el-button>
        </van-col>
      </van-row>
      <!--
      <van-icon name="delete-o" size="32px"/>
      -->
    </div>

    <div>
      <van-list
          v-model:loading="loading"
          :finished="finished"
          :finished-text="end"
          @load="load">

        <van-cell v-for="item in tableData">
          <van-row>
            <van-col span="8">姓名: {{ item.uname }}</van-col>
            <van-col span="8">ID: {{ item.uid }}</van-col>
<!--            <van-button plain type="primary" @click="editUser(item)">编辑</van-button>-->
          </van-row>
          <van-row>
            <van-col span="8">账户余额: {{ item.account }}</van-col>
            <van-col span="8">银行账户: {{ item.bank }}</van-col>
<!--            <van-button plain type="success"  @click ="goDelete(item)">删除</van-button>-->
          </van-row>
          <van-row>
            <van-col :offset="8" span="8">
              <van-button plain type="primary" @click="editUser(item)">编辑</van-button>
            </van-col>
            <van-col :offset="2" span="6">
              <van-button plain type="success" @click ="deleteUser(item.uid)">删除</van-button>
            </van-col>
          </van-row>
        </van-cell>
      </van-list>
    </div>
<!--    <div class="displayBoard">-->
<!--      <el-table :data="tableData"-->
<!--          border-->
<!--          stripe-->
<!--          style="width: 100%"-->
<!--      >-->
<!--        <el-table-column type="expand">-->
<!--          &lt;!&ndash;        修改为自定义组件，显示其他信息&ndash;&gt;-->
<!--          <template #default="props">-->
<!--            <user-expand v-bind:user="props.row" />-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="uid"-->
<!--            label="ID"-->
<!--            sortable/>-->
<!--        <el-table-column-->
<!--            prop="uname"-->
<!--            label="姓名"-->
<!--            sortable />-->
<!--        &lt;!&ndash;     后期添加查看密码功能 &ndash;&gt;-->
<!--        <el-table-column-->
<!--            prop="account"-->
<!--            label="账户余额" />-->
<!--        <el-table-column-->
<!--            prop="bank"-->
<!--            label="银行账户" />-->
<!--        <el-table-column fixed="right" label="操作" class="fixedOpe" width="180px">-->
<!--          <template #default="scope">-->
<!--            <el-button text @click="editUser(scope.row)" type="primary" plain>编辑</el-button>-->
<!--            <el-popconfirm title="确认删除？" @confirm="deleteUser(scope.row.uid)">-->
<!--              <template #reference>-->
<!--                <el-button text @click="" type="danger">删除</el-button>-->
<!--              </template>-->
<!--            </el-popconfirm>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--    </div>-->
<!--&lt;!&ndash;    分页&ndash;&gt;-->
<!--    <div style="margin: 10px">-->
<!--      <el-pagination-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--          :current-page="currentPage"-->
<!--          :page-sizes="[5, 10, 20]"-->
<!--          :page-size="pageSize"-->
<!--          layout="total, sizes, prev, pager, next, jumper"-->
<!--          :total="total">-->
<!--      </el-pagination>-->
<!--    </div>-->
<!--    新增用户弹窗-->
    <div>
      <el-dialog
          v-model="addUserVisible"
          :title=userDialogTitle
          :visible.sync="addUserVisible"
          width="300px"
      >
        <el-form class="userForm" :model="userForm" :inline="true">
          <el-form-item class="formItem" label="姓名" label-width="100px">
            <el-input style="width: 120px" v-model="userForm.uname" />
          </el-form-item>
          <el-form-item class="formItem" label="密码" label-width="100px">
            <el-input style="width: 120px" v-model="userForm.upsw" />
          </el-form-item>
          <el-form-item class="formItem" label-width="100px" label="性别">
            <el-select v-model="userForm.sex" style="width: 120px">
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
              <el-option label="保密" value="-1"/>
            </el-select>
          </el-form-item>
          <el-form-item class="formItem" label-width="100px" label="手机号">
            <el-input style="width: 120px" v-model="userForm.phone" />
          </el-form-item>
          <el-form-item class="formItem" label-width="100px" label="城市">
            <el-input style="width: 120px" v-model="userForm.city" />
          </el-form-item>
          <el-form-item class="formItem" label-width="100px" label="邮件">
            <el-input style="width: 200px" v-model="userForm.email" />
          </el-form-item>
          <el-form-item class="formItem" label-width="100px" label="身份证号">
            <el-input style="width: 200px" v-model="userForm.identityNumber" />
          </el-form-item>

        </el-form>
        <template #footer>
      <span class="dialog-footer" >
        <el-button @click="addUserVisible = false">取消</el-button>
        <el-button type="primary" @click="submitUser">提交</el-button>
      </span>
        </template>
      </el-dialog>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import userExpand from "@/components/UserExpand";
import request from "@/util/request";
import axios from "axios";
export default {
  name: 'Home',
  components: {
    userExpand
  },
  data(){
    return {
      operate: "",
      userDialogTitle: "",
      searchText: "",
      currentPage: 1,
      pageSize: 10,
      total: 10,
      addUserVisible: false,
      isDelete:false,
      DataList:[],
      tableData : [],
      loading: false,
      finished: false,
      options:[
        { text: 'ID ', value: "uid" },
        { text: '姓名', value: "uname" },
      ],
      userForm:{},

    }
  },
  created() {
    this.load()
  },
  methods: {
    load(){
      let params={
        pageNumber: this.currentPage,
        pageSize: 9999,
        searchText: this.searchText,
        type: this.searchSelect
      }
      request.get("http://39.105.220.225:8081/shop/user",{
        params: params
      })
          .then(res=>{
        console.log(res);
        this.total=res.data.total;
        this.tableData = res.data.records;
        this.tableData.forEach(e=>{
          for( var key in e){
            if(e[key] === "null"){
              delete e[key];
            }
            e.sex = String(e.sex)
          }
        })//过滤null
            this.finished = true
            this.end = "共" + this.tableData.length + "条数据，已加载完毕"
      })
    },
    searchName(){
      this.load();
    },
    addUser(){
      this.addUserVisible = true;
      this.userForm={};
      this.operate="addUser";
      this.userDialogTitle="新增用户"
    },
    editUser(row){
      this.userForm = JSON.parse(JSON.stringify(row));
      console.log(this.userForm)
      this.addUserVisible = true;
      this.operate="updateUser"
      this.userDialogTitle="编辑用户"
    },
    submitUser(){
      if (this.operate === "addUser"){
        this.saveUser();
      }else if (this.operate === "updateUser"){
        this.updateUser();
      }
    },
    updateUser(){
      request.put("http://39.105.220.225:8081/shop/user",this.userForm).then(res=>{
        // console.log(res)
        if(res.code === '0'){
          Toast.success("更新成功")
          this.addUserVisible = false;
        }else{
          Toast.fail(res.msg)
        }
        this.load();
      })
    },
    saveUser(){
      this.userForm.status=3
      request.post("http://39.105.220.225:8081/shop/user",this.userForm).then(res=>{
        console.log(res)
        this.addUserVisible = false;
        this.load();
      })
    },
    deleteUser(id){
     console.log(id);
      request.delete("http://39.105.220.225:8081/shop/user/"+id).then(res=>{
        if(res.code === '0'){
          Toast.success("删除成功")
          this.load()
        }else {
          Toast.fail(res.msg)
        }
      })
    },
    handleSizeChange(val) {//改变每页的显示条数
      this.pageSize = val;
      this.load()
    },
    handleCurrentChange(val) {//改变页码
      this.currentPage=val
      this.load()
    },
  }
}
</script>
<style scoped>
.home{
  padding: 10px;
}
.opeBoard{
  margin: 10px 0;
}
.searchBoard{
  margin: 10px 0;
}
.fixedOpe{
  width: 120px;
  text-align: center;
}

.userForm{
  width: 80%;
  display: block;
  /*text-align: center;*/
}
.formItem{
  /*display: inline-flex;*/
  width: 250px;
}
</style>
