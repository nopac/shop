<template>
  <div class="AmtRecordMNG">
    <div class="opeBoard">
      <el-button type="primary" @click="addGoods">新增</el-button>
      <el-button type="primary" @click="load">刷新</el-button>
    </div>
    <div class="searchBoard">
      <el-input v-model="searchText" placeholder="输入关键字" style="width: 20%" clearable/>
      <el-button type="primary" style="margin: 0 5px"
                 @click="searchName">查询</el-button>
    </div>
    <div class="displayBoard">
      <div class="infoCard" style="display: none">
        <el-descriptions border column="3" title="我的店铺信息">
          <el-descriptions-item
              label="交易额"
              label-align="center"
              align="center"
              label-class-name="my-label"
              class-name="my-content"
              width="150px">
            <span>{{ userForm.turnover }}</span>
          </el-descriptions-item>
          <el-descriptions-item
              label="商家等级"
              label-align="center"
              align="center"
              label-class-name="Item"
              width="150px">
            <span>{{ userForm.grade }}</span>
          </el-descriptions-item>
          <el-descriptions-item
              label="商家好评率"
              label-align="center"
              align="center"
              label-class-name="Item"
              width="150px">
            <span>{{ userForm.mlikeRate }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <el-table :data="tableData"
                border
                stripe
                style="width: 100%"
      >
        <el-table-column type="expand">
          <!--        修改为自定义组件，显示其他信息-->
          <template #default="props" >
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
            prop="type"
            label="收支类型">
          <template #default="scope">
            <span v-if="scope.row.type === 0" style="color: darkgreen;">收入</span>
            <span v-if="scope.row.type === 1" style="color: red;">支出</span>
          </template>
        </el-table-column>
        <!--     后期添加查看密码功能 -->
        <el-table-column
            prop="amount"
            label="金额" sortable />
        <el-table-column
            label="时间" >
          <template #default="scope" >
            {{ dateFormat(scope.row.time)}}
          </template>
        </el-table-column>
        <el-table-column
            prop="oid"
            label="订单号" />
        <el-table-column
            prop="account"
            label="账户余额" >
        </el-table-column>
        <el-table-column fixed="right" label="操作" class="fixedOpe" width="180px">
          <template #default="scope" >
<!--            <el-button text @click="editGoods(scope.row)" type="primary" plain>编辑</el-button>-->
<!--            <el-popconfirm title="确认删除？" @confirm="deleteRecord(scope.row)">-->
<!--              <template #reference>-->
<!--                <el-button text @click="" type="danger">删除</el-button>-->
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
    <!--    新增商品弹窗-->
    <div>
      <el-dialog
          v-model="addGoodsVisible"
          :title=goodsDialogTitle
          :visible.sync="addGoodsVisible"
          width="700px"
          style="margin-left: 20px"
      >
        <el-form class="userForm" :model="goodsForm" :inline="true">
          <el-form-item class="formItem" label="商品名" label-width="100px">
            <el-input style="width: 120px" v-model="goodsForm.gname" />
          </el-form-item>
          <el-form-item class="formItem" label="商品类型" label-width="100px">
            <el-input style="width: 120px" v-model="goodsForm.type" />
          </el-form-item>
          <el-form-item class="formItem" label-width="100px" label="商品价格">
            <el-input style="width: 120px" v-model="goodsForm.price" />
          </el-form-item>
          <el-form-item class="formItem" label-width="100px" label="是否可议价">
            <el-select v-model="goodsForm.bargain" style="width: 120px">
              <el-option label="一口价" value="false" />
              <el-option label="可议价" value="true" />
            </el-select>
          </el-form-item>
          <el-form-item class="formItem" label-width="100px" label="库存">
            <el-input style="width: 200px" v-model="goodsForm.storage" />
          </el-form-item>
          <el-form-item class="formItem" label-width="100px" label="新旧程度">
            <el-input style="width: 200px" v-model="goodsForm.gcondition" />
          </el-form-item>
          <el-form-item class="formItem" label-width="100px" label="尺寸">
            <el-input style="width: 200px" v-model="goodsForm.size" />
          </el-form-item>
          <el-form-item class="formItem" label-width="100px" label="商品介绍">
            <el-input style="width: 120px" v-model="goodsForm.introduction" />
          </el-form-item>
          <!--    商品图片上传-->
          <el-form-item class="formItem" label-width="100px" label="商品图片">
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
              <el-button type="primary">点击上传商品图片</el-button>
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
        <el-button type="primary" @click="submitGoods">提交</el-button>
      </span>
        </template>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import request from "@/util/request";
import moment from "moment"
export default {
  name: "AmountRecordMNG",
  data(){
    return {
      operate: "",
      searchText: "",
      currentPage: 1,
      pageSize: 5,
      total: 10,
      DataList:[],
      tableData : [
      ],
      userForm:{},
      recordForm:{},
      uid:"",
      searchType: "gname",
      time: new Date(""),
    }
  },
  created() {
    this.load()
  },
  methods: {
    load(){
      if(Object.keys(this.userForm).length===0){
        this.userForm.uname=localStorage.getItem("uname")
        console.log("getUser:"+this.userForm.uname)
        //获取用户信息
        request.get("/user/getInfo/"+this.userForm.uname).then(res=>{
          if(res.code !== '0'){
            this.$message({
              type: "error",
              message: res.msg,
            })
          }else {
            this.userForm = res.data
            this.userForm.sex = String(this.userForm.sex)
            console.log("uid="+this.userForm.uid)
            let params={
              pageNumber: this.currentPage,
              pageSize: this.pageSize,
              searchText: this.searchText,
              type: this.searchType
            }
            //获取账户记录
            request.get("/account/"+this.userForm.uid,{
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
                      e.bargain=String(e.bargain)
                    }
                  })//过滤null
                })
          }
        })
      }else
        this.refresh()

    },
    refresh(){
      console.log("uid="+this.userForm.uid)
      let params={
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        searchText: this.searchText,
        type: this.searchType
      }
      //获取账户记录
      request.get("/account/"+this.userForm.uid,{
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
                e.bargain=String(e.bargain)
              }
            })//过滤null
          })
    },
    searchName(){
      this.load();
    },

    dateFormat(date){
      let time =moment(date).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
      console.log(time)
      return time
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
.AmtRecordMNG{
  margin: 10px;
}
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
.opeButton{
  margin: 10px auto 0 ;
}
.infoCard{
  float: top;
  margin: 10px;
}
.my-label {
  background: var(--el-color-success-light-9);
}
.my-content {
  background: var(--el-color-danger-light-9);
}
</style>