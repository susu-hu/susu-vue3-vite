import homeIndex from '@/views/index.vue'
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
    {
        path: "/animation/therm",
        name: "therm",
        component: () => import("@/views/animation/therm.vue"),
        meta: {
            title: "温度计图表",
        },
    },

];

export default routes
