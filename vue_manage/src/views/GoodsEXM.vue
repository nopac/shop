<template>
  <div class="GoodsEXM">
    <!--<div class="opeBoard">
      <el-button type="primary" @click="load">刷新</el-button>
    </div>-->
    <!--<div class="searchBoard">
      <el-select v-model="searchSelect" slot="prepend" placeholder="请选择搜索对象" style="width: 100px">
        <el-option label="ID" value="gid"></el-option>
        <el-option label="商品名" value="gname"></el-option>
      </el-select>
      <el-input v-model="searchText" placeholder="输入搜索内容" style="width: 20%" clearable>
      </el-input>
      <el-button type="primary" style="margin: 0 5px"
                 @click="search">查询</el-button>
    </div>-->
<!--    <div class="searchBoard">-->

<!--      <el-select v-model="searchSelect" slot="prepend" placeholder="请选择搜索对象" style="width: 100px">-->
<!--        <el-option label="ID" value="gid"></el-option>-->
<!--        <el-option label="商品名" value="gname"></el-option>-->
<!--      </el-select>-->
<!--      <el-input v-model="searchText" placeholder="输入搜索内容" style="width: 70%" clearable>-->
<!--      </el-input>-->
<!--      <van-row justify="end">-->
<!--        <van-col span="3">-->
<!--          <el-button type="primary" style="margin: 0 5px"-->
<!--                     @click="search">查询</el-button>-->
<!--        </van-col>-->
<!--        <van-col span="3">-->
<!--          <el-button type="primary" @click="load">刷新</el-button>-->
<!--        </van-col>-->
<!--      </van-row>-->
<!--    </div>-->

    <div class="opeBoard">
      <van-row>
        <van-col offset="0" span="13">
          <div class="searchBoard">

            <van-search
                v-model="searchText"
                show-action
                label="名称"
                placeholder="请输入搜索关键词"
                @search="search"
            >
              <template #action>

              </template>
            </van-search>
            <!--      <el-input v-model="searchText" placeholder="输入关键字" style="width: 20%" clearable/>-->
            <!--      <el-button type="primary" style="margin: 0 5px"-->
            <!--                 @click="searchName">查询-->
            <!--      </el-button>-->
          </div>
        </van-col>
        <van-col span="5">
          <van-dropdown-menu>
            <van-dropdown-item v-model="searchSelect" :options="options"></van-dropdown-item>
          </van-dropdown-menu>
        </van-col>
        <van-col span="3">
          <van-button type="primary" size="mini" @click="search">搜索</van-button>
        </van-col>
        <van-col :offset="0">
          <van-button type="primary" size="mini" @click="load">刷新</van-button>
        </van-col>

      </van-row>
    </div>


    <div class="displayBoard">
      <el-table :data="tableData"
                border
                stripe
                @filter-change="filterStatus"
                style="width: 100%"
      >
        <el-table-column type="expand">
          <!--        修改为自定义组件，显示其他信息-->
          <template #default="props">
            <goods-expand v-bind:goods="props.row" />
          </template>
        </el-table-column>
        <el-table-column
            prop="gid"
            label="ID"
            sortable/>
        <el-table-column
            prop="gname"
            label="商品名"
            sortable />
        <!--     后期添加查看密码功能 -->
        <el-table-column
            label="状态"
            column-key="filterStatus"
            :filters="getfilterStatus()"
        >
          <template #default="scope">
            <span v-if="scope.row.status === 0" style="color: red;">不通过</span>
            <span v-if="scope.row.status === 1" style="color: darkgreen;">通过</span>
            <span v-if="scope.row.status === 3" style="color: dodgerblue;">审核中</span>
            <span v-if="scope.row.status === 4" style="color: darkred;">已下架</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" class="fixedOpe" width="130px">
          <template #default="scope" >
            <van-button @click="agreeGoods(scope.row)" size="mini" type="primary">通过</van-button>
            <van-button @click="refuseGoods(scope.row)" size="mini" type="warning">拒绝</van-button>
            <van-button @click="goDelete(scope.row)" size="mini" type="danger">删除</van-button>

<!--            <el-button text @click="agreeGoods(scope.row)" type="primary" plain v-if="scope.row.status !== 4">通过</el-button>-->
<!--            <el-button text @click="refuseGoods(scope.row)" type="danger" v-if="scope.row.status !== 4">拒绝</el-button>-->
<!--            <el-popconfirm title="确认删除？" @confirm="deleteGoods(scope.row.gid)">-->
<!--              <template #reference>-->
<!--                <van-icon name="delete-o" size="32px"/>-->
<!--                &lt;!&ndash;<el-icon-->
<!--                    @mouseover="deleteToRed(scope.row)"-->
<!--                    @mouseout="deleteToGrey(scope.row)"-->
<!--                    :style="{color:scope.row.iconColor}"-->
<!--                    class="deleteIcon"-->
<!--                    slot="suffix"><Delete /></el-icon>&ndash;&gt;-->
<!--              </template>-->
<!--            </el-popconfirm>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    分页-->
    <div style="margin: 10px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

  </div>
  <van-dialog v-model:show="isDelete" :message="deleteMessage" @confirm="deleteGoods" show-cancel-button>
  </van-dialog>
</template>

<script>
// @ is an alias to /src
import goodsExpand from "@/components/GoodsExpand";
import request from "@/util/request";

import {Delete} from "@element-plus/icons-vue";
import axios from "axios";
export default {
  name: "GoodsEXM",
  components: {
    goodsExpand,
    Delete
  },
  data(){
    return {
      options:[
        { text: 'ID ', value: "gid" },
        { text: '商品名', value: "gname" },
      ],
      isDelete: false,
      statusSelect: "",
      searchText: "",
      deleteMessage: "",
      searchSelect: "gname",
      currentPage: 1,
      pageSize: 10,
      total: 10,
      DataList:[],
      tableData : [      ],
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
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    load(){
      let params={
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        searchText: this.searchText,
        type: this.searchSelect
      }
      request.get("http://39.105.220.225:8081/shop/exmG",{
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
              }//过滤null
              e.iconColor='grey'
              e.bargain=String(e.bargain)
            })
          })
    },
    search(){
      this.load();
    },
    agreeGoods(row){
      this.goodsForm = row
      console.log(this.goodsForm)
      request.put("http://39.105.220.225:8081/shop/goods/exmStatus/"+1,this.goodsForm).then(res=>{
        console.log(res)
        this.goodsForm={}
        this.addGoodsVisible = false;
        this.load();
      })
    },
    refuseGoods(row){
      this.goodsForm = row
      console.log(this.goodsForm)
      request.put("http://39.105.220.225:8081/shop/goods/exmStatus/"+0,this.goodsForm).then(res=>{
        console.log(res)
        this.goodsForm={}
        this.addGoodsVisible = false;
        this.load();
      })
    },
    goDelete(row) {
      this.isDelete = true
      this.goodsForm = row
      this.deleteMessage = "是否删除ID为:" + row.gid + "的" + row.gname +"?"
    },
    deleteGoods(){
      // console.log(id);
      request.delete("http://39.105.220.225:8081/shop/exmG/"+this.goodsForm.gid).then(res=>{
        if(res.code === '0'){
          Toast.success("删除成功")
          this.load()
        }else {
          Toast.fail(res.msg)
        }
      })
      this.isDelete = true
    },
    handleSizeChange(val) {//改变每页的显示条数
      this.pageSize = val;
      this.load()
    },
    handleCurrentChange(val) {//改变页码
      this.currentPage=val
      this.load()
    },
    getfilterStatus(){
      let status =[
        { text:'不通过',value: 0 },
        { text:'通过',value: 1 },
        { text:'审核中',value: 3 },
        { text:'黑名单',value: 4 }]
      return status
    },
    filterStatus(filterObj){
      if(filterObj.filterStatus.length>0){
        console.log(filterObj.filterStatus[0])
        let temp = this.searchSelect
        this.searchSelect="status"
        this.searchText=filterObj.filterStatus[0]
        this.load()
        this.searchText=""
        this.searchSelect=temp
      }else{
        this.load()
      }
    },
    deleteToRed(row){
      row.iconColor = 'red'
    },
    deleteToGrey(row){
      row.iconColor = 'grey'
    }
  },
  filters:{
  },
}
</script>

<style scoped>
.GoodsEXM{
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

.deleteIcon{
  margin-left: 8px;
}
</style>