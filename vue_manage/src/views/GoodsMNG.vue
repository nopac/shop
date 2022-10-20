<template>
  <div class="GoodsMNG">
    <div class="opeBoard">
      <van-row>
        <van-col offset="0" span="15">
          <div class="searchBoard">

            <van-search
                v-model="searchText"
                show-action
                label="名称"
                placeholder="请输入搜索关键词"
                @search="searchName"
            >
              <template #action>
<!--                <div @click="searchName">搜索</div>-->
<!--                <van-button type="primary" size="small" @click="searchName">搜索</van-button>-->
              </template>
            </van-search>
            <!--      <el-input v-model="searchText" placeholder="输入关键字" style="width: 20%" clearable/>-->
            <!--      <el-button type="primary" style="margin: 0 5px"-->
            <!--                 @click="searchName">查询-->
            <!--      </el-button>-->
          </div>
        </van-col>
        <van-col span="3">
          <van-button type="primary" size="mini" @click="searchName">搜索</van-button>
        </van-col>
        <van-col span="3">
          <van-button type="primary" size="mini" @click="addUser" lay>新增</van-button>
        </van-col>
        <van-col :offset="0">
          <van-button type="primary" size="mini" @click="load">刷新</van-button>
        </van-col>

      </van-row>
    </div>


    <div>
      <van-card
          v-for="order in tableData"
          :price="order.price"
          :title="order.gname"
          :thumb="baseUrl+order.picture">
        <template #desc>
          <div>
            <van-row>
              <van-col span="8">
                <div>ID: {{ order.gid }}</div>
              </van-col>
              <van-col :offset="1" span="7">
                <div>库存:{{ order.storage }}</div>
              </van-col>
              <van-col :offset="1" span="7">
                <div>新旧程度:{{ order.gcondition }}</div>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="8">
                <div>类别:{{ order.storage }}</div>
              </van-col>
              <van-col :offset="1" span="7">
                <div>好评率:{{ parseFloat(order.likeRate).toFixed(2) }}</div>
              </van-col>
              <van-col :offset="1" span="7">
                <div>尺寸:{{ order.size }}</div>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="5">
                <div>销量:{{ order.sale }}</div>
              </van-col>
              <van-col :offset="1" span="12">
                <div>是否可议价:
                  <span v-show="order.bargain === 'true'">可议价</span>
                  <span v-show="order.bargain === 'false'">一口价</span>
                </div>
              </van-col>
            </van-row>
            <van-row>
              <van-col>
                商品介绍: {{ order.introduction }}
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
                  <van-tag type="success" v-show="order.status==1">在售</van-tag>
                  <van-tag type="warning" v-show="order.status==4">下架</van-tag>
                  <van-tag type="danger" v-show="order.status==3">审核中</van-tag>
                </van-col>
              </van-row>
            </div>
          </div>
        </template>

        <template #footer>
          <div style="width: 72%;margin-left: auto">
            <van-button type="primary" size="small" @click="editUser(order)">编 辑</van-button>
            <van-button type="danger" size="small" @click="isDelete_(order)">删 除</van-button>
          </div>
        </template>
      </van-card>
    </div>

    <div>

      <van-dialog v-model:show="addGoodsVisible" :message="goodsDialogTitle" @confirm="submitUser" show-cancel-button>
        <van-form @submit="saveUser">
          <van-cell-group inset>
            <van-field
                v-model="goodsForm.gname"
                name="商品名"
                label="商品名"
                placeholder="商品名"
                :rules="[{ required: true, message: '请填写商品名' }]"
            />
            <van-field
                v-model="goodsForm.type"
                name="商品类型"
                label="商品类型"
                placeholder="商品类型"
                :rules="[{ required: true, message: '请填写商品类型' }]"
            />
            <van-field
                v-model="goodsForm.price"
                name="商品价格"
                label="商品价格"
                placeholder="商品价格"
                :rules="[{ required: true, message: '请填写商品价格' }]"
            />

<!--            <van-field name="switch" label="是否可议价">-->
<!--              <template #input>-->
<!--                <van-switch v-model="buttomClose" size="20"/>-->
<!--              </template>-->
<!--            </van-field>-->

            <van-cell center title="是否可议价">
              <template #right-icon>
                <van-switch v-model="this.buttomClose" size="24" />
              </template>
            </van-cell>

            <van-field name="stepper" label="库存">
              <template #input>
                <van-stepper v-model="goodsForm.storage"/>
              </template>
            </van-field>
            <van-field
                v-model="goodsForm.gcondition"
                name="新旧程度"
                label="新旧程度"
                placeholder="新旧程度"
                :rules="[{ required: true, message: '请填写新旧程度' }]"
            />
            <van-field
                v-model="goodsForm.sale"
                name="折扣"
                label="折扣"
                placeholder="折扣"
                :rules="[{ required: true, message: '请填写折扣' }]"
            />
            <van-field
                v-model="goodsForm.introduction"
                name="商品介绍"
                label="商品介绍"
                placeholder="商品介绍"
                :rules="[{ required: true, message: '请填写商品介绍' }]"
            />
            <van-field
                v-model="goodsForm.mid"
                name="卖家id"
                label="卖家id"
                placeholder="卖家id"
                :rules="[{ required: true, message: '请填写卖家id' }]"
            />

            <!--            <el-upload-->
            <!--                class="avatar-uploader"-->
            <!--                :action="'http://localhost:8081/user/uploadHead'"-->
            <!--                :show-file-list="false"-->
            <!--                :on-success="handleAvatarSuccess"-->
            <!--            >-->
            <!--              <img v-if="end_url" :src="end_url" class="avatar">-->
            <!--              <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--            </el-upload>-->

            <van-uploader
                v-show="this.operate=='addUser'"
                v-model="fileList"
                multiple :max-count="1"
                :action="'https://jsonplaceholder.typicode.com/posts/'"
            >
              <template #tip>
                <div class="el-upload__tip" style="width: 200px">
                  jpg/png 文件大小需小于 500KB.
                </div>
              </template>
            </van-uploader>

            <!--            <el-form-item label-width="100px" label="商品图片">-->
            <!--              <el-upload-->
            <!--                  class="upload-demo"-->
            <!--                  action="https://jsonplaceholder.typicode.com/posts/"-->
            <!--                  :on-preview="handlePreview"-->
            <!--                  :on-remove="handleRemove"-->
            <!--                  :before-remove="beforeRemove"-->
            <!--                  multiple-->
            <!--                  :limit="3"-->
            <!--                  :on-exceed="handleExceed"-->
            <!--                  :file-list="fileList"-->
            <!--              >-->
            <!--                <el-button type="primary">点击上传营业执照</el-button>-->
            <!--                <template #tip>-->
            <!--                  <div class="el-upload__tip" style="width: 200px">-->
            <!--                    jpg/png 文件大小需小于 500KB.-->
            <!--                  </div>-->
            <!--                </template>-->
            <!--              </el-upload>-->
            <!--            </el-form-item>-->

          </van-cell-group>
        </van-form>
      </van-dialog>

      <van-dialog v-model:show="isDelete" :message="deleteMessage" @confirm="deleteUser" show-cancel-button>
      </van-dialog>
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
      isDelete: false,
      goodsDialogTitle: "",
      searchText: "",
      currentPage: 1,
      pageSize: 5,
      total: 10,
      addGoodsVisible: false,
      DataList: [],
      tableData: [],
      goodsForm: {},
      buttomClose: true,
      deleteid: "",
      deleteMessage: "",
      baseUrl: "http://39.105.220.225:8081/shop/files/download/",
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

    isDelete_(order) {
      this.isDelete = true
      this.deleteid = order.gid
      this.deleteMessage = "是否删除名称为 " + order.gname + " ,ID为:" + order.gid + "的商品"
    },

    addUser() {
      this.addGoodsVisible = true;
      this.goodsForm = {};
      this.operate = "addUser";
      this.goodsDialogTitle = "新增商品"
    },
    editUser(row) {
      this.buttomClose = row.bargain
      this.goodsForm = JSON.parse(JSON.stringify(row));
      console.log("buttom测试结果"+ this.buttomClose)
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
      this.goodsForm.bargain = this.buttomClose
      this.buttomClose = false
      console.log("修改测试"+this.goodsForm.bargain)
      request.put("http://39.105.220.225:8081/shop/goods", this.goodsForm).then(res => {
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
    },
    saveUser() {
      this.goodsForm.bargain = this.buttomClose
      this.buttomClose = false
      console.log("添加测试"+this.goodsForm.bargain)
      this.goodsForm.status = 3
      request.post("http://39.105.220.225:8081/shop/goods", this.goodsForm).then(res => {
        console.log(res)
        this.addGoodsVisible = false;
        this.load();
      })
    },
    deleteUser() {
      request.delete("http://39.105.220.225:8081/shop/goods/" + this.deleteid).then(res => {
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