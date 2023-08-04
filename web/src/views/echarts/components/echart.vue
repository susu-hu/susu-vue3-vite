<template>
  <div ref="Chart" class="chart" :style="{ '--w': width, '--h': height }"></div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { debounce } from "@/utils/tools.js";
const props = defineProps({
  width: {
    type: Number,
    default: 600,
  },
  height: {
    type: Number,
    default: 300,
  },
  getFullOptions: {
    type: Function,
    default: () => () => {},
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
  // 传入数据生成 option
  const option = props.getFullOptions();
  if (option && typeof option === "object") {
    mChart.setOption(option);
  }
};
// 页面卸载
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  mChart.dispose(); //销毁echarts实例
});
</script>
<style lang="less" scoped>
.chart {
  width: calc(1px * var(--w));
  height: calc(1px * var(--h));
}
</style>
