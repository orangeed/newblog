import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { routerMap } from "./routerMap";

export const basisRoutes: RouteRecordRaw[] = [
  {
    path: routerMap.index,
    component: () => import("../views/home/index.vue"),
    name: "index",
    meta: {
      hidden: false,
      affix: false,
    },
  },

  {
    path: routerMap.notFind,
    component: () => import("../views/error-page/404.vue"),
    name: routerMap.notFind,
    meta: {
      hidden: true,
      affix: false,
    },
  },
  {
    path: routerMap.noJwt,
    component: () => import("../views/error-page/401.vue"),
    name: routerMap.noJwt,
    meta: {
      hidden: true,
      affix: false,
    },
  },

  // {
  //   path: "*",
  //   redirect: "/404",
  //   name: "404",
  //   meta: {
  //     hidden: true,
  //     affix: false,
  //   },
  // },
];

// export const asyncRoute = [
//   {
//     path: "/",
//     component: Layout,
//     name: "index",
//     meta: {
//       hidden: false,
//       affix: false,
//     },
//     redirect: "/dashboard",
//     children: [
//       {
//         path: "/dashboard",
//         name: "dashboard",
//         component: () => import("../views/dashboard/index.vue"),
//         meta: {
//           hidden: false,
//           affix: true, //是否显示在tagsview
//           title: "dashboard",
//         },
//       },
//       {
//         path: "categreg",
//         name: "categreg",
//         component: () => import("../views/home/index.vue"),
//         meta: {
//           hidden: false,
//           affix: false,
//           title: "多级菜单",
//         },
//         children: [
//           {
//             path: "/categregChild",
//             name: "categregChild",
//             component: () => import("../views/dashboard/index.vue"),
//             meta: {
//               hidden: false,
//               affix: false, //是否固定在tagsview
//               title: "三级菜单",
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: "/:pathMatch(.*)*",
//     name: "404",
//     meta: {
//       hidden: true,
//       affix: false,
//     },
//   },
// ];

const router = createRouter({
  history: createWebHistory(),
  routes: basisRoutes,
});

export default router;
