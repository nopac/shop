<template>
  <div class="ChargeMNG">
    <div class="opeBoard">
      <van-button type="primary" @click="load">刷新</van-button>
    </div>

    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="search"
    >
      <template #left>
        <van-dropdown-menu>
          <van-dropdown-item v-model="searchSelect" :options="options"></van-dropdown-item>
        </van-dropdown-menu>
      </template>
      <template #action>
        <div @click="search">搜索</div>
      </template>
    </van-search>

    <!--    <div class="searchBoard">-->
    <!--      <el-select v-model="searchSelect" slot="prepend" placeholder="请选择搜索对象" style="width: 100px">-->
    <!--        <el-option label="订单号" value="uid"></el-option>-->
    <!--        <el-option label="商品名" value="uname"></el-option>-->
    <!--      </el-select>-->
    <!--      <el-input v-model="searchText" placeholder="输入搜索内容" style="width: 20%" clearable>-->
    <!--      </el-input>-->
    <!--      <el-button type="primary" style="margin: 0 5px"-->
    <!--                 @click="search">查询-->
    <!--      </el-button>-->
    <!--    </div>-->

    <div>
      <van-list
          v-model:loading="loading"
          :finished="finished"
          :finished-text="end"
          @load="load">
        <van-cell v-for="item in tableData">
          <van-row>
            <van-col span="8">订单号：{{ item.oid }}</van-col>
            <van-col span="8">商品名：{{ item.gname }}</van-col>
            <van-col span="8">总金额：{{ item.sum }}元</van-col>
          </van-row>
          <van-row>
            <van-col span="16">
              <van-tag plain type="success"> 成交时间：{{ dateFormat(item.subSucTime) }}</van-tag>
            </van-col>
            <van-col span="8">手续费：{{ item.commission }}元</van-col>
          </van-row>

        </van-cell>

      </van-list>
    </div>

    <!--    <van-dialog v-model:show="changeGradeVisible" title="调整等级" @confirm="saveGrade" show-cancel-button>-->
    <!--      <el-form class="userForm demo-form-inline" :model="goodsForm" :inline="true">-->
    <!--        <el-form-item :label="gradeMes" label-width="150px">-->
    <!--          <el-input-number style="width: 100px" v-model="this.midgrade" :step="1" :max="5" :min="1" step-strictly/>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--    </van-dialog>-->


    <!--    <el-dialog-->
    <!--        v-model="addGoodsVisible"-->
    <!--        :title=goodsDialogTitle-->
    <!--        :visible.sync="addGoodsVisible"-->
    <!--        width="700px"-->
    <!--        style="margin-left: 20px"-->
    <!--    >-->

    <!--      <van-form @submit="submitUser">-->
    <!--        <van-cell-group inset>-->
    <!--          <van-field-->
    <!--              v-model="username"-->
    <!--              name="用户名"-->
    <!--              label="用户名"-->
    <!--              placeholder="用户名"-->
    <!--              :rules="[{ required: true, message: '请填写用户名' }]"-->
    <!--          />-->
    <!--          <van-field-->
    <!--              v-model="password"-->
    <!--              type="password"-->
    <!--              name="密码"-->
    <!--              label="密码"-->
    <!--              placeholder="密码"-->
    <!--              :rules="[{ required: true, message: '请填写密码' }]"-->
    <!--          />-->
    <!--        </van-cell-group>-->
    <!--        <div style="margin: 16px;">-->
    <!--          <van-button round block type="primary" native-type="submit">-->
    <!--            提交-->
    <!--          </van-button>-->
    <!--        </div>-->
    <!--      </van-form>-->

    <!--      <el-form class="userForm demo-form-inline" :model="goodsForm" :inline="true">-->
    <!--        <el-form-item label="商品名" label-width="100px">-->
    <!--          <el-input style="width: 120px" v-model="goodsForm.gname"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="商品类型" label-width="100px">-->
    <!--          <el-input style="width: 120px" v-model="goodsForm.type"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label-width="100px" label="商品价格">-->
    <!--          <el-input style="width: 120px" v-model="goodsForm.price"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label-width="100px" label="是否可议价">-->
    <!--          <el-select v-model="goodsForm.bargain" style="width: 120px">-->
    <!--            <el-option label="一口价" value="false"/>-->
    <!--            <el-option label="可议价" value="true"/>-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label-width="100px" label="库存">-->
    <!--          <el-input style="width: 200px" v-model="goodsForm.storage"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label-width="100px" label="新旧程度">-->
    <!--          <el-input style="width: 200px" v-model="goodsForm.gcondition"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label-width="100px" label="折扣">-->
    <!--          <el-input style="width: 200px" v-model="goodsForm.sale"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label-width="100px" label="商品介绍">-->
    <!--          <el-input style="width: 120px" v-model="goodsForm.introduction"/>-->
    <!--        </el-form-item>-->
    <!--        &lt;!&ndash;          后期做成列表选择&ndash;&gt;-->
    <!--        <el-form-item label-width="100px" label="卖家id">-->
    <!--          <el-input style="width: 120px" v-model="goodsForm.mid"/>-->
    <!--        </el-form-item>-->
    <!--        &lt;!&ndash;    商品图片上传&ndash;&gt;-->
    <!--        <el-form-item label-width="100px" label="商品图片">-->
    <!--          <el-upload-->
    <!--              class="upload-demo"-->
    <!--              action="https://jsonplaceholder.typicode.com/posts/"-->
    <!--              :on-preview="handlePreview"-->
    <!--              :on-remove="handleRemove"-->
    <!--              :before-remove="beforeRemove"-->
    <!--              multiple-->
    <!--              :limit="3"-->
    <!--              :on-exceed="handleExceed"-->
    <!--              :file-list="fileList"-->
    <!--          >-->
    <!--            <el-button type="primary">点击上传营业执照</el-button>-->
    <!--            <template #tip>-->
    <!--              <div class="el-upload__tip" style="width: 200px">-->
    <!--                jpg/png 文件大小需小于 500KB.-->
    <!--              </div>-->
    <!--            </template>-->
    <!--          </el-upload>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->

    <!--      <template #footer>-->
    <!--      <span class="dialog-footer">-->
    <!--        <el-button @click="addGoodsVisible = false">取消</el-button>-->
    <!--        <el-button type="primary" @click="submitUser">提交</el-button>-->
    <!--      </span>-->
    <!--      </template>-->
    <!--    </el-dialog>-->



    <!--    <div class="displayBoard">-->
    <!--      <el-table :data="tableData"-->
    <!--                border-->
    <!--                stripe-->
    <!--                @filter-change="filterStatus"-->
    <!--                style="width: 100%"-->
    <!--      >-->
    <!--        <el-table-column-->
    <!--            prop="oid"-->
    <!--            label="订单号"-->
    <!--            sortable/>-->
    <!--        <el-table-column-->
    <!--            label="商品名"-->
    <!--            prop="gname"/>-->
    <!--        <el-table-column-->
    <!--            label="成交时间"-->
    <!--            sortable>-->
    <!--          <template #default="scope">-->
    <!--            {{ dateFormat(scope.row.subSucTime) }}-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--        &lt;!&ndash;     后期添加查看密码功能 &ndash;&gt;-->
    <!--        <el-table-column-->
    <!--            label="总金额"-->
    <!--            prop="sum"/>-->
    <!--        <el-table-column-->
    <!--            label="手续费"-->
    <!--            prop="commission"/>-->
    <!--      </el-table>-->
    <!--    </div>-->
  </div>
</template>

<script>
// @ is an alias to /src
import userExpand from "@/components/UserExpand";
import request from "@/util/request";
import moment from "moment"

import {Delete} from "@element-plus/icons-vue";
import axios from "axios";

export default {
  name: "ChargeMNG",
  components: {
    userExpand,
    Delete
  },
  data() {
    return {
      statusSelect: "",
      searchText: "",
      searchSelect: "gname",
      currentPage: 1,
      pageSize: 5,
      total: 10,
      changeGradeVisible: false,
      DataList: [],
      loading: false,
      finished: false,
      end: "",
      options:[
        { text: '订单号 ', value: "oid" },
        { text: '商品名', value: "gname" },
      ],
      tableData: [],
      userForm: {
        uid: "",
        name: "",
        psw: "",
        phone: "",
        email: "",
        city: "",
        sex: "",
        bank: "",
        account: "",
        point: "",
        status: "",
        license: "",
        identity: "",
        grade: "",
        turnover: "",
        likeRate: "",
        MLikeRate: "",
      }
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
        searchText: this.searchText,
        type: this.searchSelect
      }
      console.log("搜索关键字为"+this.searchSelect)
      request.get("http://39.105.220.225:8081/shop/exmO", {
        params: params
      })
          .then(res => {
            console.log("load:" + res);
            this.total = res.data.total;
            this.tableData = res.data.records;
            this.tableData.forEach(e => {
              for (var key in e) {
                if (e[key] === "null") {
                  delete e[key];
                }
              }//过滤null
              e.iconColor = 'grey'
            })
            this.finished = true
            this.end = "共" + this.tableData.length + "条数据，已加载完毕"
          })
    },
    search() {
      this.load();
    },
    dateFormat(date) {
      let time = moment(date).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
      console.log(time)
      return time
    },
    changeGrade(row) {
      this.changeGradeVisible = true
      this.userForm = row
    },
    saveGrade() {
      console.log("save:" + this.userForm)
      request.put("http://39.105.220.225:8081/shop/orders", this.userForm).then(res => {
        console.log(res)
        this.userForm = {}
        this.changeGradeVisible = false;
        this.load();
      })

    },
    deleteUser(id) {
      //将该用户isMerchant改为0，则不显示
      console.log(id);
      request.delete("http://39.105.220.225:8081/shop/merchant", {
        params: this.userForm
      }).then(res => {
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
    handleSizeChange(val) {//改变每页的显示条数
      this.pageSize = val;
      this.load()
    },
    handleCurrentChange(val) {//改变页码
      this.currentPage = val
      this.load()
    },
    getfilterStatus() {
      let status = [
        {text: '不通过', value: -1},
        {text: '通过', value: 1},
        {text: '审核中', value: 2},]
      return status
    },
    filterStatus(filterObj) {
      if (filterObj.filterStatus.length > 0) {
        console.log(filterObj.filterStatus[0])
        let temp = this.searchSelect
        this.searchSelect = "status"
        this.searchText = filterObj.filterStatus[0]
        this.load()
        this.searchText = ""
        this.searchSelect = temp
      } else {
        this.load()
      }
    },
    deleteToRed(row) {
      row.iconColor = 'red'
    },
    deleteToGrey(row) {
      row.iconColor = 'grey'
    }
  },
  filters: {},
}
</script>

<style scoped>
.ChargeMNG {
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

.deleteIcon {
  margin-left: 8px;
}

.userForm {
  text-align: center;
}
</style>