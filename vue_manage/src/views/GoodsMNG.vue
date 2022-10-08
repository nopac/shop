<template>
  <div class="GoodsMNG">
    <div class="opeBoard">
      <el-button type="primary" @click="addUser">新增</el-button>
      <el-button type="primary" @click="load">刷新</el-button>
    </div>
    <div class="searchBoard">
      <el-input v-model="searchText" placeholder="输入关键字" style="width: 20%" clearable/>
      <el-button type="primary" style="margin: 0 5px"
                 @click="searchName">查询</el-button>
    </div>
    <div class="displayBoard">
      <el-table :data="tableData"
          border
          stripe
          style="width: 100%"
      >
        <el-table-column type="expand">
          <!--        修改为自定义组件，显示其他信息-->
          <template #default="props">
            <goods-expand v-bind:goods="props.row" >
              <template v-slot:upButton>
                <el-button
                    @click="upGoods(props.row)"
                    type="primary" plain
                    class="opeButton"
                    v-if="props.row.status===4">发布</el-button>
              </template>
              <template v-slot:downButton>
                <el-button
                    @click="downGoods(props.row)"
                    type="danger" plain
                    class="opeButton"
                    v-if="props.row.status===1">下架</el-button>
              </template>
            </goods-expand>
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
            prop="type"
            label="商品类型" />
        <el-table-column
            prop="price"
            label="价格" />
        <el-table-column
            prop="storage"
            label="库存" />
        <el-table-column fixed="right" label="操作" class="fixedOpe" width="180px">
          <template #default="scope">
            <el-button text @click="editUser(scope.row)" type="primary" plain>编辑</el-button>
            <el-popconfirm title="确认删除？" @confirm="deleteUser(scope.row.gid)">
              <template #reference>
                <el-button text @click="" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
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
<!--    新增商品弹窗-->
    <div>
      <el-dialog
          v-model="addGoodsVisible"
          :title=goodsDialogTitle
          :visible.sync="addGoodsVisible"
          width="700px"
          style="margin-left: 20px"
      >
        <el-form class="userForm demo-form-inline" :model="goodsForm" :inline="true">
          <el-form-item label="商品名" label-width="100px">
            <el-input style="width: 120px" v-model="goodsForm.gname" />
          </el-form-item>
          <el-form-item label="商品类型" label-width="100px">
            <el-input style="width: 120px" v-model="goodsForm.type" />
          </el-form-item>
          <el-form-item label-width="100px" label="商品价格">
            <el-input style="width: 120px" v-model="goodsForm.price" />
          </el-form-item>
          <el-form-item label-width="100px" label="是否可议价">
            <el-select v-model="goodsForm.bargain" style="width: 120px">
              <el-option label="一口价" value="false" />
              <el-option label="可议价" value="true" />
            </el-select>
          </el-form-item>
          <el-form-item label-width="100px" label="库存">
            <el-input style="width: 200px" v-model="goodsForm.storage" />
          </el-form-item>
          <el-form-item label-width="100px" label="新旧程度">
            <el-input style="width: 200px" v-model="goodsForm.gcondition" />
          </el-form-item>
          <el-form-item label-width="100px" label="折扣">
            <el-input style="width: 200px" v-model="goodsForm.sale" />
          </el-form-item>
          <el-form-item label-width="100px" label="商品介绍">
            <el-input style="width: 120px" v-model="goodsForm.introduction" />
          </el-form-item>
<!--          后期做成列表选择-->
          <el-form-item label-width="100px" label="卖家id">
            <el-input style="width: 120px" v-model="goodsForm.mid" />
          </el-form-item>
          <!--    商品图片上传-->
          <el-form-item label-width="100px" label="商品图片">
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
            >
              <el-button type="primary">点击上传营业执照</el-button>
              <template #tip>
                <div class="el-upload__tip" style="width: 200px">
                  jpg/png 文件大小需小于 500KB.
                </div>
              </template>
            </el-upload>
          </el-form-item>

        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="addGoodsVisible = false">取消</el-button>
        <el-button type="primary" @click="submitUser">提交</el-button>
      </span>
        </template>
      </el-dialog>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import GoodsExpand from "@/components/GoodsExpand";
import request from "@/util/request";
import axios from "axios";
export default {
  name: 'GoodsMNG',
  components: {
    GoodsExpand
  },
  data(){
    return {
      operate: "",
      goodsDialogTitle: "",
      searchText: "",
      currentPage: 1,
      pageSize: 5,
      total: 10,
      addGoodsVisible: false,
      DataList:[],
      tableData : [
      ],
      goodsForm:{},
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
        searchText: this.searchText
      }
      request.get("/goods/findgoods",{
        params: params
      }).then(res=>{
        console.log(res);
        this.total=res.data.total;
        this.tableData = res.data.records;
        this.tableData.forEach(e=>{
          for( var key in e){
            if(e[key] === "null"){
              delete e[key];
            }
            e.bargain=String(e.bargain)
          }
        })//过滤null
      })
    },
    searchName(){
      this.load();
    },
    addUser(){
      this.addGoodsVisible = true;
      this.goodsForm={};
      this.operate="addUser";
      this.goodsDialogTitle="新增商品"
    },
    editUser(row){
      this.goodsForm = JSON.parse(JSON.stringify(row));
      console.log(this.goodsForm)
      this.addGoodsVisible = true;
      this.operate="updateUser"
      this.goodsDialogTitle="编辑商品"
    },
    submitUser(){
      if (this.operate === "addUser"){
        this.saveUser();
      }else if (this.operate === "updateUser"){
        this.updateUser();
      }
    },
    updateUser(){
      request.put("/goods",this.goodsForm).then(res=>{
        // console.log(res)
        if(res.code === '0'){
          this.$message({
            type:"success",
            message: "更新成功",
          });
          this.addGoodsVisible = false;
        }else{
          this.$message({
            type:"error",
            message: res.msg,
          })
        }
        this.load();
      })
    },
    saveUser(){
      this.goodsForm.status=3
      request.post("/goods",this.goodsForm).then(res=>{
        console.log(res)
        this.addGoodsVisible = false;
        this.load();
      })
    },
    deleteUser(id){
      console.log(id);
      request.delete("/goods/"+id).then(res=>{

        if(res.code === '0'){
          this.$message({
            type:"success",
            message: "删除成功",
          });
          this.load()
        }else {
          this.$message({
            type: "error",
            message: res.msg,
          })
        }
      })
    },
    upGoods(row){
      this.goodsForm = JSON.parse(JSON.stringify(row));
      console.log(this.goodsForm)
      request.put("/exmG/opeStatus/"+3,this.goodsForm).then(res=>{
        console.log(res)
        this.goodsForm={}
        this.addGoodsVisible = false;
        this.load();
      })
    },
    downGoods(row){//下架商品
      this.goodsForm = JSON.parse(JSON.stringify(row));
      console.log(this.goodsForm)
      request.put("/exmG/opeStatus/"+4,this.goodsForm).then(res=>{
        console.log(res)
        this.goodsForm={}
        this.addGoodsVisible = false;
        this.load();
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
.GoodsMNG{
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
  margin: 0 55px;
  /*text-align: center;*/
}
.formItem{
  display: inline-flex;
  width: 250px;
}
</style>