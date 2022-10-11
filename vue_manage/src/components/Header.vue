<template>
  <div>
    <van-row>
      <van-col span="12">
        <span style="color: #409EFF;font-weight: bolder">后台管理</span>
      </van-col>

      <van-col span="6" offset="6">
        <van-popover v-model:show="showPopover" >
          <van-button type="default" style="width: 100%" @click="showInfo">个人信息</van-button><br>
          <van-button type="default" style="width: 100%" @click="exitSystem">退出系统</van-button>
          <template #reference>
            <van-button type="primary">{{ user.uname }}</van-button>
          </template>
        </van-popover>
      </van-col>
    </van-row>
  </div>


  <!--<div class="head">
    &lt;!&ndash;<div class="leftMenu">后台管理</div>&ndash;&gt;
    <div style="flex: 1"></div>
    <div class="rightMenu">
      &lt;!&ndash;<van-cell-group>
        <van-cell title="个人信息" value="" @click="showInfo"/>
        <van-cell title="退出系统" value="" label="" @click="exitSystem"/>
      </van-cell-group>&ndash;&gt;

      &lt;!&ndash;<el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar> {{ user.uname }} </el-avatar>
&lt;!&ndash;          <el-icon class="el-icon&#45;&#45;right">&ndash;&gt;
&lt;!&ndash;            <arrow-down/>&ndash;&gt;
&lt;!&ndash;          </el-icon>&ndash;&gt;
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="showInfo">个人信息test</el-dropdown-item>
            <el-dropdown-item @click="exitSystem">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>&ndash;&gt;
    </div>
  </div>-->
</template>

<script>
import {ArrowDown} from "@element-plus/icons-vue";
import { ref } from 'vue';
import { Toast } from 'vant';
import { toRaw } from '@vue/reactivity';
import request from "@/util/request";
import jwtDecode from "jwt-decode";

export default {
  setup() {
    const showPopover = ref(false);
    return { showPopover };
  },

  name: "Header",
  data(){
    return{
      user:[]
    }
  },
  created() {
    this.user.uname = localStorage.getItem("admid")
    // this.user.uname=this.$route.query.admid
  },
  components:{
    ArrowDown
  },
  methods:{
    test(){
      Toast("????")
    },
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
  color: dodgerblue;
  border-bottom: 1px solid #ccc;
  display: flex;
}

.leftMenu {
  width: 200px;
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