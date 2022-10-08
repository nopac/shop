<template>
  <div class="head">
    <div class="leftMenu">P2System-Merchant</div>
    <div style="flex: 1"></div>
    <div class="rightMenu">
      <el-dropdown>
        <span class="el-dropdown-link" style="margin-top: 5px">
          <el-avatar> {{ user.uname }} </el-avatar>
          <!--          <el-icon class="el-icon&#45;&#45;right">-->
          <!--            <arrow-down/>-->
          <!--          </el-icon>-->
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="showInfo">个人信息</el-dropdown-item>
            <el-dropdown-item @click="exitSystem">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {ArrowDown} from "@element-plus/icons-vue";

import { toRaw } from '@vue/reactivity';
import request from "@/util/request";
export default {
  name: "Header",
  data(){
    return{
      user:[]
    }
  },
  created() {
    this.user.uname=localStorage.getItem("uname")
  },
  components:{
    ArrowDown
  },
  methods:{
    exitSystem(){
      localStorage.clear();
      this.$router.push("/")
    },
    showInfo(){
      this.$router.push({
        name:'UserInfo',
        query: {
          uname:this.user.uname,
        }

      })
    }
  }
}
</script>
<style>
.head {
  height: 50px;
  line-height: 50px;
  padding-left: 30px;
  font-weight: bold;
  background-color: #545c64;
  color:#fff;
  border-bottom: 1px solid #ccc;
  display: flex;
}

.leftMenu {
  width: 200px;
  font-size: 20px;
}

.rightMenu {
  width: 100px;
  /*padding-top: 12px;*/
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}


</style>