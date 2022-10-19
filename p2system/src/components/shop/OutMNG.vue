<template>
  <div class="OutMNG">
    <!--    <div class="opeBoard">
          <van-button type="primary" @click="refresh_bt">刷新</van-button>
        </div>-->
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
            <template #tags>
              <div style="margin-top: 3%;margin-bottom: 3%">
                <div>
                  <van-tag plain>{{ order.uid }}</van-tag>
                </div>
                <div :style="'color:'+order.tag_color">
                  <van-tag plain>{{ tags(order) }}</van-tag>
                </div>
              </div>
            </template>
            <template #footer>
              <div style="width: 72%;margin-left: auto">
                <div style="font-size: larger;float: left;padding: 5px">实付款 ￥{{ order.sum }}</div>
                <van-button size="small" @click="selectOut(order)">发货</van-button>
                <!--              <van-button size="small" @click="deleteGoods(order.gid)">删除</van-button>-->
              </div>
            </template>
          </van-card>

        </van-list>
      </van-pull-refresh>
      <van-dialog
          title="请填写商品快递单号"
          v-model:show="fillIDVisible"
          :before-close="outGoods"
          teleport="body"
      >
        <van-field v-model="ordersForm.deliverID" placeholder="填写快递单号" size="large"/>
      </van-dialog>
      <!--      <el-table :data="tableData"
                      border
                      stripe
                      style="width: 100%"
            >
              <el-table-column type="expand">
                &lt;!&ndash;        修改为自定义组件，显示其他信息&ndash;&gt;
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
              &lt;!&ndash;     后期添加查看密码功能 &ndash;&gt;
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
            </el-table>-->
    </div>
    <!--    分页-->
    <!--    <div style="margin: 10px">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>-->
    <!--    填写快递单号弹窗-->
    <!--    <div>
          <el-dialog
              v-model="fillIDVisible"
              title="请填写发货商品快递单号"
              width="700px"
              style="margin-left: 20px"
          >
            <el-form class="userForm" :model="ordersForm">
              <el-form-item class="formItem" label="订单号" label-width="100px">
                <el-input style="width: 120px" v-model="ordersForm.deliverID"/>
              </el-form-item>

            </el-form>
            <template #footer>
          <span class="dialog-footer">
            <el-button @click="fillIDVisible = false">取消</el-button>
            <el-button type="primary" @click="outGoods">提交</el-button>
          </span>
            </template>
          </el-dialog>
        </div>-->
  </div>
</template>

<script>
import ShopOutExpand from "@/components/shop/ShopOutExpand";
import request from "@/util/request";
import axios from "axios";
import {Dialog} from "vant";

export default {
  name: 'OutMNG',
  components: {
    ShopOutExpand
  },
  data() {
    return {
      operate: "",
      searchText: "",
      fillIDVisible: false,
      currentPage: 1,
      pageSize: 5,
      total: 10,
      DataList: [],
      tableData: [],
      userForm: {},
      ordersForm: {},
      uid: "",
      searchType: "",
      loading: false,
      finished: false,
      baseUrl: "http://39.105.220.225:8081/shop/files/download/",
      refreshLoading:false
    }
  },
  created() {
  },
  methods: {
    load() {
      if (Object.keys(this.userForm).length === 0) {
        this.userForm.uname = localStorage.getItem("uname")
        console.log("getUser:" + this.userForm.uname)
        request.get("http://39.105.220.225:8081/shop/user/getInfo/" + this.userForm.uname).then(res => {
          if (res.code !== '0') {
            this.$message({
              type: "error",
              message: res.msg,
            })
          } else {
            this.userForm = res.data
            this.userForm.sex = String(this.userForm.sex)
            this.refresh()
          }
        })
      } else
        this.refresh()

    },
    refresh() {
      let params = {
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        searchText: this.searchText,
        mid: window.localStorage.getItem("uid"),
        status: 0
      }
      request.get("http://39.105.220.225:8081/shop/orders/merchant", {
        params: params
      }).then(res => {
        console.log(res);
        this.total = res.data.total;
        let newDate = res.data.records;
        if (newDate === undefined || newDate.length <= 0) {
          this.finished = true;
          return;
        }
        newDate.forEach((item) => {
          axios.get("http://39.105.220.225:8081/shop/goods/goodDetails", {
            params: {
              Gid: item.gid,
              Uid: window.localStorage.getItem("uid")
            }
          }).then(res => {
            item.picture = this.baseUrl + res.data.data.picture;
            this.tableData.push(item)
          })
        })
      })
      this.currentPage++;
      this.loading = false;
    },
    selectOut(order) {
      this.ordersForm = JSON.parse(JSON.stringify(order));
      //console.log(this.ordersForm)
      this.fillIDVisible = true;
    },
    //发货
    outGoods(action) {
      if (action === "confirm") {
        request.put("http://39.105.220.225:8081/shop/orders", this.ordersForm, {
          params: {status: 1}
        }).then(res => {
          if (res.code === '0') {
            this.$message({
              type: "success",
              message: "发货成功！",
            });
            this.pullRefresh();
            this.fillIDVisible = false
            this.load()
          } else {
            this.$message({
              type: "error",
              message: res.msg,
            })
          }
        })
      }else{
        this.ordersForm = {}
      }
    },
    /*updateDeliderID() {
      request.put("http://39.105.220.225:8081/shop/orders", this.ordersForm).then(res => {
        // console.log(res)
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "更新成功",
          });
          this.addGoodsVisible = false;
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          })
        }
        this.load();
      })
    },*/
    tags(order) {
      switch (order.status) {
        case 0: {
          order.tag_color = "#ED9B78";
          return "待发货";
        }
        case 1: {
          order.tag_color = "#000000";
          return "已发货";
        }
        case 2: {
          order.tag_color = "#409EFF";
          return "已收货";
        }
        case 3: {
          order.tag_color = "#38E917";
          return "交易成功";
        }
        case -1: {
          order.tag_color = "#ED9B78";
          return "退货中";
        }
        case -2: {
          order.tag_color = "#38E917";
          return "退货成功";
        }
        case -3: {
          order.tag_color = "red";
          return "退货失败";
        }
        default: {
          order.tag_color = "#000000";
          return "全部";
        }
      }
    },
    search() {
      this.tableData = [];
      this.currentPage = 1;
      this.finished = false;
      this.load();
    },
    /*refresh_bt() {
      this.searchText = ""
      this.currentPage = 1;
      this.finished = false;
      this.tableData = [];
      this.load();
    },*/
    //下拉刷新
    pullRefresh() {
      this.searchText = ""
      this.currentPage = 1;
      this.finished = false;
      this.tableData = [];
      this.load();
      this.refreshLoading = false;
    },
  }
}
</script>

<style scoped>
@import "../../assets/css/shop-global.css";

.OutMNG {
  padding: 10px;
}

</style>