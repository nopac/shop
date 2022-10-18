import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import { Button,Form, Field, CellGroup,NavBar,List,Checkbox,CheckboxGroup,Sidebar,SidebarItem,Cell,Card,Rate,Popup,Divider,Image as VanImage} from 'vant'
import 'element-plus/dist/index.css'
import '@/assets/css/global.css'
import '@element-plus/icons/lib'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "amfe-flexible"

createApp(App).use(store)
    .use(router)
    .use(Button)
    .use(VanImage)
    .use(Form)
    .use(Field)
    .use(CellGroup)
    .use(NavBar)
    .use(List)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Sidebar)
    .use(SidebarItem)
    .use(Cell)
    .use(Card)
    .use(Card)
    .use(List)
    .use(Rate)
    .use(Divider)
    .use(Popup)
    .use(ElementPlus,{
        locale: zhCn,
    }).mount('#app')