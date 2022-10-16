<template>

  <div style="margin: 50px auto;border-radius: 20px;">




    <van-checkbox-group v-model="checked">

      <van-cell v-for="(item, index) in tableData" :key="item">
        <van-checkbox :name="index" @click="addprice()">


            <van-card
                :num="item.number"
                :price="item.price"
                :title="item.gname"
                :thumb="item.picture">
              <template #footer>
                <el-popconfirm title="确认删除吗？" @confirm="handleDelete(item.cid),load()">
                  <template #reference>
                    <el-button type="text" size="small">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </van-card>

        </van-checkbox>
      </van-cell>

    </van-checkbox-group>


    <div style="text-align: center;">
      <span>总价：{{allprice}}</span>
    </div>
    <div style="text-align: right;">
      <van-button round color="red" @click="gotoPurchase(),load()">立即购买</van-button>
    </div>



  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShoppingCart",
  data(){
    return{
      checkAll:true,
      isIndeterminate: false,
      checkList: [],
      goods: [],
      tableData : [],
      multipleSelection: [],
      loading: 'false',
      finished: 'false',
      checked: [],
      allprice: 0,
      baseUrl:"http://39.105.220.225:8081/shop/files/download/"
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      axios.get("http://39.105.220.225:8081/shop/cart", {
        params:{
          uid: window.localStorage.getItem("uid")
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data;
        this.tableData.map((item,index)=>{
          this.goods.push(item.gid)
          this.checkList.push(item.gid)
        })
        this.tableData.map((item,index)=>{
          item.checked=true;
        })

        this.tableData.forEach((item) => {
          console.log(1);
          item.operate = "";
          axios.get("http://39.105.220.225:8081/shop/goods/goodDetails", {
            params: {
              Gid: item.gid,
              Uid: window.localStorage.getItem("uid")
            }
          }).then(res => {
            item.picture = this.baseUrl + res.data.data.picture;
          })
        })

      })
    },
    alterNum(cart){
      axios.put("http://39.105.220.225:8081/shop/cart", cart).then(res => {
        console.log(res)
      })

    },
    handleDelete(cid){
      console.log(cid);
      axios.delete("http://39.105.220.225:8081/shop/cart/" + cid).then(res => {
        console.log(res)
        if (res.data.code === '0'){
          this.$message({
            type: "success",
            message: "删除成功"
          })
        }else {
          this.$message({
            type: "error",
            message: res.data.msg
          })
        }
      });
      this.load();
    },
    gotoPurchase(){
      console.log(this.multipleSelection);
      this.$router.push({name: "Purchase", params: {checkList: JSON.stringify(this.multipleSelection)}});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    test(){
      console.log(this.checked);
    },
    addprice(){
      var a = 0;
      this.multipleSelection = [];
      this.checked.forEach((index)=>{
        a += this.tableData[index].price;
      })
      this.checked.forEach((index)=>{
        this.multipleSelection.push(this.tableData[index]);
      })
      this.allprice = a;
    }
  },
  mounted() {

  }
}
</script>

