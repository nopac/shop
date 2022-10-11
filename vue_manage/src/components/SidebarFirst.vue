<template>
  <div><!--导航栏一级,下部-->
    <van-tabbar v-model="active">
      <van-tabbar-item >
        <van-cell is-link title="审核管理" @click="show = true"  close-on-click-action="true"/>
        <van-action-sheet v-model:show="show" title="审核管理" close-on-click-action="true">
          <van-button type="default" style="width: 100%" @click="showUserEXM">用户审核</van-button><br>
          <van-button type="default" style="width: 100%" @click="showMerchantEXM">商家审核</van-button><br>
          <van-button type="default" style="width: 100%" @click="showGoodsEXM">商品审核</van-button>
        </van-action-sheet>
      </van-tabbar-item>
      <van-tabbar-item>
        <div @click="showUserMNG">
          <van-icon name="manager"  size="20"/>
          <span >用户管理</span>
        </div>
      </van-tabbar-item>
      <van-tabbar-item>
        <div @click="showGoodsMNG">
          <van-icon name="point-gift"  size="20"/>
          <span>商品管理</span>
        </div>
      </van-tabbar-item>
      <van-tabbar-item>
        <div @click="showMerchantMNG">
          <van-icon name="bag"  size="20"/>
          <span>商家管理</span>
        </div>
      </van-tabbar-item>
    </van-tabbar>

    <!--<van-row>
      <van-col span="1">
        <van-icon name="bars" size="20"/>
      </van-col>
      <van-col span="7" >
        <div style="display: inline-block">
          <van-cell is-link title="审核管理" @click="show = true"  close-on-click-action="true"/>
          &lt;!&ndash;<van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />&ndash;&gt;
          <van-action-sheet v-model:show="show" title="审核管理" close-on-click-action="true">
            <van-button type="default" style="width: 100%" @click="showUserEXM">用户审核</van-button><br>
            <van-button type="default" style="width: 100%" @click="showMerchantEXM">商家审核</van-button><br>
            <van-button type="default" style="width: 100%" @click="showGoodsEXM">商品审核</van-button>
          </van-action-sheet>

        </div>
      </van-col>
      <van-col span="5">
        <div @click="showUserMNG">
          <van-icon name="manager"  size="20"/>
          <span >用户管理</span>
        </div>
      </van-col>
      <van-col span="5">
        <div @click="showGoodsMNG">
          <van-icon name="point-gift"  size="20"/>
          <span>商品管理</span>
        </div>
      </van-col>
      <van-col span="5">
        <div @click="showMerchantMNG">
          <van-icon name="bag"  size="20"/>
          <span>商家管理</span>
        </div>
      </van-col>
    </van-row>-->
  </div>
</template>

<script>
  import {Setting,Menu,UserFilled,GoodsFilled,User,Goods,Shop,Briefcase,Tickets} from "@element-plus/icons-vue";
  import { ref } from 'vue';
  export default {
    name: "SidebarFirst",
    components:{
      Setting,
      Menu,
      UserFilled,
      GoodsFilled,
      User,
      Goods,
      Shop,Briefcase,Tickets
    },
    data() {
      return {
        activePage: ""
      }
    },
    setup() {
      const show = ref(false);
      const active = ref(0);
      return {
        show,active
      };
    },
    methods: {
      showUserEXM(){
        this.$router.push("/exmU")
      },
      showUserMNG(){
        this.$router.push("/home")
      },
      showGoodsEXM(){
        this.$router.push("/exmG")
      },
      showGoodsMNG(){
        this.$router.push("/mngG")
      },
      showMerchantEXM(){
        this.$router.push("/exmM")
      },
      showMerchantMNG(){
        this.$router.push("/mngM")
      },
      showChargeMNG(){
        this.$router.push("/mngC")
      },

    },

  }

</script>

<style scoped>
  span{
    font-size: 6px;
  }
</style>