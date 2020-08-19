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
  }
];

const router = new VueRouter({
  routes,
  linkActiveClass: "active"
});

export default router;
