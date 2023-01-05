import Login from './views/Login.vue'
import MemberHome from './views/MemberHome.vue'
import EditPassword from './views/EditPassword.vue'
import InfoPage from './views/InfoPage.vue'

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
        component: EditPassword
    },
    {
        path: '/info',
        name: 'Info',
        component: InfoPage
    }
]

const router = createRouter({
    history : createWebHistory(),
    routes : routeInfos
})

export default router;    