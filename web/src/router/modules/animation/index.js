export default [
  {
    path: "/animation/therm",
    name: "therm",
    component: () => import("@/views/animation/therm.vue"),
    meta: {
      title: "温度计图表",
    },
  },
  {
    path: "/animation/dot",
    name: "dot",
    component: () => import("@/views/animation/dot.vue"),
    meta: {
      title: "dot",
    },
  },
  {
    path: "/animation/dot2",
    name: "dot2",
    component: () => import("@/views/animation/dot2.vue"),
    meta: {
      title: "dot2",
    },
  },
  {
    path: "/animation/numScroll",
    name: "numScroll",
    component: () => import("@/views/animation/numScroll.vue"),
    meta: {
      title: "numScroll",
    },
  },
  {
    path: "/animation/bubbles",
    name: "bubbles",
    component: () => import("@/views/animation/bubbles.vue"),
    meta: {
      title: "bubbles",
    },
  },
];
