
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: "/ReadoutsAll",
        name: "ReadoutsAll",
        component: () => import("pages/ReadoutsAll.vue"),
      },
      {
        path: "/ReadoutsChart",
        name: "ReadoutsChart",
        component: () => import("pages/ReadoutsChart.vue"),
      },
      {
        path: "/StatisticInfo",
        name: "StatisticInfo",
        component: () => import("pages/StatisticInfo.vue"),
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
