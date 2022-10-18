<template>
  <div class="ShopOrderMNG Contain">
    <div class="opeBoard">
      <el-button type="primary" @click="load">刷新</el-button>
    </div>
    <div class="searchBoard">
      <van-cell-group inset>
        <van-field
            v-model="searchText"
            center
            clearable
            placeholder="输入订单号">
          <template #button>
            <van-button size="small" type="primary" @click="search">查询</van-button>
          </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="displayBoard">
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
              <van-button size="small" v-if="order.status === 2" @click="review(order)">立即评价</van-button>
              <van-button size="small" @click="deleteGoods(order.gid)">删除</van-button>
            </div>
          </template>
        </van-card>

      </van-list>
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
                  <el-button text @click="review(scope.row)" type="primary" plain>评价</el-button>
                  <el-popconfirm title="确认删除？" @confirm="deleteOrder(scope.row.gid)">
                    <template #reference>
                      <el-button text @click="" type="danger">删除</el-button>
                    </template>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>-->
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

      <!--    <el-dialog title="评价" v-model="dialogFormVisible">
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
          </el-dialog>-->
    </div>
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
  data() {
    return {
      operate: "",
      searchText: "",
      currentPage: 1,
      pageSize: 5,
      total: 10,
      DataList: [],
      tableData: [],
      userForm: {},
      ordersForm: {},
      form: {
        Uvalue: null,
        textarea: ""
      },
      formLabelWidth: '120px',
      order: {},
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      uid: "",
      searchType: "",
      dialogFormVisible: false,
      loading: false,
      finished: false,
      baseUrl: "http://39.105.220.225:8081/shop/files/download/",
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
            console.log("getInfo", res);
            this.userForm = res.data
            this.userForm.sex = String(this.userForm.sex)
            console.log("uid=" + this.userForm.uid)
            this.refresh()
          }
        })
      } else {
        this.refresh()
      }
    },
    refresh() {
      let params = {
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        searchText: this.searchText,
        type: this.searchType
      }
      request.get("http://39.105.220.225:8081/shop/exmG/findFor/" + this.userForm.uid, {
        params: params
      }).then(res => {
        console.log(res);
        this.total = res.data.total;
        let newDate = res.data.records;
        console.log("第" + this.currentPage + "次获得数据", res);
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
        /*newDate.forEach(e => {
          for (var key in e) {
            if (e[key] === "null") {
              delete e[key];
            }
            e.bargain = String(e.bargain)
          }
        })//过滤null*/
      })
      this.currentPage++;
      this.loading=false;
    },
    search() {
      this.tableData = [];
      this.currentPage = 1;
      this.load();
    },
    editOrder(row) {
      this.ordersForm = JSON.parse(JSON.stringify(row));
      console.log(this.ordersForm)
      this.addGoodsVisible = true;
    },
    deleteGoods(id) {
      request.delete("http://39.105.220.225:8081/shop/goods/" + id).then(res => {

        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.tableData = [];
          this.currentPage = 1;
          this.load()
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          })
        }
      })
    },
    review(order) {
      this.dialogFormVisible = true
      this.order = order;
    },

    submit() {
      if (this.form.Gvalue === 0 || this.form.Mvalue === 0) {
        this.$message({
          type: 'error',
          message: '请评价'
        })
        return;
      }
      let params1 = {
        star: this.form.Uvalue,
        remark: this.form.textarea,
        fromid: this.order.mid,
        toid: this.order.uid,
        type: 3,
        oid: this.order.oid
      };
      axios.post("http://39.105.220.225:8081/shop/review", params1).then(res => {
        console.log(res.data);
      })
      this.$message({
        type: "success",
        message: "评价成功",
      });
      this.dialogFormVisible = false;
      this.form = {};
    },
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
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/shop-global.css";

.ShopOrderMNG {
  padding: 10px;
}
</style>