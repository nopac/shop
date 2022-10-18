import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import {Button, Form, Field, CellGroup, NavBar,List,Dialog,Tag,Card} from 'vant'
import 'element-plus/dist/index.css'
import '@/assets/css/global.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "amfe-flexible"
import {DropdownMenu, DropdownItem} from 'vant';
import {Icon} from 'vant';
import {Cell} from 'vant';
import {Col, Row} from 'vant';
import {ActionSheet} from 'vant';
import {Tabbar, TabbarItem} from 'vant';
import { Popover } from 'vant';


createApp(App).use(store)
    .use(Col)
    .use(Popover)
    .use(ActionSheet)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Row)
    .use(Cell)
    .use(CellGroup)
    .use(router)
    .use(Button)
    .use(Form)
    .use(Field)
    .use(CellGroup)
    .use(NavBar)
    .use(DropdownMenu)
    .use(DropdownItem)
    .use(Icon)
    .use(Tag)
    .use(List)
    .use(Card)
    .use(Dialog)
    .use(ElementPlus, {
      locale: zhCn,
    }).mount('#app')
