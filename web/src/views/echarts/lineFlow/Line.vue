<template>
  <div class="container">
    <div ref="Chart" class="chart"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { debounce } from "@/utils/tools.js";
import { merge } from "lodash";
import { BASIC_OPTION } from "./defaultOption";
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
    required: true,
  },
  extraOption: {
    type: Object,
    default: () => {},
  },
});
const themeColor = {
  // shadowColor: "rgba(0,204,169,0.95)",
  // lineColor: "#00CCA9",
  // itemStyleColor: "#021E47",
  // areaStyle: [
  //   "rgba(0,204,169,0.3)",
  //   "rgba(0, 204, 170, 0.5)",
  //   "rgba(0,204,169,0)",
  // ],
  shadowColor: "rgba(220,120,40,0.95)",
  lineColor: "#DC7828",
  itemStyleColor: "#021E47",
  areaStyle: [
    "rgba(220,120,40,0.3)",
    "rgba(220,120,40,0.5)",
    "rgba(220,120,40,0)",
  ],
};
let datacoords = [
  {
    coords: [],
  },
];
for (let i = 0; i < props.data.xData.length; i++) {
  datacoords[0].coords.push([props.data.xData[i], props.data.yData[i]]);
}
const Chart = ref(null);
let mChart = null;
onMounted(() => {
  mChart = echarts.init(Chart.value);
  renderChart();
  window.addEventListener("resize", debounce(resizeChart, 300));
});
const resizeChart = () => {
  if (mChart) {
    mChart.resize();
    renderChart();
  }
};
// 渲染图表
const renderChart = () => {
  const option = getFullOptions();

  if (option && typeof option === "object") {
    mChart.setOption(option);
  }
};
const getFullOptions = () => {
  let o = {
    xAxis: [
      {
        data: props.data.xData,
      },
    ],
    series: [
      {
        // name: "苏苏的折线图",
        // type: "line",
        // smooth: 0, //可设置弧度，0-1
        lineStyle: {
          // width: 1.5,
          // type: "solid",
          // shadowOffsetX: 0, // 折线的X偏移
          // shadowOffsetY: 3, // 折线的Y偏移
          // shadowBlur: 4, // 折线模糊
          shadowColor: themeColor.shadowColor, //阴影色
          color: themeColor.lineColor, //折线颜色
        },
        // showSymbol: true,
        // symbol: "circle",
        // symbolSize: 8,
        itemStyle: {
          color: themeColor.itemStyleColor, //实心的圆点的背景颜色------圆透明！！！！！！！
          // borderWidth: 1,
          borderColor: themeColor.lineColor, //与折线颜色一致
        },
        areaStyle: {
          // 颜色渐变函数 前四个参数分别表示四个位置依次为---右下左上
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 1,
              color: themeColor.areaStyle[0],
            },
            {
              offset: 0.74,
              color: themeColor.areaStyle[1],
            },
            {
              offset: 0,
              color: themeColor.areaStyle[2],
            },
          ]),
        },
        // emphasis: {
        //   focus: "series",
        // },
        data: props.data.yData,
      },
      // 以下代码为流光效果-配置项代码
      {
        // polyline: true,
        // showSymbol: false,
        // name: "流动光线",
        // type: "lines",
        // coordinateSystem: "cartesian2d",
        // effect: {
        //   trailLength: 0.3,
        //   show: true,
        //   period: 6,
        //   symbolSize: 4,
        //   loop: true,
        // },
        // lineStyle: {
        //   color: "#fff",
        //   width: 0,
        //   opacity: 0,
        //   curveness: 0,
        //   type: "dashed",
        // },
        data: datacoords,
      },
    ],
  };
  console.log(merge({}, BASIC_OPTION, o, props.extraOption));
  return merge({}, BASIC_OPTION, o, props.extraOption);
};
// 传入数据生成 option
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
});
</script>
<style lang="less" scoped>
.container {
  width: 600px;
  height: 300px;
  position: relative;
  margin: 40px auto;
}

.chart {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}
</style>
