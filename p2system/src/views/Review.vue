<template>
  <div style="margin: 10px" key="{{key}}">
    <div class="searchBoard">
      <van-cell-group inset>
        <van-field
            v-model="searchText"
            center
            clearable
            placeholder="输入商品名">
          <template #button>
            <van-button size="small" type="primary" @click="search">查询</van-button>
          </template>
        </van-field>
      </van-cell-group>
    </div>
    <div>
      <van-card
          v-for="order in tableData"
          :num="order.number"
          :price="order.price"
          :title="order.gname"
          :thumb="order.picture"
      >
        <template #footer>
          <div style="width: 72%;margin-left: auto">
            <div style="font-size: larger;float: left;padding: 5px">实付款 ￥{{order.sum}}</div>
            <van-button size="small" @click="review(order)">立即评价</van-button>
          </div>
        </template>

      </van-card>
    </div>

    <el-dialog title="商品评价" v-model="dialogFormVisible" width="90%">
      <el-form :model="form">
        <el-form-item label="商品评价" style="padding-left: 5%">
          <el-rate
              v-model="form.Gvalue"
              :colors="colors"
              style="padding-top: 3%">
          </el-rate>
        </el-form-item>
        <el-form-item label="商家评价" style="padding-left: 5%">
          <el-rate
              v-model="form.Mvalue"
              :colors="colors"
              style="padding-top: 3%">
          </el-rate>
        </el-form-item>
        <el-form-item label="评价描述" style="padding-left: 5%">
          <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入评价内容"
              style="margin-right: 10px"
              v-model="form.textarea">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="large">取 消</el-button>
        <el-button type="primary" @click="submit" size="large">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import axios from "axios";
import deliveryExpand from "@/components/DeliveryExpand";

export default {
  name: "Waiting",
  components: {
    deliveryExpand,
  },
  data(){
    return{
      searchText: "",
      total: 0,
      tableData : [],
      dialogFormVisible: false,
      form:{
        Gvalue: null,
        Mvalue: null,
        textarea: ""
      },
      order:{},
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      baseUrl:"http://39.105.220.225:8081/shop/files/download/",
      key:0
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      let params={
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        searchText: this.searchText,
        uid:window.localStorage.getItem("uid"),
        status: 2,
      }
      axios.get("http://39.105.220.225:8081/shop/orders/user",{
        params: params
      }).then(res=>{
            this.total=res.data.data.total;
            this.tableData = res.data.data.records;
            this.tableData.forEach((item)=>{
              axios.get("http://39.105.220.225:8081/shop/goods/goodDetails",{
                params:{
                  Gid:item.gid,
                  Uid: window.localStorage.getItem("uid")
                }
              }).then(res=>{
                console.log("aaa",res.data.data.picture);
                item.picture = this.baseUrl + res.data.data.picture;
                this.key++;
              })
            })
      })
    },
    search(){
      this.load();
    },
    review(order){
      this.dialogFormVisible = true
      this.order = order;
    },

    submit(){
      if (this.form.Gvalue===0||this.form.Mvalue===0){
        this.$message({
          type:'error',
          message: '请评价'
        })
        return;
      }
      let params1={
        star: this.form.Gvalue,
        remark: this.form.textarea,
        fromid:this.order.uid,
        toid:this.order.gid,
        type:2,
        oid:this.order.oid
      };
      axios.post("http://39.105.220.225:8081/shop/review",params1).then(res=>{
        console.log(res.data);
      })


      let params2={
        star: this.form.Mvalue,
        fromid:this.order.uid,
        toid:this.order.mid,
        type:1,
        oid:this.order.oid
      };
      axios.post("http://39.105.220.225:8081/shop/review",params2).then(res=>{
        console.log(res.data);
      })
      this.$message({
        type:"success",
        message: "评价成功",
      });
      this.dialogFormVisible=false;
      this.form={};
    },
    cancel(){
      this.dialogFormVisible = false;
      this.form.Gvalue = 0;
      this.form.Mvalue = 0;
    }
  }
}
</script>

<style scoped>

.opeBoard{
  margin: 10px 0;
}
.searchBoard{
  margin: 10px 0;
}
.fixedOpe{
  width: 120px;
  text-align: center;
}

</style>