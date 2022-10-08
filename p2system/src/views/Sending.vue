<template>
  <div class="waiting"  style="margin: 10px">
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
      <el-table :data="tableData"
                border
                stripe
                style="width: 100%"
      >
        <el-table-column
            label="时间" >
          <template #default="scope">
            {{ time(scope.row.subTime) }}
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
            prop="address"
            label="地址" />
        <el-table-column fixed="right" label="操作" class="fixedOpe" width="180px">
          <template #default="scope">
<!--            <el-popconfirm title="确认取消？" @confirm="deleteGoods(scope.row.oid)">-->
<!--              <template #reference>-->
                <el-button text type="danger" @click="sendDelivery(scope.row)">发货</el-button>
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
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Sending",
  data(){
    return{
      statusSelect: "",
      searchText: "",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      DataList:[],
      tableData : [],
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
        mid:'2',
        status: 0,
      }
      axios.get("http://localhost:9090/orders/merchant",{
        params: params
      }).then(res=>{
            console.log(res);
            this.total=res.data.data.total;
            this.tableData = res.data.data.records;
            console.log(this.tableData)
          })
    },
    search(){
      this.load();
    },
    handleSizeChange(val) {//改变每页的显示条数
      this.pageSize = val;
      this.load()
    },
    handleCurrentChange(val) {//改变页码
      this.currentPage=val
      this.load()
    },
    sendDelivery(order){
      axios.put("http://localhost:9090/orders?status=1",order).then(res=>{
        console.log(res.data);

      })
      this.load();
    },
    time(date){
      return moment(date).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style scoped>

</style>