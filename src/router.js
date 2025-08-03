import Login from "./views/Login.vue";
import MemberHome from "./views/MemberHome.vue";
import EditPassword from "./views/EditPassword.vue";
import InfoPage from "./views/InfoPage.vue";
import PresenceInfoPage from "./views/MasteryPresenceInfo.vue";

import { createRouter, createWebHistory } from "vue-router";

const routeInfos = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "MemberHome",
    component: MemberHome,
    beforeEnter: (to, from, next) => {
      let userAdminLevel = localStorage.getItem("user_type");
      if (userAdminLevel > 0) {
        next("/presence-info");
      } else {
        next();
      }
    },
  },
  {
    path: "/editPassowrd",
    name: "EditPassword",
    component: EditPassword,
  },
  {
    path: "/info",
    name: "Info",
    component: InfoPage,
  },
  {
    path: "/presence-info",
    name: "PresenceInfo",
    component: PresenceInfoPage,
    beforeEnter: (to, from, next) => {
      let userAdminLevel = localStorage.getItem("user_type");
      if (userAdminLevel > 0) {
        next();
      } else {
        next("/");
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routeInfos,
});

router.beforeEach((to, from, next) => {
  let userId = localStorage.getItem("userid");
  if (!userId && to.name != "login") {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
