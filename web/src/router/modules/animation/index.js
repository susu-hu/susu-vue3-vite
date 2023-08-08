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
    component: () => import("@/views/animation/Dot.vue"),
    meta: {
      title: "dot",
    },
  },
  {
    path: "/animation/dot2",
    name: "dot2",
    component: () => import("@/views/animation/Dot2.vue"),
    meta: {
      title: "dot2",
    },
  },
];
