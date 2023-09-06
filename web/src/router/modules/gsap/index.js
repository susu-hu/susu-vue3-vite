export default [
  {
    path: "/gasp/digitalScroll",
    name: "digitalScroll",
    meta: {
      title: "",
    },
    component: () => import("@/views/gsap/digitalScroll.vue"),
  },
  {
    path: "/gasp/digitalScrollBg",
    name: "digitalScrollBg",
    meta: {
      title: "",
    },
    component: () => import("@/views/gsap/digitalScrollBg.vue"),
  },
];
