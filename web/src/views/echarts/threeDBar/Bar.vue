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
  const option = getFullOptions();
  if (option && typeof option === "object") {
    mChart.setOption(option);
  }
};
const getFullOptions = () => {
  let data = props.data.yData;
  // let colorArr = ["#2886c6", "#50bfda", "#89e3ec"];
  let colorArr = ["#eec06a", "#d9b470", "#d2bb90"];
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
  data.filter((item) => {
    if (item) {
      zeroData.push(1);
      showData.push(item);
    } else {
      zeroData.push(0);
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
