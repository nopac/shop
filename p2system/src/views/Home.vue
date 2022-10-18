<template>
  <div>
    <div class="topNavBoard"
         style="float: top;height: 3rem;width: 10rem;margin: auto;padding: 20px">

      <van-row>
        <van-col offset="12" span="12">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value" :options="options"
                               @change="selectChange"/>
          </van-dropdown-menu>
        </van-col>
      </van-row>
      <van-row>
        <van-col offset="12" span="12">
          <!--          搜索区域-->
          <van-field
              v-model="search"
              center
              clearable
              placeholder="请输入想要搜索的商品名称">
            <template #button>
              <van-button size="small" type="primary" @click="loadGoods">查询</van-button>
            </template>
          </van-field>
        </van-col>
      </van-row>

    </div>

    <el-row>
      <el-col
          v-for="(value, o, index) in totalData"
          :key="o"
          :span="10"
          :offset="index > 0 ? total : 0"
          style="margin: 10px;flex: 0"
      >
<!--        <router-link :to="{name:'goodDetailsLayout', query: {gid: value.gid}}">-->
          <el-card :body-style="{ padding: '0px' }" style="width: 150px; margin: 0 10px;cursor: pointer" @click="gotoDetail(value)">
            <el-image class="imageArea"
                      style="width: 150px;height: 150px;"
                      :src="value.picture">
              <template #error>
                <div class="image-slot" style="text-align: center;">
                  图片未上传
                </div>
              </template>
            </el-image>
            <div style="padding: 14px">
              <span>{{ value.gname }}</span>

              <span style="float: right;font-size: 20px">￥{{ value.price }}</span>

              <div class="bottom">
                <span style="color: gray;font-size: 10px">好评率：{{ value.likeRate }}</span>
                <el-button text class="button" style="color: red;padding: 0" @click="addCart(value)">加入购物车</el-button>
              </div>
            </div>
          </el-card>
<!--        </router-link>-->

      </el-col>
    </el-row>
  </div>
  <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 40]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="float: right;margin-right: 50px"
  />
</template>

<script>
import '@/assets/css/Home.css'
import { ref } from 'vue'
import axios from "axios";
import {NavBar,Icon,Search,DropdownMenu, DropdownItem} from 'vant'

export default {
  name: 'Home',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Search.name]: Search,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  data(){
    return{
      total: 0,
      currentPage: 1,
      pageSize: 10,
      search: "",
      totalData: [],
      value: 0,
      options : [
       {
          value: 0,
          text: '系统推荐',
        },
        {
          value: 1,
          text: '好评率',
        },
        {
          value: 2,
          text: '价格从高到低',
        },
        {
          value: 3,
          text: '价格从低到高',
        },
      ],
      baseURL:"http://39.105.220.225:8081/shop/files/download/",
    }
  },
  created() {
    this.loadGoods();
  },
  methods:{
    loadGoods(){
      axios.get("http://39.105.220.225:8081/shop/goods", {
        params:{
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search,
          sort: this.value,
        }
      }).then(res => {
        console.log(res)
        this.totalData = res.data.data.records
        this.total = res.data.data.total
        this.totalData.forEach((item,index)=>{
          item.picture = this.baseURL+item.picture;
          let lR = item.likeRate;
          //好评率保留两位小数点
          lR = parseFloat(lR).toFixed(2)
          item.likeRate = lR
        })
      })
    },

    selectChange(val){
      this.loadGoods();
      console.log(val);
    },
    addCart(value) {
      axios.post("http://39.105.220.225:8081/shop/cart", {
        uid: window.localStorage.getItem("uid"),//用户名！！！
        gid: value.gid,
        number: 1,
        price: value.price,
        gname: value.gname,
      }).then(res => {
        console.log(res)
        if(res.data.code === '0'){
          this.$message({
            message:'成功加入购物车',
            type:"success"
          })
        }else {
          this.$message({
            message: res.data.msg,
            type:"error"
          });
        }

      })
    },
    gotoDetail(value){
      this.$router.push({name:'goodDetailsLayout', query: {gid: value.gid}});
    }
  },

  computed:{

  }
}

</script>

<style scoped>
.topNavBoard{
  float: top;
  height: 3rem;
  width: 10rem;
  margin: auto;
  padding: 20px
}
.m-2{
  float: left;
  /*width: 2rem*/
}
.searchBoard {
  margin: 10px 0;
}
</style>