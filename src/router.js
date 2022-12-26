import MemberHome from './views/MemberHome.vue'
import Login from './views/Login.vue'
import { createRouter, createWebHistory } from "vue-router"
    
const routeInfos = [
    {
        path : "/login",
        name: 'login',
        component : Login
    },
    {
        path : "/",
        name: 'MemberHome',
        component : MemberHome
    }        
]

const router = createRouter({
    history : createWebHistory(),
    routes : routeInfos
})

export default router;    