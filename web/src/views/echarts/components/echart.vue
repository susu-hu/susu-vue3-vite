<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2023-08-07 11:50:13
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2023-08-07 21:33:18
 * @FilePath: \web\src\views\echarts\components\echart.vue
 * @Description: 通用echarts封装
-->
<template>
  <div ref="Chart" class="chart" :style="{ '--w': width, '--h': height }"></div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { debounce } from "@/utils/tools.js";
const props = defineProps({
  //图表宽度
  width: {
    type: Number,
    default: 600,
  },
  // 图表高度
  height: {
    type: Number,
    default: 300,
  },
  // 图片option
  option: {
    type: Object,
    default: () => ({}),
  },
  // 图表事件监听
  chartEvents: {
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
  if (props.option && typeof props.option === "object") {
    mChart.setOption(props.option);
    // 添加事件监听
    props.chartEvents(mChart, props.option);
  }
  console.log(mChart);
};
// 页面卸载
onBeforeUnmount(() => {
  console.log("页面离开");
  window.removeEventListener("resize", resizeChart);
  // 移出事件
  if (mChart.off) {
    // ECharts 的 "off" 方法可以用于取消绑定所有类型的事件。如果要取消绑定所有事件处理函数，可以简单地调用 "off" 方法，而不传递任何参数
    // 这将取消绑定通过 "on" 方法绑定的所有事件处理函数，包括内置的事件类型（如鼠标点击、鼠标移动等），以及自定义的事件类型
    // Eg:mChart.off("click"); mChart.off("mouseover"); mChart.off("mouseout"); mChart.off("mousemove"); mChart.off("dataZoom"); mChart.off("legendselectchanged");
    mChart.off();
  }
  mChart && mChart.dispose(); //销毁echarts实例
  mChart = null;
  console.log("lik", mChart);
});
</script>
<style lang="less" scoped>
.chart {
  width: calc(1px * var(--w));
  height: calc(1px * var(--h));
}
</style>
