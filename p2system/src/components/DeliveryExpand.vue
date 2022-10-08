<template>
  <div id="goodsExpand">
    <el-descriptions border>

      <el-descriptions-item
          label="地址"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">{{ ordersForm.address }}</el-descriptions-item>
      <el-descriptions-item
          label="是否可议价"
          label-align="center"
          align="center"
          label-class-name="Item"
          column-key="filterStatus"
          width="150px">
        <span v-if="goodsForm.bargain !== canBargain">一口价</span>
        <span v-if="goodsForm.bargain === canBargain">可议价</span>
      </el-descriptions-item>
      <el-descriptions-item
          label="新旧程度"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">{{ goodsForm.gcondition }}</el-descriptions-item>

      <el-descriptions-item
          label="好评率"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">{{ goodsForm.likeRate }}</el-descriptions-item>
      <el-descriptions-item
          label="商品介绍"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">{{ goodsForm.introduction }}</el-descriptions-item>
      <el-descriptions-item
          label="下单时间"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">{{ time(ordersForm.subTime) }}
      </el-descriptions-item>
      <el-descriptions-item
          label="发货时间"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">{{ time(ordersForm.sentTime) }}
      </el-descriptions-item>
      <el-descriptions-item
          label="成交时间"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">{{ time(ordersForm.sucTime) }}
      </el-descriptions-item>
      <el-descriptions-item
          label="退款时间"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">{{ time(ordersForm.retTime) }}
      </el-descriptions-item>
      <el-descriptions-item
          label="商家拒绝退货理由"
          label-align="center"
          align="center"
          label-class-name="Item"
          width="150px">{{ ordersForm.mnote }}
      </el-descriptions-item>

    </el-descriptions>

  </div>
</template>

<script>
import { toRaw } from '@vue/reactivity';
import moment from 'moment';
import axios from "axios";


export default {
  name: "deliveryExpand",
  props:{
    order:Object,
  },
  // props:["user"],
  components:{},
  data() {
    return {
      ordersForm:{

      },
      goodsForm:{},
      canBargain: "true"
    }
  },
  created() {
    this.onload()
  },
  methods:{
    onload(){
      this.ordersForm=toRaw(this.order);
      console.log(this.ordersForm)
      axios.get("http://localhost:9090/goods/goodDetails", {
        params:{
          Gid: this.ordersForm.gid
        }
      }).then(res => {
        console.log(res.data)
        this.goodsForm = res.data.data;
      })
    },
    time(date){
      return moment(date).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
    }
  },

}
</script>

<style scoped>
#goodsExpand{
  display: block;
}
.Item{
  display: inline-block;
  min-width: 100px;
  min-height: 50px;
  line-height: 50px;
  text-align: left;

}
</style>