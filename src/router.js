import Login from './views/Login.vue'
import MemberHome from './views/MemberHome.vue'
import EditPassowrd from './views/EditPassowrd.vue'

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
    },
    {
        path: '/editPassowrd',
        name: 'EditPassword',
        component: EditPassowrd
    }
]

const router = createRouter({
    history : createWebHistory(),
    routes : routeInfos
})

export default router;    