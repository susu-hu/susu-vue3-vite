/*
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-12-29 20:55:33
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2023-08-05 23:27:06
 * @FilePath: \web\src\router\modules\echarts\index.js
 * @Description: echarts图表
 */
export default [
  {
    path: "/echarts/threeDBar",
    name: "threeDBar",
    meta: {
      title: "",
    },
    component: () => import("@/views/echarts/threeDBar/Index.vue"),
  },
  {
    path: "/echarts/threeDPie",
    name: "threeDPie",
    meta: {
      title: "",
    },
    component: () => import("@/views/echarts/threeDPie/Index.vue"),
  },
  {
    path: "/echarts/lineFlow",
    name: "lineFlow",
    meta: {
      title: "",
    },
    component: () => import("@/views/echarts/lineFlow/Index.vue"),
  },
];
