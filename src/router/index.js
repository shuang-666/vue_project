import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("../views/Main.vue"),
    children: [
      {
        path: "/",
        name: "Index",
        component: () => import("../views/index/Index.vue")
      },
      {
        path: "/class",
        name: "Class",
        component: () => import("../views/class/Index.vue")
      },
      {
        path: "/record",
        name: "Record",
        component: () => import("../views/record/Index.vue")
      },
      {
        path: "/exercise",
        name: "Exercise",
        component: () => import("../views/exercise/Index.vue")
      },
      {
        path: "/my",
        name: "Myself",
        component: () => import("../views/myself/Index.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/register/Index.vue")
  },
  {
    path: "/sms_login",
    name: "login_index",
    component: () => import("../components/register/login_index.vue")
  },
  {
    path: "/forget-pass",
    name: "login_password",
    component: () => import("../components/register/login_password.vue")
  },
  {
    path: "/set-pass",
    name: "password",
    component: () => import("../components/register/Password.vue")
  },
  {
    path: "/set-message",
    name: "message",
    component: () => import("../components/register/UserInfo.vue")
  },
  {
    path: "/set-info",
    name: "sexSelect",
    component: () => import("../components/register/sex_select.vue")
  },
  {
    path: "/teacher",
    name: "teacher",
    component: () => import("../views/details/Index.vue")
  },
  {
    path: "/course-detail",
    name: "class",
    component: () => import("../views/classDetails/Index.vue")
  },
  {
    path: "/options",
    name: "loginoff",
    component: () => import("../views/loginoff/Index.vue")
  },
  {
    path: "/set-new-pass",
    name: "setPass",
    component: () => import("../components/register/Setup.vue")
  },
  {
    path: "/translate",
    name: "translate",
    component: () => import("../components/register/Subject.vue")
  },
  {
    path: "/info",
    name: "info",
    component: () => import("../views/updata/Index.vue")
  },
  {
    path: "/concern",
    name: "concern",
    component: () => import("../views/concern/Index.vue")
  },
  {
    path: "/study-detail",
    name: "study",
    component: () => import("../views/studyDetails/Index.vue")
  },
  {
    path: "/message",
    name: "message",
    component: () => import("../views/message/Index.vue")
  },
  {
    path: "/collection",
    name: "collection",
    component: () => import("../views/collection/Index.vue")
  },
  {
    path: "/appointment",
    name: "appointment",
    component: () => import("../views/appointment/Index.vue")
  },
  {
    path: "/video",
    name: "video",
    component: () => import("../views/video/Index.vue")
  },
  {
    path: "/set_name",
    name: "name",
    component: () => import("../views/name/Index.vue")
  },
  {
    path: "/study-calendar",
    name: "study-calendar",
    component: () => import("../views/studyCalendar/Index.vue")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/search/Index.vue")
  },
  {
    path: "/oto",
    name: "oto",
    component: () => import("../views/oto/Index.vue")
  }
];

const router = new VueRouter({
  routes,
  linkActiveClass: "active"
});

export default router;
