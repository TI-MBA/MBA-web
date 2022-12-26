import { createApp } from 'vue'
import App from './App.vue'
import MemberHome from './views/MemberHome.vue'
import Login from './views/Login.vue'
import { createRouter, createWebHistory } from "vue-router"
    
const routeInfos = [
    {
        path : "/login",
        component : Login
    },
    {
        path : "/",
        component : MemberHome
    }        
]

const router = createRouter({
    history : createWebHistory(),
    routes : routeInfos
})

export default router;    