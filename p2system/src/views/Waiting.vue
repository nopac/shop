<template>
  <div class="waiting" style="margin: 10px">

    <div class="searchBoard">
      <van-cell-group inset>
        <van-field
            v-model="searchText"
            center
            clearable
            placeholder="输入商品名">
          <template #button>
            <van-button size="small" type="primary" @click="search">查询</van-button>
          </template>
        </van-field>
      </van-cell-group>
    </div>


<!--    <div class="displayBoard">-->
<!--      <van-cell v-for="(item, index) in tableData" :key="item">-->
<!--          <van-card-->
<!--              :num="item.number"-->
<!--              :price="item.price"-->
<!--              :title="item.gname"-->
<!--              :thumb="item.picture">-->
<!--            <template #footer>-->
<!--              <el-popconfirm title="确认取消订单吗？" @confirm="deleteGoods(item.oid),load()">-->
<!--                <template #reference>-->
<!--                  <van-button size="small">取消订单</van-button>-->
<!--                </template>-->
<!--              </el-popconfirm>-->
<!--            </template>-->
<!--          </van-card>-->
<!--      </van-cell>-->
<!--    </div>-->

    <div class="displayBoard">
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
              <el-popconfirm title="确认取消订单吗？" @confirm="deleteGoods(order.oid),load()">
                <template #reference>
                  <van-button size="small">取消订单</van-button>
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
import {Delete} from "@element-plus/icons-vue";
import {Toast} from "vant";

export default {
  name: "Waiting",
  components: {
    deliveryExpand,
    Delete
  },
  data(){
    return{
      finished: false,
      loading: false,
      refreshLoading:false,
      statusSelect: "",
      searchText: "",
      searchSelect: "gname",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      DataList:[],
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
        status: 0,
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

    //下拉刷新
    pullRefresh(){
      this.tableData=[];
      this.currentPage = 1;
      this.form = {};
      this.searchText = "";
      this.finished = false;
      this.refreshLoading = false;
      this.load();
    },

    deleteGoods(id){
      console.log(id);
      axios.delete("http://39.105.220.225:8081/shop/orders/"+id).then(res=>{

        if(res.data.code === '0'){
          Toast.success("取消订单成功")
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