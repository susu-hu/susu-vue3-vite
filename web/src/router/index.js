import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const title = "苏苏就是小苏苏哇" + (to.meta.title ? "-" + to.meta.title : "");
  document.title = title;
  next();
});
router.afterEach((to, from) => {
  // 路由加载完成后关闭进度条
  window.scrollTo(0, 0);
});
export default router;
