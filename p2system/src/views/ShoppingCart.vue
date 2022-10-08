<template>

  <div style="width: 70%;margin: 50px auto;border-radius: 20px;">

    <el-table :data="tableData"
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
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShoppingCart",
  components:{

  },
  data(){
    return{
      checkAll:true,
      isIndeterminate: false,
      checkList: [],
      goods: [],
      tableData : [],
      multipleSelection: []
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      axios.get("http://localhost:9090/cart", {
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
      axios.put("http://localhost:9090/cart", cart).then(res => {
        console.log(res)
      })

    },
    handleDelete(cid){
      axios.delete("http://localhost:9090/cart/" + cid).then(res => {
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
      this.$router.push({name: "Purchase", params: {checkList: JSON.stringify(this.multipleSelection)}});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    }
  },
  mounted() {

  }
}
</script>

