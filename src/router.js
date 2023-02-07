import {createRouter,createWebHistory} from 'vue-router'
import Login from './components/Login.vue'
import dashbord from './components/dashbord.vue' 
import home from './components/home.vue'

const  routes=[
        {path:'/login',component:Login},
        {path:'/dashbord',component:dashbord},
        {path:'/home',component:home}
    ]
  
const router = createRouter({
    history:createWebHistory(),
    routes, 
    base: '/dashbord'
  })
export default router 