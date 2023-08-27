<template>
  <Echart :width="width" :height="height" :option="getFullOptions" />
</template>
<script setup>
import Echart from "../components/Echart.vue";
import * as echarts from "echarts";
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
  width: {
    type: Number,
    default: 600,
  },
  height: {
    type: Number,
    default: 300,
  },
});
const getFullOptions = () => {
  const themeColor = {
    shadowColor: "rgba(0,204,169,0.95)",
    lineColor: "#00CCA9",
    itemStyleColor: "#021E47",
    areaStyle: [
      "rgba(0,204,169,0.3)",
      "rgba(0, 204, 170, 0.5)",
      "rgba(0,204,169,0)",
    ],
    // shadowColor: "rgba(220,120,40,0.95)",
    // lineColor: "#DC7828",
    // itemStyleColor: "#021E47",
    // areaStyle: [
    //   "rgba(220,120,40,0.3)",
    //   "rgba(220,120,40,0.5)",
    //   "rgba(220,120,40,0)",
    // ],
  };
  let datacoords = [
    {
      coords: [],
    },
  ];
  for (let i = 0; i < props.data.xData.length; i++) {
    datacoords[0].coords.push([props.data.xData[i], props.data.yData[i]]);
  }
  let _option = {
    xAxis: [
      {
        data: props.data.xData,
      },
    ],
    series: [
      {
        lineStyle: {
          shadowColor: themeColor.shadowColor, //阴影色
          color: themeColor.lineColor, //折线颜色
        },
        itemStyle: {
          color: themeColor.itemStyleColor,
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
        data: props.data.yData,
      },
      // 以下代码为流光效果
      {
        data: datacoords,
      },
    ],
  };
  return merge({}, BASIC_OPTION(), _option, props.extraOption);
};
</script>
