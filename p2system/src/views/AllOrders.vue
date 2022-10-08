<template>
  <div class="AllOrder">
    <div class="opeBoard">
      <el-button type="primary" @click="load">刷新</el-button>
    </div>
    <div class="searchBoard">
      <el-input v-model="searchText" placeholder="输入商品名" style="width: 20%" clearable>
      </el-input>
      <el-button type="primary" style="margin: 0 5px"
                 @click="search">查询</el-button>
    </div>
    <div class="displayBoard">
      <el-table :data="formTable.tableData"
                border
                stripe
                style="width: 100%"
      >
        <el-table-column type="expand">
          <!--        修改为自定义组件，显示其他信息-->
          <template #default="props">
            <deliveryExpand v-bind:order="props.row" />
          </template>
        </el-table-column>
        <el-table-column
            prop="gname"
            label="商品" />
        <el-table-column
            prop="price"
            label="单价" />
        <el-table-column
            prop="number"
            label="数量" />
        <el-table-column
            prop="sum"
            label="实付款" />
        <el-table-column
            fixed="right"
            label="状态"
            class="fixedOpe"
            width="180px"
            column-key="filterStatus">
          <template #header="scope">
            <el-select
                v-model="statusSelect"
                slot="prepend"
                @change="selectChange"
            >
              <el-option label="全部" value="5"></el-option>
              <el-option label="待发货" value="0"></el-option>
              <el-option label="待收货" value="1"></el-option>
              <el-option label="已收货" value="2"></el-option>
              <el-option label="交易成功" value="3"></el-option>
              <el-option label="退货中" value="-1"></el-option>
              <el-option label="退货成功" value="-2"></el-option>
              <el-option label="退货失败" value="-3"></el-option>
            </el-select>
          </template>
          <template #default="scope">
            <span v-if="scope.row.status === 0" style="line-height: 32px">
              待发货
              <el-popconfirm title="确认取消？" @confirm="deleteGoods(scope.row.oid)">
                <template #reference>
                  <el-button text type="danger" class="button">取消订单</el-button>
                </template>
              </el-popconfirm>
            </span>
            <span v-if="scope.row.status === 1" style="line-height: 32px">
              待收货
              <el-popconfirm title="确认收货？" @confirm="receiveGoods(scope.row)">
                <template #reference>
                  <el-button text type="danger" class="button">收货</el-button>
                </template>
              </el-popconfirm>
            </span>
            <span v-if="scope.row.status === 2" style="line-height: 32px">
              已收货

            <el-button text type="primary" @click="review(scope.row)" class="button">评价</el-button>
              <el-popconfirm title="确认退货？" @confirm="returnGoods(scope.row)">
                <template #reference>
                  <el-button text type="danger" class="button" v-if="evaluateTime(scope.row)">退货</el-button>
                </template>
              </el-popconfirm>
            </span>
            <span v-if="scope.row.status === 3" style="color: limegreen;line-height: 32px">
              交易成功
            </span>
            <span v-if="scope.row.status === -1" style="color: red">退货中</span>
            <span v-if="scope.row.status === -2" style="color: red">退货成功</span>
            <span v-if="scope.row.status === -3" style="color: red">退货失败</span>
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
        <el-form-item label="商品评价" :label-width="formLabelWidth">
          <el-rate
              v-model="form.Gvalue"
              :colors="colors"
              style="margin-top: 10px">
          </el-rate>
        </el-form-item>
        <el-form-item label="商家评价" :label-width="formLabelWidth">
          <el-rate
              v-model="form.Mvalue"
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
import axios from "axios";
import deliveryExpand from "@/components/DeliveryExpand";
import {Delete} from "@element-plus/icons-vue";
import moment from "moment";

export default {
  name: "AllOrders",
  components: {
    deliveryExpand,
    Delete
  },
  data(){
    return{
      statusSelect: "全部",
      searchText: "",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData : [],
      formTable: {
        tableData: this.tableData,
      },
      dialogFormVisible: false,
      form:{
        Gvalue: null,
        Mvalue: null,
        textarea: ""
      },
      formLabelWidth: '120px',
      order:{},

      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      let params={
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        searchText: this.searchText,
        uid:window.localStorage.getItem("uid"),
        status: 5,
      }
      axios.get("http://localhost:9090/orders/user",{
        params: params
      })
          .then(res=>{
            console.log(res);
            this.total=res.data.data.total;
            this.tableData = res.data.data.records;
            console.log(this.tableData)
            this.formTable.tableData = this.tableData;
          })
    },
    search(){
      this.load();
    },
    evaluateTime(order){
      const newTime = new Date();
      const oldTime = new Date(this.time(order.sucTime));
      if (newTime-oldTime>=24*60*60*1000){
        return false;
      }else{
        return true;
      }
    },
    time(date){
      return moment(date).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
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
        star: this.form.Gvalue,
        remark: this.form.textarea,
        fromid:this.order.uid,
        toid:this.order.gid,
        type:2,
        oid:this.order.oid
      };
      axios.post("http://localhost:9090/review",params1).then(res=>{
        console.log(res.data);
      })


      let params2={
        star: this.form.Mvalue,
        fromid:this.order.uid,
        toid:this.order.mid,
        type:1,
        oid:this.order.oid
      };
      axios.post("http://localhost:9090/review",params2).then(res=>{
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

    selectChange(data){
      if (data==5){
        this.formTable.tableData = this.tableData;
      }else{
        this.formTable.tableData = this.tableData.filter((item) =>
            item.status == data
        );
      }
    },
    deleteGoods(id){
      console.log(id);
      axios.delete("http://localhost:9090/orders/"+id).then(res=>{

        if(res.data.code === '0'){
          this.$message({
            type:"success",
            message: "取消订单成功",
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
    receiveGoods(order){
      axios.put("http://localhost:9090/orders?status=2",order).then(res=>{

        if(res.data.code === '0'){
          this.$message({
            type:"success",
            message: "收货成功",
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
    returnGoods(order){
      axios.put("http://localhost:9090/orders?status=-1",order).then(res=>{

        if(res.data.code === '0'){
          this.$message({
            type:"success",
            message: "退货成功",
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
  }
}
</script>

<style scoped>
.AllOrder{
  margin: 10px;
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
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.button{
  float: right;
  margin-right: 20px;
}

</style>