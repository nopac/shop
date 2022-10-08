import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/UserMNG.vue'
import UserEXM from '../views/UserEXM.vue'
import GoodsEXM from '../views/GoodsEXM.vue'
import GoodsMNG from '../views/GoodsMNG.vue'
import layout_m from "@/layout/layout_m";
import MerchantEXM from '../views/MerchantEXM.vue'
import UserInfo from '../views/UserInfo.vue'

const routes = [
  {
    path: '/layout',
    name: 'layout_m',
    component: layout_m,
    redirect: "/home",
    children:[
      {
        path: '/home',
        name: 'Home',
        component: ()=>import("@/views/UserMNG"),
      },{
        path: '/exmU',
        name: 'UserEXM',
        component: ()=>import("@/views/UserEXM"),
      },
      {
        path: '/mngG',
        name: 'GoodsMNG',
        component: ()=>import("@/views/GoodsMNG"),
      },{
        path: '/exmG',
        name: 'GoodsEXM',
        component: ()=>import("@/views/GoodsEXM"),
      },{
        path: '/exmM',
        name: 'MerchantEXM',
        component: ()=>import("@/views/MerchantEXM")
      },{
        path: '/infoU',
        name: 'UserInfo',
        component: ()=>import("@/views/UserInfo")
      },
      {
        path: '/mngM',
        name: 'MerchantMNG',
        component: ()=>import("@/views/MerchantMNG")
      },
      {
        path: '/mngC',
        name: 'ChargeMNG',
        component: ()=>import("@/views/ChargeMNG")
      },
    ]
  },
  {
    path: '/',
    name: 'Login',
    component: ()=> import("@/views/Login")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
