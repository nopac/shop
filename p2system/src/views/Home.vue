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
    <div class="listBoard">
      <van-list
          v-model:loading= "this.loading"
          v-model:finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          error-text="加载失败，请重试！"
      >
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
                <span class="goodsName" style="font-size: 20px;">{{ value.gname }}</span>
                <div class="bottom">
                  <span style="float: left;font-size: 15px;color: #fe4d19">￥{{ value.price }}</span>
                  <span style="float: right;color: gray;font-size: 10px">好评率：{{ value.likeRate }}</span>
                </div>
              </div>
            </el-card>
            <!--        </router-link>-->

          </el-col>
        </el-row>
      </van-list>
    </div>
  </div>
</template>

<script>
import '@/assets/css/Home.css'
import { ref } from 'vue'
import axios from "axios";
import {NavBar,Icon,Search,DropdownMenu, DropdownItem,List,ContactCard} from 'vant'

export default {
  name: 'Home',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Search.name]: Search,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List,
  },
  data(){
    return{
      isSelectChange: false,
      total: 1,
      currentPage: 1,
      pageSize: 5,
      search: "",
      totalData: [],
      tempList: [],
      loading: false,
      finished: false,
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
    this.createList();
  },
  methods:{
    refreshPage(){
      this.currentPage=0
      this.finished=false
      this.onLoad();
    },
    onLoad(){
      this.currentPage = this.currentPage+1
      axios.get("http://39.105.220.225:8081/shop/goods", {
        params:{
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search,
          sort: this.value,
        }
      })
          .then(res => {
            if(res.data.code === "0"){
              console.log("res:")
              console.log(res)

              if(this.currentPage> this.total){
                console.log("无更多内容")
                this.finished = true
              }else{
                //加载数据
                this.tempList = res.data.data.records
                console.log("tempList:")
                console.log(this.tempList)
                this.total = res.data.data.pages
                this.tempList.forEach((item,index)=>{
                  item.picture = this.baseURL+item.picture;
                  let lR = item.likeRate;
                  //好评率保留两位小数点
                  lR = parseFloat(lR).toFixed(2)
                  item.likeRate = lR
                  if(this.isSelectChange) {
                    this.totalData = []
                    this.isSelectChange = false
                  }
                  this.totalData.push(item)
                })
                console.log("totalData:")
                console.log(this.totalData)

              }

            }else{
              this.$message({
                type:"error",
                message: res.data.msg,
              })
            }
        })
        .finally(()=>{
          this.loading = false
        })
      // .catch((error)=>{
      //   if (error.response) {
      //     console.log(error.response.data);
      //     console.log(error.response.status);
      //     console.log(error.response.headers);
      //   } else if (error.request) {
      //     console.log(error.request);
      //   } else {
      //     console.log('Error', error.message);
      //   }
      //   console.log(error.config);
      // })

    },
    createList(){
      console.log("createList"+this.currentPage)
      axios.get("http://39.105.220.225:8081/shop/goods", {
        params:{
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search,
          sort: this.value,
        }
      })
      .then(res => {
      if(res.data.code === "0"){
        console.log("res:")
        console.log(res)
        this.tempList = res.data.data.records
        console.log("tempList:")
        console.log(this.tempList)
        this.total = res.data.data.pages
        this.tempList.forEach((item,index)=>{
          item.picture = this.baseURL+item.picture;
          let lR = item.likeRate;
          //好评率保留两位小数点
          lR = parseFloat(lR).toFixed(2)
          item.likeRate = lR
          this.totalData.push(item)
        })
        console.log("totalData:")
        console.log(this.totalData)

        }else{
          this.$message({
            type:"error",
            message: res.data.msg,
          })
        }

      })
      .finally(()=>{
            console.log("create finish")
          })
      // .catch((error)=>{
      //   if (error.response) {
      //     console.log(error.response.data);
      //     console.log(error.response.status);
      //     console.log(error.response.headers);
      //   } else if (error.request) {
      //     console.log(error.request);
      //   } else {
      //     console.log('Error', error.message);
      //   }
      //   console.log(error.config);
      // })

    },
    selectChange(val){
      this.isSelectChange = true
      this.refreshPage()
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
.goodsName{
  white-space: nowrap;  /*强制span不换行*/
  display: inline-block;  /*将span当做块级元素对待*/
  width: 3.5rem;  /*限制宽度*/
  overflow: hidden;  /*超出宽度部分隐藏*/
  text-overflow: ellipsis;  /*超出部分以点号代替*/
}
.m-2{
  float: left;
  /*width: 2rem*/
}
.searchBoard {
  margin: 10px 0;
}
</style>