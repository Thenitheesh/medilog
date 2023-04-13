import {createRouter,createWebHistory} from 'vue-router'
import Login from './components/Login.vue'
import dashbord from './components/dashbord.vue' 
import home from './components/home.vue'
import newinput from './components/newinput.vue'
import patientDash from './components/patientDash.vue'
import uploadtest from './components/uploadtest.vue'
const  routes=[
        {path:'/login',component:Login},
        {path:'/dashbord',component:dashbord},
        {path:'/home',component:home},
        {path:'/newinput',component:newinput},
        {path:'/patientDash',component:patientDash},
         {path:'/uploadtest',component:uploadtest}
    ]
  
const router = createRouter({
    history:createWebHistory(),
    routes, 
    base: '/dashbord'
  })
export default router 