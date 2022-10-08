import { createRouter, createWebHistory } from 'vue-router'
import layout_m from "@/layout/layout_m";
import layout_shop from "@/layout/layout_shop";
import AddGood from "@/components/shop/AddGood";
import Layout from "@/layout/Layout";

const routes = [
  {
    path: '/layout',
    name: 'layout_m',
    component: layout_m,
    redirect: "/infoU",
    children:[
        {
        path: '/infoU',
        name: 'UserInfo',
        component:()=>import("@/views/UserInfo"),
      },{
        path: '/record',
        name: 'AmountRecordMNG',
        component:()=>import("@/views/AmountRecordMNG"),
      },
      {
        path: '/shoppingCart',
        name: 'ShoppingCart',
        component: () => import( '@/views/ShoppingCart')
      },
      {
        path: '/waiting',
        name: 'Waiting',
        component: () => import( '@/views/Waiting')
      },
      {
        path: '/sending',
        name: 'Sending',
        component: () => import( '@/views/Sending')
      },
      {
        path: '/receiving',
        name: 'Receiving',
        component: () => import( '@/views/Receiving')
      },
      {
        path: '/allOrders',
        name: 'AllOrders',
        component: () => import( '@/views/AllOrders')
      },
      {
        path: '/review',
        name: 'Review',
        component: () => import( '@/views/Review')
      }
    ]
  },
  {
    path: '/shop',
    name: 'layout_shop',
    component: layout_shop,
    redirect: "/mngG",
    children:[
      {
        path: '/mngOut',
        name: 'OutMNG',
        component: ()=>import("@/components/shop/OutMNG"),
      },{
        path: '/exmBack',
        name: 'BackEXM',
        component:()=>import("@/components/shop/BackEXM"),
      },{
        path: '/mngShopOrder',
        name: 'ShopOrderMNG',
        component:()=>import("@/components/shop/ShopOrderMNG"),
      },
      {
        path: '/addG',
        name: 'AddGood',
        component:()=>import("@/components/shop/AddGood"),
      },{
        path: '/mngG',
        name: 'GoodsMNG',
        component:()=>import("@/components/shop/GoodsMNG"),
      }
    ]
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:"/home",
    children:[
      {
        path: 'home',
        name: 'Home',
        component: () => import("@/views/Home"),
      },

    ]

  },
  {
    path: '/goodDetailsLayout',
    name: 'goodDetailsLayout',
    redirect:"/goodDetails",
    component: () => import('@/layout/goodDetailsLayout'),
    children:[
      {
        path: '/goodDetails',
        name: 'GoodDetails',
        component: () => import( '@/views/GoodDetails')
      },
      {
        path: '/purchase',
        name: 'Purchase',
        component: () => import( '@/views/Purchase')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=> import("@/views/Login")
  },
  {
    path: '/register',
    name: 'Register',
    component: ()=> import("@/views/Register")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
