<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2023-08-07 11:50:13
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2023-10-17 11:59:41
 * @FilePath: \web\src\views\echarts\components\echart.vue
 * @Description: 通用echarts封装
-->
<template>
  <div
    ref="Chart"
    :class="['chart', { full: isCarpeted }]"
    :style="{ '--w': width, '--h': height }"
  ></div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import * as echarts from "echarts";
import { debounce } from "lodash";
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
  // 图表option方法
  option: {
    type: Function,
    default: () => () => {},
    required: true,
  },
  // 图表事件监听
  chartEvents: {
    type: Function,
    default: () => () => {},
  },
  isDispose: {
    type: Boolean,
    default: false,
  },
  // 是否铺满父元素
  isCarpeted: {
    type: Boolean,
    default: false,
  },
});
const Chart = ref(null);
let mChart = null;
onMounted(() => {
  mChart = echarts.init(Chart.value);
  console.log(1);
  renderChart();
  window.addEventListener("resize", debounce(resizeChart, 300));
});
watch(
  () => props.option(),
  (n) => {
    console.log("bbbb", n);
    if (!n) return;
    console.log(2);
    if (props.isDispose) {
      console.log("sdsfsf");
      // mChart && mChart.clear(); //清空当前实例，会移除实例中所有的组件和图表
      mChart && mChart.dispose(); //销毁echarts实例
      // console.log(mChart.isDisposed());
      mChart = echarts.init(Chart.value);
      // console.log(mChart.isDisposed());
    }
    nextTick(() => {
      // mChart && renderChart();
      mChart && resizeChart();
    });
  },
);
const resizeChart = () => {
  if (mChart) {
    mChart.resize();
    console.log(3);
    renderChart(); //重新渲染图表文字大小等
  }
};
// 渲染图表
const renderChart = () => {
  const _option = props.option();
  console.log(_option);
  if (_option && typeof _option === "object") {
    mChart.setOption(_option);
    props.chartEvents(mChart, _option); // 添加事件监听
  }
};
// 页面卸载
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  mChart.off && mChart.off(); // 移除事件
  mChart && mChart.dispose(); //销毁echarts实例
  mChart = null;
});
</script>
<style lang="less" scoped>
.chart {
  width: calc(1px * var(--w));
  height: calc(1px * var(--h));
  &.full {
    width: 100%;
    height: 100%;
  }
}
</style>
