<template>
  <div class="MerchantMNG">

    <!--    <div class="searchBoard">-->
    <!--      <van-search-->
    <!--          v-model="searchText"-->
    <!--          show-action-->
    <!--          placeholder="请输入搜索关键词"-->
    <!--          @search="search"-->
    <!--      >-->
    <!--        <template #left>-->
    <!--          <van-dropdown-menu>-->
    <!--            <van-dropdown-item v-model="searchSelect" :options="options"></van-dropdown-item>-->
    <!--          </van-dropdown-menu>-->
    <!--        </template>-->
    <!--        <template #action>-->
    <!--          <div @click="search">搜索</div>-->
    <!--          <van-button type="primary" size="mini" @click="load">刷新</van-button>-->
    <!--&lt;!&ndash;          <div class="opeBoard">&ndash;&gt;-->
    <!--&lt;!&ndash;            &ndash;&gt;-->
    <!--&lt;!&ndash;          </div>&ndash;&gt;-->
    <!--        </template>-->
    <!--      </van-search>-->
    <!--      &lt;!&ndash;      <el-select v-model="searchSelect" slot="prepend" placeholder="请选择搜索对象" style="width: 100px">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <el-option label="ID" value="uid"></el-option>&ndash;&gt;-->
    <!--      &lt;!&ndash;        <el-option label="姓名" value="uname"></el-option>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </el-select>&ndash;&gt;-->
    <!--      &lt;!&ndash;      <el-input v-model="searchText" placeholder="输入搜索内容" style="width: 20%" clearable>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </el-input>&ndash;&gt;-->
    <!--      &lt;!&ndash;      <el-button type="primary" style="margin: 0 5px"&ndash;&gt;-->
    <!--      &lt;!&ndash;                 @click="search">查询&ndash;&gt;-->
    <!--      &lt;!&ndash;      </el-button>&ndash;&gt;-->
    <!--    </div>-->

    <div>
      <van-row>
        <van-col span="18">
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
        </van-col>
        <van-col offset="1">
          <van-button type="primary" @click="load">刷新</van-button>
        </van-col>
      </van-row>
    </div>


    <div>
      <van-list
          v-model:loading="loading"
          :finished="finished"
          :finished-text="end"
          @load="load">
        <van-cell v-for="item in tableData">
          <van-row>
            <van-col span="8">姓名: {{ item.uname }}</van-col>
            <van-col span="8">ID: {{ item.uid }}</van-col>
            <van-col span="8">营业额: {{ item.turnover }}</van-col>
          </van-row>
          <van-row>
            <van-col span="8">商家等级: {{ item.grade }}</van-col>
            <van-col span="8">好评率: {{ item.mlikeRate }}</van-col>
          </van-row>
          <!--          <van-row>-->
          <!--            <van-col span="6">-->
          <!--              <div>身份证:</div>-->
          <!--            </van-col>-->
          <!--            <van-col>-->
          <!--              <van-image-->
          <!--                  style="width: 100px;height: 100px"-->
          <!--                  :src="item.identity">-->
          <!--                &lt;!&ndash;                :src="this.baseURL+item.identity"&ndash;&gt;-->
          <!--              </van-image>-->
          <!--            </van-col>-->
          <!--          </van-row>-->
          <!--          <van-row>-->
          <!--            <van-col span="6">营业执照:</van-col>-->
          <!--            <van-col>-->
          <!--              <van-image-->
          <!--                  style="width: 100px;height: 100px"-->
          <!--                  :src="item.license">-->
          <!--                &lt;!&ndash;                :src="this.baseURL+item.identity"&ndash;&gt;-->
          <!--              </van-image>-->
          <!--            </van-col>-->
          <!--          </van-row>-->
          <van-row>
            <van-col :offset="12" span="6">
              <van-button type="primary" size="small" @click="changeGrade(item)">调整等级</van-button>
            </van-col>
            <van-col :offset="1" span="4">
              <van-button type="danger" size="small" @click="goDelete(item)">删除</van-button>
            </van-col>
          </van-row>
        </van-cell>
      </van-list>
    </div>

    <!--    <div class="displayBoard">-->
    <!--      <el-table :data="tableData"-->
    <!--          border-->
    <!--          stripe-->
    <!--          style="width: 100%"-->
    <!--      >-->
    <!--        <el-table-column type="expand">-->
    <!--          &lt;!&ndash;        修改为自定义组件，显示其他信息&ndash;&gt;-->
    <!--          <template #default="props">-->
    <!--            <goods-expand v-bind:goods="props.row" >-->
    <!--              <template v-slot:upButton>-->
    <!--                <el-button-->
    <!--                    @click="upGoods(props.row)"-->
    <!--                    type="primary" plain-->
    <!--                    class="opeButton"-->
    <!--                    v-if="props.row.status===4">发布</el-button>-->
    <!--              </template>-->
    <!--              <template v-slot:downButton>-->
    <!--                <el-button-->
    <!--                    @click="downGoods(props.row)"-->
    <!--                    type="danger" plain-->
    <!--                    class="opeButton"-->
    <!--                    v-if="props.row.status===1">下架</el-button>-->
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
    <!--            sortable />-->
    <!--        &lt;!&ndash;     后期添加查看密码功能 &ndash;&gt;-->
    <!--        <el-table-column-->
    <!--            prop="type"-->
    <!--            label="商品类型" />-->
    <!--        <el-table-column-->
    <!--            prop="price"-->
    <!--            label="价格" />-->
    <!--        <el-table-column-->
    <!--            prop="storage"-->
    <!--            label="库存" />-->
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


    <!--        <div class="displayBoard">-->
    <!--          <el-table :data="tableData"-->
    <!--                    border-->
    <!--                    stripe-->
    <!--                    @filter-change="filterStatus"-->
    <!--                    style="width: 100%"-->
    <!--          >-->
    <!--            <el-table-column type="expand">-->
    <!--              &lt;!&ndash;        修改为自定义组件，显示其他信息&ndash;&gt;-->
    <!--              <template #default="props">-->
    <!--                <merchant-expand v-bind:user="props.row"/>-->
    <!--              </template>-->
    <!--            </el-table-column>-->
    <!--            <el-table-column-->
    <!--                prop="uid"-->
    <!--                label="ID"-->
    <!--                sortable/>-->
    <!--            <el-table-column-->
    <!--                prop="uname"-->
    <!--                label="姓名"-->
    <!--                sortable/>-->
    <!--            &lt;!&ndash;     后期添加查看密码功能 &ndash;&gt;-->
    <!--            <el-table-column-->
    <!--                label="营业额"-->
    <!--                prop="turnover"/>-->
    <!--            <el-table-column-->
    <!--                label="商家等级"-->
    <!--                prop="grade"/>-->
    <!--            <el-table-column-->
    <!--                label="好评率"-->
    <!--                prop="mlikeRate"/>-->
    <!--            <el-table-column fixed="right" label="操作" class="fixedOpe" width="180px">-->
    <!--              <template #default="scope">-->
    <!--                <el-button text @click="changeGrade(scope.row)" type="primary" plain>调整等级</el-button>-->
    <!--                <el-popconfirm title="确认删除？" @confirm="deleteUser(scope.row)">-->
    <!--                  <template #reference>-->
    <!--                    <el-icon-->
    <!--                        @mouseover="deleteToRed(scope.row)"-->
    <!--                        @mouseout="deleteToGrey(scope.row)"-->
    <!--                        :style="{color:scope.row.iconColor}"-->
    <!--                        class="deleteIcon"-->
    <!--                        slot="suffix">-->
    <!--                      <Delete/>-->
    <!--                    </el-icon>-->
    <!--                  </template>-->
    <!--                </el-popconfirm>-->
    <!--              </template>-->
    <!--            </el-table-column>-->
    <!--          </el-table>-->
    <!--        </div>-->
    <!--    分页-->

    <!--    修改商家等级弹窗-->
    <van-dialog v-model:show="changeGradeVisible" title="调整等级" @confirm="saveGrade" show-cancel-button>
      <el-form class="userForm demo-form-inline" :model="goodsForm" :inline="true">
        <el-form-item :label="gradeMes" label-width="150px">
          <el-input-number style="width: 100px" v-model="this.midgrade" :step="1" :max="5" :min="1" step-strictly/>
        </el-form-item>
      </el-form>
    </van-dialog>

    <van-dialog v-model:show="isDelete" :message="deleteMessage" @confirm="deleteUser" show-cancel-button>
    </van-dialog>

  </div>
</template>

<script>
// @ is an alias to /src
import MerchantExpand from "@/components/MerchantExpand";
import request from "@/util/request";

import {Delete} from "@element-plus/icons-vue";
import axios from "axios";

export default {
  name: "MerchantMNG",
  components: {
    Delete, MerchantExpand
  },
  data() {
    return {
      statusSelect: "",
      searchText: "",
      searchSelect: "uname",
      currentPage: 1,
      pageSize: 5,
      total: 10,
      changeGradeVisible: false,
      isDelete: false,
      DataList: [],
      tableData: [],
      options: [
        {text: 'ID ', value: "uid"},
        {text: '姓名', value: "uname"},
      ],
      gradeMes: "",
      baseUrl: "http://39.105.220.225:8081/shop/files/download/",
      midgrade: 0,
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
      },
      loading: false,
      finished: false,
      deleteMessage: "",
      end: ""
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
      request.get("http://39.105.220.225:8081/shop/merchant", {
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
              e.license = "http://39.105.220.225:8081/shop/files/download/" + e.license
            })
            this.finished = true
            this.end = "共" + this.tableData.length + "条数据，已加载完毕"
          })
    },
    search() {
      this.load();
    },
    changeGrade(row) {
      console.log("执行了点击方法" + row.uid)
      this.changeGradeVisible = true
      this.userForm = row
      this.midgrade = row.grade
      this.gradeMes = "调整" + row.uname + "的等级为"
    },
    goDelete(item) {
      this.isDelete = true
      this.userForm = item
      this.deleteMessage = "是否删除姓名为 " + item.uname + " ,ID为:" + item.uid + "的用户"
    },
    saveGrade() {
      console.log("执行了弹窗保存方法:" + this.userForm)
      this.userForm.grade = this.midgrade
      request.put("http://39.105.220.225:8081/shop/merchant/grade/" + this.userForm.grade, this.userForm).then(res => {
        console.log(res)
        this.userForm = {}
        this.changeGradeVisible = false;
        this.load();
      })

    },
    deleteUser() {
      //将该用户isMerchant改为0，则不显示
      request.put("http://39.105.220.225:8081/shop/merchant", this.userForm).then(res => {
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
    },
    onLoad() {
    }
  },
  filters: {},
}
</script>

<style scoped>
.MerchantMNG {
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