<template>

  <div style="margin: 50px auto;border-radius: 20px;">




    <van-checkbox-group v-model="checked">

      <van-cell v-for="(item, index) in tableData" :key="item">
        <van-checkbox :name="index" @click="addprice()">

          <div>
            <van-card
                :num="item.number"
                :price="item.price"
                :title="item.gname"
                thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg">
              <template #footer>
                <el-popconfirm title="确认删除吗？" @confirm="handleDelete(item.cid),load()">
                  <template #reference>
                    <el-button type="text" size="small">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </van-card>
          </div>

        </van-checkbox>
      </van-cell>

    </van-checkbox-group>



    <div style="text-align: center;">
      <span>总价：{{allprice}}</span>
    </div>
    <div style="text-align: right;">
      <van-button round color="red" @click="gotoPurchase(),load()">立即购买</van-button>
    </div>




    <!--  <el-table :data="tableData"
                  highlight-current-row
                  @selection-change="handleSelectionChange"
                  style="width: 100%;background-color: #cccccc" class="tableBox">
          <el-table-column prop="cid"
              type="selection"
              width="55">
          </el-table-column>

          <el-table-column prop="gname" label="商品名称"  />

          <el-table-column prop="price" label="单价" />

          <el-table-column prop="number" label="数量" >
            <template v-slot="scope">
              <el-input-number v-model="scope.row.number" :min="1" size="small" style="width: 100px"
              @change="alterNum(scope.row)"/>
            </template>
          </el-table-column>

          <el-table-column prop="sum" label="金额" >
            <template v-slot="scope">
              {{scope.row.price*scope.row.number}}
            </template>
          </el-table-column>

          <el-table-column fixed="right" >
            <template #header>

              <el-button type="danger" plain size="normal" round
                         :disabled="this.multipleSelection.length===0"
                         @click="gotoPurchase"
              >立即购买</el-button>
            </template>

            <template #default="scope">

              <el-popconfirm title="确认删除吗？" @confirm="handleDelete(scope.row.cid)">
                <template #reference>
                  <el-button type="text" size="small">删除</el-button>
                </template>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table> -->


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
      allprice: 0
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

