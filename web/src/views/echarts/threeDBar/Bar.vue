<template>
  <div ref="Chart" class="chart" :style="{ '--w': width, '--h': height }"></div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { debounce } from "@/utils/tools.js";
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
  // const option = getFullOptions();
  let data = props.data.yData;
  let colorArr = ["#2886c6", "#50bfda", "#89e3ec"];
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
  let constData = [];
  let showData = [];
  data.filter(function (item) {
    if (item) {
      constData.push(1);
      showData.push(item);
    } else {
      constData.push(0);
      showData.push({
        value: 1,
        itemStyle: {
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 2,
          color: "rgba(0,0,0,0)",
        },
      });
    }
  });
  const option = {
    animationDuration: 3000,
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,.5)",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "rgba(0,0,0,.5)",
        },
      },
      textStyle: {
        color: "#fff",
        fontSize: fitChartSize(14),
      },
    },
    grid: {
      left: "3%", //图表距边框的距离
      right: "3%",
      top: "4%",
      bottom: "2%",
      containLabel: true,
    },
    xAxis: {
      data: props.data.xData,
      axisTick: {
        show: false,
      },
      axisLine: {
        //坐标轴线颜色
        show: true,
        lineStyle: {
          color: "#636E7C",
        },
      },
      axisLabel: {
        color: "rgba(255,255,255,.8)", //坐标的字体颜色
        fontSize: fitChartSize(12),
      },
    },
    yAxis: {
      axisLine: {
        //坐标轴线颜色
        show: true,
        lineStyle: {
          color: "#636E7C",
        },
      },
      axisLabel: {
        color: "rgba(255,255,255,.8)", //坐标的字体颜色
        fontSize: fitChartSize(12),
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(255,255,255,.25)",
          type: "dashed",
        },
        //网格线颜色
      },
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
        data: constData,
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
  if (option && typeof option === "object") {
    mChart.setOption(option);
  }
};
const getFullOptions = () => {
  let o = {};
  console.log(merge({}, BASIC_OPTION, o, props.extraOption));
  return merge({}, BASIC_OPTION, o, props.extraOption);
};
// 传入数据生成 option
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
});
</script>
<style lang="less" scoped>
.chart {
  width: calc(1px * var(--w));
  height: calc(1px * var(--h));
}
</style>
