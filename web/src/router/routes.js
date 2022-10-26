import homeIndex from '@/views/index.vue';
import animation from './modules/animation';
import base from './modules/base';
// 配置项目中没有涉及权限的公共路由
const routes = [
    {
        name: 'index',
        path: '/',
        component: homeIndex,
        meta: {
            title: "首页",
        },
        // children: [
        //     {
        //         path: "",
        //         name: "",
        //         component: () => import(""),
        //         meta: {
        //             title: "",
        //         },
        //     },
        // ],
    },
    ...animation,
    ...base,
];

export default routes


