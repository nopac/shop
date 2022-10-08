<template>
  <div class="OutMNG">
    <div class="opeBoard">
      <el-button type="primary" @click="load">刷新</el-button>
    </div>
    <div class="searchBoard">
      <el-input v-model="searchText" placeholder="输入订单号" style="width: 20%" clearable/>
      <el-button type="primary" style="margin: 0 5px"
                 @click="refresh">查询</el-button>
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
            <el-descriptions border >
              <el-descriptions-item
                  label="地址"
                  label-align="center"
                  align="center"
                  label-class-name="Item"
                  width="150px">
                <span>{{ props.row.address }}</span>
              </el-descriptions-item>
            </el-descriptions>
          </template>
        </el-table-column>
        <el-table-column
            prop="oid"
            label="订单号"
            sortable />
        <!--     后期添加查看密码功能 -->
        <el-table-column
            prop="gname"
            label="商品名" />
        <el-table-column
            prop="uid"
            label="买家id" />
        <el-table-column
            prop="price"
            label="成交金额" />
        <el-table-column
            label="状态" >
          <template #default="scope">
            <span v-if="scope.row.status === -1" style="color: red;">退货中</span>
            <span v-if="scope.row.status === -2" style="color: black;">退货成功</span>
            <span v-if="scope.row.status === -3" style="color: gray;">退货失败</span>
            <span v-if="scope.row.status === 0" style="color: red;">待发货</span>
            <span v-if="scope.row.status === 1" style="color: darkgreen;">已发货</span>
            <span v-if="scope.row.status === 2" style="color: darkgreen;">已收货</span>
            <span v-if="scope.row.status === 3" style="color: dodgerblue;">交易成功</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" class="fixedOpe" width="180px">
          <template #default="scope">
            <el-button text @click="selectOut(scope.row)" type="primary" plain>发货</el-button>
            <el-popconfirm title="确认删除？" @confirm="deleteGoods(scope.row.gid)">
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
    <!--    填写快递单号弹窗-->
    <div>
      <el-dialog
          v-model="fillIDVisible"
          title="请填写发货商品快递单号"
          :visible.sync="addGoodsVisible"
          width="700px"
          style="margin-left: 20px"
      >
        <el-form class="userForm" :model="ordersForm" >
          <el-form-item class="formItem" label="订单号" label-width="100px">
            <el-input style="width: 120px" v-model="ordersForm.deliverID" />
          </el-form-item>

        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="fillIDVisible = false">取消</el-button>
        <el-button type="primary" @click="outGoods">提交</el-button>
      </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ShopOutExpand from "@/components/shop/ShopOutExpand";
import request from "@/util/request";
export default {
  name: 'OutMNG',
  components: {
    ShopOutExpand
  },
  data(){
    return {
      operate: "",
      searchText: "",
      fillIDVisible:false,
      currentPage: 1,
      pageSize: 5,
      total: 10,
      DataList:[],
      tableData : [
      ],
      userForm:{},
      ordersForm:{},
      uid:"",
      searchType: "",
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
        request.get("/user/getInfo/"+this.userForm.uname).then(res=>{
          if(res.code !== '0'){
            this.$message({
              type: "error",
              message: res.msg,
            })
          }else {
            this.userForm = res.data
            console.log("uid:"+this.userForm.uid)
            this.userForm.sex = String(this.userForm.sex)
            console.log("uid="+this.userForm.uid)
            let params={
              pageNumber: this.currentPage,
              pageSize: this.pageSize,
              searchText: this.searchText,
              type: this.searchType
            }
            console.log("uid:"+this.userForm.uid)
            request.get("/exmO/getOut/"+this.userForm.uid,{
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
      let params={
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        searchText: this.searchText,
        type: this.searchType
      }
      console.log("uid:"+this.userForm.uid)
      request.get("/exmO/getOut/"+this.userForm.uid,{
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
    selectOut(row){
      this.ordersForm = JSON.parse(JSON.stringify(row));
      console.log(this.ordersForm)
      this.fillIDVisible = true;
    },
    outGoods(){
      request.put("/exmO/out/",this.ordersForm)
          .then(res=>{
            if (res.code === '0'){
              console.log(res);
              this.ordersForm={}
              this.fillIDVisible = false;
              this.load()
            }else{
              this.$message({
                type: "error",
                message: res.msg,
              })
            }

          })
    },
    updateDeliderID(){
      request.put("/orders",this.ordersForm).then(res=>{
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
@import "../../assets/css/shop-global.css";
.OutMNG{
  padding: 10px;
}

</style>