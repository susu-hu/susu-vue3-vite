/*
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-12-29 20:55:33
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-12-29 20:57:22
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
    component: () => import("@/views/echarts/ThreeDBar.vue"),
  },
];
