<template>
  <div style="margin: 10px">
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


      <van-cell v-for="(item, index) in tableData" :key="item">

        <van-card
            :num="item.number"
            :price="item.price"
            :title="item.gname"
            :thumb="item.picture">
          <template #footer>
            <el-popconfirm title="确认收货吗？" @confirm="receiveGoods(item),load()">
              <template #reference>
                <el-button type="text" size="small">收货</el-button>
              </template>
            </el-popconfirm>
          </template>
        </van-card>

      </van-cell>

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
import deliveryExpand from "@/components/DeliveryExpand";

export default {
  name: "Waiting",
  components: {
    deliveryExpand,
  },
  data(){
    return{
      searchText: "",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData : [],
      baseUrl:"http://39.105.220.225:8081/shop/files/download/"
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
        status: 1,
      }
      axios.get("http://39.105.220.225:8081/shop/orders/user",{
        params: params
      })
          .then(res=>{
            console.log(res);
            this.total=res.data.data.total;
            this.tableData = res.data.data.records;
            console.log(this.tableData)

            this.tableData.forEach((item) => {
              console.log(1);
              item.operate = "";
              axios.get("http://39.105.220.225:8081/shop/goods/goodDetails", {
                params: {
                  Gid: item.gid,
                  Uid: window.localStorage.getItem("uid")
                }
              }).then(res => {
                item.picture = this.baseUrl + res.data.data.picture;
              })
            })


          })
    },
    search(){
      this.load();
    },

    receiveGoods(order){
      // console.log(order);
      axios.put("http://39.105.220.225:8081/shop/orders?status=2",order).then(res=>{

        if(res.data.code === '0'){
          Toast.success("收货成功")
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

</style>