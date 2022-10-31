<template>
  <div style="margin: 10px">
    <div class="opeBoard">
      <span style="float: left">
        <van-button size="small" type="primary" @click="load">刷新</van-button>
      </span>
        <span style="float: left">
          <van-field v-model="searchText" placeholder="输入商品名" clearable>
          </van-field>
        </span>
      <span style="float: left">
          <van-button size="small" type="primary" @click="search" style="margin-left: 20px">查询</van-button>
      </span>
    </div>

<!--    <div class="displayBoard">-->
<!--      <van-cell v-for="(item, index) in tableData" :key="item">-->
<!--        <van-card-->
<!--            :num="item.number"-->
<!--            :price="item.price"-->
<!--            :title="item.gname"-->
<!--            :thumb="item.picture">-->
<!--          <template #footer>-->
<!--            <el-popconfirm title="确认收货吗？" @confirm="receiveGoods(item),load()">-->
<!--              <template #reference>-->
<!--                <el-button type="text" size="small">收货</el-button>-->
<!--              </template>-->
<!--            </el-popconfirm>-->
<!--          </template>-->
<!--        </van-card>-->
<!--      </van-cell>-->
<!--    </div>-->

    <div class="displayBoard" style="clear: both">
      <van-pull-refresh
          v-model="refreshLoading"
          success-text="刷新成功"
          @refresh="pullRefresh"
          pulling-text="下拉即可刷新"
          style="min-height: 100vh">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="load"
            loading-text="加载中"
        >
          <van-card
              v-for="order in tableData"
              :num="order.number"
              :price="order.price"
              :title="order.gname"
              :thumb="order.picture"
          >
            <template #footer>
              <el-popconfirm title="确认收货吗？" @confirm="receiveGoods(order),load()">
                <template #reference>
                  <van-button size="small">收货</van-button>
                </template>
              </el-popconfirm>
            </template>
          </van-card>

        </van-list>
      </van-pull-refresh>
    </div>

    <!--    分页-->
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
      finished: false,
      loading: false,
      refreshLoading:false,
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
            this.finished = true;


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
      this.pullRefresh();
    },
    handleSizeChange(val) {//改变每页的显示条数
      this.pageSize = val;
      this.load()
    },
    handleCurrentChange(val) {//改变页码
      this.currentPage=val
      this.load()
    },
    //下拉刷新
    pullRefresh(){
      this.tableData=[];
      this.currentPage = 1;
      this.form = {};
      this.searchText = "";
      this.finished = false;
      this.refreshLoading = false;
      this.load();
    }


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