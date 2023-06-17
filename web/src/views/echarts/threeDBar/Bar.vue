<template>
  <Echart :width="width" :height="height" :option="getFullOptions()" />
</template>
<script setup>
import Echart from "../components/echart.vue";
import { merge } from "lodash";
import { BASIC_OPTION } from "./defaultOption";
import { fitChartSize } from "@/utils/echartSize";
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

// 传入数据生成 option
const getFullOptions = () => {
  let data = props.data.yData;
  let colorArr = ["#2886c6", "#50bfda", "#89e3ec"];
  // let colorArr = ["#eec06a", "#d9b470", "#d2bb90"];
  let color = {
    type: "linear",
    x: 0,
    x2: 1,
    y: 0,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: colorArr[0],
      },
      {
        offset: 0.5,
        color: colorArr[0],
      },
      {
        offset: 0.5,
        color: colorArr[1],
      },
      {
        offset: 1,
        color: colorArr[1],
      },
    ],
  };
  let barWidth = fitChartSize(18);
  let zeroData = [], //0值
    showData = []; //非0
  data.map((item) => {
    if (item) {
      zeroData.push(1);
      showData.push(item);
    } else {
      zeroData.push(0);
      showData.push({
        value: 0,
        itemStyle: {
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 2,
          color: "rgba(0,0,0,0)",
        },
      });
    }
  });
  let o = {
    xAxis: {
      data: props.data.xData,
    },
    series: [
      {
        z: 1,
        name: "数据",
        type: "bar",
        barWidth: barWidth,
        barGap: "0%",
        data: data,
        itemStyle: {
          color: color,
        },
      },
      {
        z: 2,
        name: "数据",
        type: "pictorialBar",
        data: zeroData,
        symbol: "diamond",
        symbolOffset: ["0%", "50%"],
        symbolSize: [barWidth, barWidth * 0.5],
        itemStyle: {
          color: color,
        },
        tooltip: {
          show: false,
        },
      },
      {
        z: 3,
        name: "数据",
        type: "pictorialBar",
        symbolPosition: "end",
        data: showData,
        symbol: "diamond",
        symbolOffset: ["0%", "-50%"],
        symbolSize: [barWidth, barWidth * 0.5],
        itemStyle: {
          borderColor: colorArr[2],
          borderWidth: 2,
          color: colorArr[2],
        },
        tooltip: {
          show: false,
        },
      },
    ],
  };
  // console.log(merge({}, BASIC_OPTION, o, props.extraOption));
  return merge({}, BASIC_OPTION, o, props.extraOption);
};
</script>
