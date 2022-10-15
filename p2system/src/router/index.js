import { createRouter, createWebHistory } from 'vue-router'
import layout_order from "@/layout/layout_order";
import layout_shop from "@/layout/layout_shop";
import AddGood from "@/components/shop/AddGood";
import Layout from "@/layout/Layout";
import OrderNav from "../components/OrderNav";

const routes = [

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
      {
        path: '/shoppingCart',
        name: 'ShoppingCart',
        component: () => import( '@/views/ShoppingCart')
      },
      {
        path: '/layout',
        name: 'layout_order',
        component: layout_order,
        redirect: "/orderNav",
        children:[
          {
            path: '/orderNav',
            name: 'OrderNav',
            component: ()=> import('@/components/OrderNav')
          },
          {
            path: 'merchantOrder',
            name: 'MerOrderNav',
            component: () => import('@/components/MerOrderNav')
          }
        ]
      },
      {
        path:'/userPage',
        name:'UserPage',
        component: ()=> import( '@/views/UserPage')
      }
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
    component: ()=> import("@/views/Login"),
  },
  {
    path: '/register',
    name: 'Register',
    component: ()=> import("@/views/Register")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // base: "/shopping/",  //打包上线
  // base: "",          //本地测试
  routes
})

export default router
