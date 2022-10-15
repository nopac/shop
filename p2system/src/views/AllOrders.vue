<template>
  <div class="AllOrder">
    <div class="searchBoard">
      <el-input v-model="searchText" placeholder="输入商品名" style="width: 20%" clearable>
      </el-input>
      <el-button type="primary"  style="margin: 0 5px"
                 @click="search">查询
      </el-button>
    </div>
    <div class="displayBoard">
      <van-card
          v-for="order in tableData"
          :num="order.number"
          :price="order.price"
          :title="order.gname"
          :thumb="order.picture"
          :key="key"
      >
        <template #tags >
          <div style="margin-top: 3%;margin-bottom: 3%">
            <div class="van_tag">
              <van-tag plain>商家</van-tag>
            </div>
            <div :style="'color:'+order.tag_color" class="van_tag">
              <van-tag plain>{{ tags(order) }}</van-tag>
            </div>
          </div>
        </template>
        <template #footer>
          <div style="width: 72%;margin-left: auto" :key="key">
            <div style="font-size: larger;float: left;padding: 5px">实付款 ￥{{ order.sum }}</div>
            <van-button size="small" @click="orderOperate(order)"
                        :style="{'visibility': order.operate===''?'hidden':'visible'}">{{ order.operate }}</van-button>
            <van-button size="small" v-if="order.status === 2">立即评价</van-button>
          </div>
        </template>

      </van-card>
    </div>

<!--    <el-dialog title="评价" v-model="dialogFormVisible">
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
    </el-dialog>-->

  </div>
</template>

<script>
import axios from "axios";
import {Delete} from "@element-plus/icons-vue";
import moment from "moment";

export default {
  name: "AllOrders",
  components: {
    Delete
  },
  data() {
    return {
      statusSelect: "全部",
      searchText: "",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      formTable: {
        tableData: this.tableData,
      },
      dialogFormVisible: false,
      form: {
        Gvalue: null,
        Mvalue: null,
        textarea: ""
      },
      formLabelWidth: '120px',
      order: {},
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      key:0
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      let params = {
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        searchText: this.searchText,
        uid: window.localStorage.getItem("uid"),
        status: 5,
      }
      axios.get("http://39.105.220.225:8081/shop/orders/user", {
        params: params
      })
          .then(res => {
            console.log(res);
            this.total = res.data.data.total;
            this.tableData = res.data.data.records;
            this.formTable.tableData = this.tableData;
            let that = this;
            this.tableData.forEach((item) => {
              item.operate = "";
              axios.get("http://39.105.220.225:8081/shop/goods/goodDetails", {
                params: {
                  Gid: item.gid,
                  Uid: window.localStorage.getItem("uid")
                }
              }).then(res => {
                item.picture = this.baseUrl + res.data.data.picture;
              })
              axios.get("http://39.105.220.225:8081/user/userone",{
                params:{Uid:item.mid}
              }).then(res =>{
                console.log("ddd",res);
              })
            })
          })
    },
    //搜索商品
    search() {
      this.load();
    },
    evaluateTime(order) {
      const newTime = new Date();
      const oldTime = new Date(this.time(order.sucTime));
      if (newTime - oldTime >= 24 * 60 * 60 * 1000) {
        return false;
      } else {
        return true;
      }
    },
    time(date) {
      return moment(date).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
    },

    //立即评价
    review(order) {
      this.dialogFormVisible = true
      this.order = order;
    },

    //提交评价
    submit() {
      if (this.form.Gvalue === 0 || this.form.Mvalue === 0) {
        this.$message({
          type: 'error',
          message: '请评价'
        })
        return;
      }
      let params1 = {
        star: this.form.Gvalue,
        remark: this.form.textarea,
        fromid: this.order.uid,
        toid: this.order.gid,
        type: 2,
        oid: this.order.oid
      };
      axios.post("http://39.105.220.225:8081/shop/review", params1).then(res => {
        console.log(res.data);
      })


      let params2 = {
        star: this.form.Mvalue,
        fromid: this.order.uid,
        toid: this.order.mid,
        type: 1,
        oid: this.order.oid
      };
      axios.post("http://39.105.220.225:8081/shop/review", params2).then(res => {
        console.log(res.data);
      })
      this.$message({
        type: "success",
        message: "评价成功",
      });
      this.dialogFormVisible = false;
      this.form = {};
    },

    //订单操作
    orderOperate(order){
      console.log("aaa","订单操作");
      //取消订单
      if(order.operate === "取消订单"){
        axios.delete("http://39.105.220.225:8081/shop/orders/" + order.oid).then(res => {
          if (res.data.code === '0') {
            this.$message({
              type: "success",
              message: "取消订单成功",
            });
            this.load()
          } else {
            this.$message({
              type: "error",
              message: res.msg,
            })
          }
        })
      }
      //确认收货
      else if(order.operate === "确认收货"){
        axios.put("http://39.105.220.225:8081/shop/orders?status=2", order).then(res => {

          if (res.data.code === '0') {
            this.$message({
              type: "success",
              message: "收货成功",
            });
            this.load()
          } else {
            this.$message({
              type: "error",
              message: res.msg,
            })
          }
        })
      }
      //退货
      else if(order.operate === "退货"){
        axios.put("http://39.105.220.225:8081/shop/orders?status=-1", order).then(res => {

          if (res.data.code === '0') {
            this.$message({
              type: "success",
              message: "退货成功",
            });
            this.load()
          } else {
            this.$message({
              type: "error",
              message: res.msg,
            })
          }
        })
      }
    },

    selectChange(data) {
      if (data === 5) {
        this.formTable.tableData = this.tableData;
      } else {
        this.formTable.tableData = this.tableData.filter((item) =>
            item.status === data
        );
      }
    },

    tags(order) {
      switch (order.status) {
        case 0: {
          order.tag_color = "#ED9B78";
          order.operate = "取消订单";
          return "待发货";
        }
        case 1: {
          order.tag_color = "#000000";
          order.operate = "确认收货";
          return "已发货";
        }
        case 2: {
          order.tag_color = "#409EFF";
          order.operate = "退货";
          return "已收货";
        }
        case 3: {
          order.tag_color = "#38E917";
          order.operate = "删除订单";
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
.AllOrder {
  margin: 10px;
}

.opeBoard {
  margin: 10px 0;
}

.searchBoard {
  margin: 10px 0;
}

.fixedOpe {
  width: 120px;
  text-align: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: #38E917;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.button {
  float: right;
  margin-right: 20px;
}

.van_tag {
  font-size: small;
}

</style>