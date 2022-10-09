<template>
  <div>
    <div style="float: top;height: 80px;width: 650px;margin: auto; padding: 20px">
      <!--选择器-->
      <el-select
          v-model="value"
          class="m-2"
          placeholder="Select"
          style="float: left; width: 150px" size="large"
          @change="selectChange"
      >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <!--    搜索区域-->
      <div style="margin: 0px;float: right">
        <el-input v-model="search" placeholder="请输入想要搜索的商品名称"  style="width: 350px" clearable size="large"/>
        <el-button type="primary" style="margin-left: 5px" @click="loadGoods" size="large">查询</el-button>
      </div>

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
          <el-card :body-style="{ padding: '0px' }" style="width: 250px; margin: 0 10px;cursor: pointer" @click="gotoDetail(value)">
            <el-image class="imageArea"
                      style="width: 250px;height: 250px;"
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

export default {
  name: 'Home',
  components: {

  },
  data(){
    return{
      total: 0,
      currentPage: 1,
      pageSize: 10,
      search: "",
      totalData: [],
      value: '系统推荐',
      options : [
       {
          value: '系统推荐',
          label: '系统推荐',
        },
        {
          value: '好评率',
          label: '好评率',
        },
        {
          value: '价格从高到低',
          label: '价格从高到低',
        },
        {
          value: '价格从低到高',
          label: '价格从低到高',
        },
        {
          value: '可议价',
          label: '可议价',
        },
        {
          value: '新旧度从高到低',
          label: '新旧度从高到低',
        },
        {
          value: '新旧度从低到高',
          label: '新旧度从低到高',
        }
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
          uid: window.localStorage.getItem("uid")
        }
      }).then(res => {
        console.log(res)
        this.totalData = res.data.data.records
        this.total = res.data.data.total
        this.totalData.forEach((item,index)=>{
          item.picture = this.baseURL+item.picture;
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
        if(res.data.code=='0'){
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
