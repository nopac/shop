<template>
  <div class="ShopOrderMNG Contain">
    <div class="opeBoard">
      <el-button type="primary" @click="load">刷新</el-button>
    </div>
    <div class="searchBoard">
      <el-input v-model="searchText" placeholder="输入订单号" style="width: 20%" clearable/>
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
            <el-button text @click="review(scope.row)" type="primary" plain>评价</el-button>
            <el-popconfirm title="确认删除？" @confirm="deleteOrder(scope.row.gid)">
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

    <el-dialog title="评价" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户评价" :label-width="formLabelWidth">
          <el-rate
              v-model="form.Uvalue"
              :colors="colors">
          </el-rate>
        </el-form-item>
        <el-form-item label="评价描述" :label-width="formLabelWidth">
          <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入评价内容"
              style="margin-right: 50px"
              v-model="form.textarea">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ShopOutExpand from "@/components/shop/ShopOutExpand";
import request from "@/util/request";
import axios from "axios";

export default {
  name: "ShopOrderMNG",
  components: {
    ShopOutExpand
  },
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
      ordersForm:{},
      form:{
        Uvalue: null,
        textarea: ""
      },
      formLabelWidth: '120px',
      order:{},
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      uid:"",
      searchType: "",
      dialogFormVisible: false,
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
            request.get("/exmO/getOrder/"+this.userForm.uid,{
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
      request.get("/exmG/findFor/"+this.userForm.uid,{
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
    editOrder(row){
      this.ordersForm = JSON.parse(JSON.stringify(row));
      console.log(this.ordersForm)
      this.addGoodsVisible = true;
    },
    deleteGoods(id){
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
    review(order){
      this.dialogFormVisible = true
      this.order = order;
    },

    submit(){
      if (this.form.Gvalue==0||this.form.Mvalue==0){
        this.$message({
          type:'error',
          message: '请评价'
        })
        return;
      }
      let params1={
        star: this.form.Uvalue,
        remark: this.form.textarea,
        fromid:this.order.mid,
        toid:this.order.uid,
        type:3,
        oid:this.order.oid
      };
      axios.post("http://localhost:9090/review",params1).then(res=>{
        console.log(res.data);
      })
      this.$message({
        type:"success",
        message: "评价成功",
      });
      this.dialogFormVisible=false;
      this.form={};
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
.ShopOrderMNG{
  padding: 10px;
}
</style>