import Login from "./views/Login.vue";
import MemberHome from "./views/MemberHome.vue";
import EditPassword from "./views/EditPassword.vue";
import InfoPage from "./views/InfoPage.vue";
import PresenceInfoPage from "./views/MasteryPresenceInfo.vue";
import SuperAdminHome from "./views/SuperAdminHome.vue";
import AdminFinanceHome from "./views/AdminFinanceHome.vue";
import AdminRollCallHome from "./views/AdminRollCallHome.vue";
import { UserLevels } from "./utils/userLevels";
import { createRouter, createWebHistory } from "vue-router";

let userAdminLevel = Number(localStorage.getItem("user_type"));
const routeInfos = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    beforeEnter: (to, from, next) => {
      switch (userAdminLevel) {
        case UserLevels.ROLE_USER:
          next("/member-home");
          break;
        case UserLevels.ROLE_ADMIN:
          next("/super-admin");
          break;
        case UserLevels.ROLE_FINANCE:
          next("/super-admin");
          break;
        case UserLevels.ROLE_ROLL_CALL:
          next("/super-admin");
          break;
        case UserLevels.ROLE_MASTERY:
          next("/presence-info");
          break;
        default:
          next();
      }
    },
  },
  {
    path: "/member-home",
    name: "MemberHome",
    component: MemberHome,
  },
  {
    path: "/super-admin",
    name: "SuperAdminHome",
    component: SuperAdminHome,
    beforeEnter: (to, from, next) => {
      if (userAdminLevel == UserLevels.ROLE_ADMIN) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/finance-home",
    name: "AdminFinanceHome",
    component: AdminFinanceHome,
    beforeEnter: (to, from, next) => {
      if (
        userAdminLevel == UserLevels.ROLE_FINANCE ||
        userAdminLevel == UserLevels.ROLE_ADMIN
      ) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/roll-call-home",
    name: "AdminRollCallHome",
    component: AdminRollCallHome,
    beforeEnter: (to, from, next) => {
      if (
        userAdminLevel == UserLevels.ROLE_ROLL_CALL ||
        userAdminLevel == UserLevels.ROLE_ADMIN
      ) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/presence-info",
    name: "PresenceInfo",
    component: PresenceInfoPage,
    beforeEnter: (to, from, next) => {
      if (userAdminLevel > UserLevels.ROLE_USER) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/edit-password",
    name: "EditPassword",
    component: EditPassword,
    beforeEnter: (to, from, next) => {
      if (userAdminLevel > UserLevels.ROLE_USER) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/info",
    name: "Info",
    component: InfoPage,
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
