<template>
  <div class="GoodsMNG">
    <!--<div class="opeBoard">
      <el-button type="primary" @click="addUser">新增</el-button>
      <el-button type="primary" @click="load">刷新</el-button>
    </div>
    <div class="searchBoard">
      <el-input v-model="searchText" placeholder="输入关键字" style="width: 20%" clearable/>
      <el-button type="primary" style="margin: 0 5px"
                 @click="searchName">查询
      </el-button>
    </div>-->

    <div class="searchBoard">

      <el-input v-model="searchText" placeholder="输入关键词" style="width: 100%" clearable>
      </el-input>
      <van-row justify="end">

        <van-col span="3">
          <el-button type="primary" style="margin: 0 5px"
                     @click="searchName">查询</el-button>
        </van-col>
        <van-col span="3">
          <el-button type="primary" @click="load">刷新</el-button>
        </van-col>
      </van-row>
      <van-row justify="end">
        <van-col span="3">
          <el-button type="primary"
                     @click="addUser">新增</el-button>
        </van-col>
      </van-row>
      <!--
      <van-icon name="delete-o" size="32px"/>
      -->
    </div>

    <div>
      <van-card
          v-for="order in tableData"
          :price="order.price"
          :title="order.gname"
          :thumb="order.picture">

        <template #desc>
          <div>
            <van-row>
              <van-col span="4">
                <div>ID: {{ order.gid }}</div>
              </van-col>
              <van-col :offset="1" span="5">
                <div>库存:{{ order.storage }}</div>
              </van-col>
              <van-col :offset="1" span="13">
                <div>是否可议价:
                  <span v-show="order.bargain == 'true'">可议价</span>
                  <span v-show="order.bargain == 'false'">一口价</span>
                </div>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="8">
                <div>销量:{{ order.sale }}</div>
              </van-col>
              <van-col :offset="1" span="7">
                <div>尺寸:{{ order.size }}</div>
              </van-col>
              <van-col :offset="1" span="7">
                <div>新旧程度:{{ order.gcondition }}</div>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="6">
                <div>类别:{{ order.storage }}</div>
              </van-col>
              <van-col :offset="1">
                <div>好评率:{{ order.likeRate }}</div>
              </van-col>
            </van-row>
            <van-row>
              <van-col>
                商品介绍:{{ order.introduction }}
              </van-col>
            </van-row>
          </div>
        </template>

        <template #tags>
          <div style="margin-top: 3%;margin-bottom: 3%">
            <div>
              <van-row>
                <van-col span="8">
                  <div>商品类型：</div>
                </van-col>
                <van-col>
                  <van-tag plain type="primary">{{ order.type }}</van-tag>
                </van-col>
              </van-row>
              <van-row>
                <van-col span="8">
                  <div>商品状态：</div>
                </van-col>
                <van-col>
                  <van-tag type="success">{{ order.status }}</van-tag>
                </van-col>
              </van-row>
            </div>
          </div>
        </template>

        <template #footer>
          <div style="width: 72%;margin-left: auto">
            <van-button type="primary" size="small" @click="editUser(order)">编 辑</van-button>
            <van-button type="danger" size="small">删 除</van-button>
          </div>
        </template>

      </van-card>
    </div>

    <!--    <div class="displayBoard">-->
    <!--      <el-table :data="tableData"-->
    <!--                border-->
    <!--                stripe-->
    <!--                style="width: 100%"-->
    <!--      >-->
    <!--        <el-table-column type="expand">-->
    <!--          &lt;!&ndash;        修改为自定义组件，显示其他信息&ndash;&gt;-->
    <!--          <template #default="props">-->
    <!--            <goods-expand v-bind:goods="props.row">-->
    <!--              <template v-slot:upButton>-->
    <!--                <el-button-->
    <!--                    @click="upGoods(props.row)"-->
    <!--                    type="primary" plain-->
    <!--                    class="opeButton"-->
    <!--                    v-if="props.row.status===4">发布-->
    <!--                </el-button>-->
    <!--              </template>-->
    <!--              <template v-slot:downButton>-->
    <!--                <el-button-->
    <!--                    @click="downGoods(props.row)"-->
    <!--                    type="danger" plain-->
    <!--                    class="opeButton"-->
    <!--                    v-if="props.row.status===1">下架-->
    <!--                </el-button>-->
    <!--              </template>-->
    <!--            </goods-expand>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--        <el-table-column-->
    <!--            prop="gid"-->
    <!--            label="ID"-->
    <!--            sortable/>-->
    <!--        <el-table-column-->
    <!--            prop="gname"-->
    <!--            label="商品名"-->
    <!--            sortable/>-->
    <!--        &lt;!&ndash;     后期添加查看密码功能 &ndash;&gt;-->
    <!--        <el-table-column-->
    <!--            prop="type"-->
    <!--            label="商品类型"/>-->
    <!--        <el-table-column-->
    <!--            prop="price"-->
    <!--            label="价格"/>-->
    <!--        <el-table-column-->
    <!--            prop="storage"-->
    <!--            label="库存"/>-->
    <!--        <el-table-column fixed="right" label="操作" class="fixedOpe" width="180px">-->
    <!--          <template #default="scope">-->
    <!--            <el-button text @click="editUser(scope.row)" type="primary" plain>编辑</el-button>-->
    <!--            <el-popconfirm title="确认删除？" @confirm="deleteUser(scope.row.gid)">-->
    <!--              <template #reference>-->
    <!--                <el-button text @click="" type="danger">删除</el-button>-->
    <!--              </template>-->
    <!--            </el-popconfirm>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--      </el-table>-->
    <!--    </div>-->

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
    <!--    新增商品弹窗-->
    <div>
      <van-dialog
      v-model="addGoodsVisible"
      :title="goodsDialogTitle"
      >

      </van-dialog>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import GoodsExpand from "@/components/GoodsExpand";
import request from "@/util/request";
import axios from "axios";

export default {
  name: 'GoodsMNG',
  components: {
    GoodsExpand
  },
  data() {
    return {
      operate: "",
      goodsDialogTitle: "",
      searchText: "",
      currentPage: 1,
      pageSize: 5,
      total: 10,
      addGoodsVisible: false,
      DataList: [],
      tableData: [],
      goodsForm: {},
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      let params = {
        pageNumber: this.currentPage,
        pageSize: 99999,
        searchText: this.searchText
      }
      request.get("http://39.105.220.225:8081/shop/goods/findgoods", {
        params: params
      }).then(res => {
        console.log(res);
        this.total = res.data.total;
        this.tableData = res.data.records;
        this.tableData.forEach(e => {
          e.picture = "http://39.105.220.225:8081/shop/files/download/"+e.picture
          for (var key in e) {
            if (e[key] === "null") {
              delete e[key];
            }
            e.bargain = String(e.bargain)
          }
        })//过滤null
      })
    },
    searchName() {
      this.load();
    },
    addUser() {
      this.addGoodsVisible = true;
      this.goodsForm = {};
      this.operate = "addUser";
      this.goodsDialogTitle = "新增商品"
    },
    editUser(row) {
      this.goodsForm = JSON.parse(JSON.stringify(row));
      console.log(this.goodsForm)
      this.addGoodsVisible = true;
      this.operate = "updateUser"
      this.goodsDialogTitle = "编辑商品"
    },
    submitUser() {
      if (this.operate === "addUser") {
        this.saveUser();
      } else if (this.operate === "updateUser") {
        this.updateUser();
      }
    },
    updateUser() {
      request.put("http://39.105.220.225:8081/shop/goods", this.goodsForm).then(res => {
        // console.log(res)
        if (res.data.code === '0') {
          this.$message({
            type: "success",
            message: "更新成功",
          });
          this.addGoodsVisible = false;
        } else {
          this.$message({
            type: "error",
            message: res.data.msg,
          })
        }
        this.load();
      })
    },
    saveUser() {
      this.goodsForm.status = 3
      request.post("http://39.105.220.225:8081/shop/goods", this.goodsForm).then(res => {
        console.log(res)
        this.addGoodsVisible = false;
        this.load();
      })
    },
    deleteUser(id) {
      console.log(id);
      request.delete("http://39.105.220.225:8081/shop/goods/" + id).then(res => {

        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.load()
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          })
        }
      })
    },
    upGoods(row) {
      this.goodsForm = JSON.parse(JSON.stringify(row));
      console.log(this.goodsForm)
      request.put("http://39.105.220.225:8081/shop/exmG/opeStatus/" + 3, this.goodsForm).then(res => {
        console.log(res)
        this.goodsForm = {}
        this.addGoodsVisible = false;
        this.load();
      })
    },
    downGoods(row) {//下架商品
      this.goodsForm = JSON.parse(JSON.stringify(row));
      console.log(this.goodsForm)
      request.put("http://39.105.220.225:8081/shop/exmG/opeStatus/" + 4, this.goodsForm).then(res => {
        console.log(res)
        this.goodsForm = {}
        this.addGoodsVisible = false;
        this.load();
      })
    },
    handleSizeChange(val) {//改变每页的显示条数
      this.pageSize = val;
      this.load()
    },
    handleCurrentChange(val) {//改变页码
      this.currentPage = val
      this.load()
    },
  }
}
</script>
<style scoped>
.GoodsMNG {
  padding: 10px;
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

.userForm {
  width: 80%;
  display: block;
  margin: 0 55px;
  /*text-align: center;*/
}

.formItem {
  display: inline-flex;
  width: 250px;
}
</style>