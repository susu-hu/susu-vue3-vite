<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-12-29 20:57:17
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-12-29 21:06:25
 * @FilePath: \web\src\views\echarts\ThreeDBar.vue
 * @Description:  立体柱状图
-->
<template>
  <div class="sider-item">
    <div class="bar-chart" ref="target"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { fitChartSize } from "@/utils/echartSize";
import { debounce } from "@/utils/tools.js";
import * as echarts from "echarts";
const target = ref(null);
let mChart = null;
onMounted(() => {
  mChart = echarts.init(target.value);
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
  // legend
  const XArr = ["1#1支架", "2#2支架", "3#3支架", "4#4支架"],
    warnValue = 55;
  let str1 = "<" + 25.2 + "Mpa";
  let str2 = 25.2 + "~" + 40 + "Mpa";
  let str3 = ">=" + 40 + "Mpa";
  let maxData = [60, 60, 60, 60, 60],
    maxValue = 60;
  // 第一条数据
  let zzx1 = [25, 12, 13, 12];
  let zx = zzx1.map((item) => {
    return maxValue - item;
  });
  // 第二条数据
  let wgx1 = [36, 32, 34, 32];
  let wg = wgx1.map((item) => {
    return maxValue - item;
  });
  // 黄色
  const colors = [
    {
      type: "linear",
      x: 1,
      y: 0,
      x2: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: "#EED743",
        },
        {
          offset: 0.5,
          color: "#D6B628",
        },
        {
          offset: 0.5,
          color: "#B59819",
        },
        {
          offset: 1,
          color: "#DABB35",
        },
      ],
    },
  ];
  // 蓝色
  const colorsPlan = [
    {
      type: "linear",
      x: 1,
      y: 0,
      x2: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: "#68F4EF",
        },
        {
          offset: 0.5,
          color: "#37D6E5",
        },
        {
          offset: 0.5,
          color: "#19A5B5",
        },
        {
          offset: 1,
          color: "#35C2DA",
        },
      ],
    },
  ];
  //透明背景柱子颜色
  const colorsBg = [
    {
      type: "linear",
      x: 1,
      y: 0,
      x2: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: "rgba(255,255,255,.12)",
        },
        {
          offset: 0.5,
          color: "rgba(255,255,255,.4)",
        },
        {
          offset: 0.5,
          color: "rgba(255,255,255,.12)",
        },
        {
          offset: 1,
          color: "rgba(255,255,255,.4)",
        },
      ],
    },
  ];
  //透明背景柱子顶部颜色
  const colorsTopBg = "#252f31";
  let barWidth = fitChartSize(16),
    labelXPosition = fitChartSize(1),
    symbolSizeTop = fitChartSize(8),
    symbolOffsetX = fitChartSize(10);
  const options = {
    color: ["#00FEFF", "#E9CB35", "#DB463B"],
    grid: {
      top: fitChartSize(40),
      left: 0,
      right: 0,
      bottom: fitChartSize(20),
      containLabel: true,
    },
    legend: {
      icon: "rect",
      data: [str1, str2, str3],
      show: true,
      selectedMode: false,
      //图例组件，颜色和名字
      top: "2%",
      itemGap: fitChartSize(15),
      itemWidth: fitChartSize(12),
      itemHeight: fitChartSize(8),
      textStyle: {
        color: "rgba(255,255,255,0.74)",
        fontStyle: "normal",
        fontSize: fitChartSize(12),
      },
    },
    xAxis: {
      type: "category",
      data: XArr,
      axisLine: {
        //坐标轴线颜色
        lineStyle: {
          color: "#626361",
        },
      },
      splitNumber: 4,
      interval: 4,
      boundaryGap: ["8%", "8%"],
      axisLabel: {
        color: "rgba(255,255,255,.9)", //坐标的字体颜色
        fontSize: fitChartSize(12),
      },
      axisTick: {
        //坐标轴刻度颜色
        show: false,
      },
    },
    yAxis: {
      min: 0,
      type: "value",
      //设置网格线颜色
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(255,255,255,.3)",
          type: [fitChartSize(3), fitChartSize(3)],
          dashOffset: fitChartSize(2),
          width: fitChartSize(1),
        },
      },
      axisTick: {
        //坐标轴刻度颜色
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: "rgba(255,255,255,.9)", //坐标的字体颜色
        fontSize: fitChartSize(12),
      },
    },
    series: [
      // 第一条数据进度柱子
      {
        type: "bar",
        barWidth: barWidth,
        stack: "1",
        itemStyle: {
          color: colorsPlan[0],
          borderRadius: 0,
        },
        label: {
          show: true,
          position: [labelXPosition, fitChartSize(-20)],
          color: "#00f8ff", //蓝色
          fontSize: fitChartSize(12),
        },
        data: zzx1,
      },
      // 第一条数据上面正方形：颜色
      {
        type: "pictorialBar",
        symbol: "diamond",
        symbolSize: [barWidth, symbolSizeTop],
        symbolOffset: [-symbolOffsetX, -symbolSizeTop / 2],
        symbolPosition: "end",
        z: 12,
        color: "#37DAE5",
        data: zzx1,
      },
      //  第一条数据底部正方形：颜色
      {
        type: "pictorialBar",
        symbol: "diamond",
        symbolSize: [barWidth, symbolSizeTop],
        symbolOffset: [-symbolOffsetX, symbolSizeTop / 2],
        z: 12,
        color: colorsPlan[0],
        data: zzx1,
      },
      // 第一条数据上部正方形:透明背景
      {
        data: maxData,
        type: "pictorialBar",
        symbol: "diamond",
        symbolSize: [barWidth, symbolSizeTop],
        symbolOffset: [-symbolOffsetX, -symbolSizeTop / 2],
        color: colorsTopBg,
        symbolPosition: "end",
      },
      // 第一条数据底部柱子:透明背景
      {
        data: zx,
        type: "bar",
        barWidth: barWidth,
        stack: "1",
        zlevel: -1,
        itemStyle: {
          opacity: 0.7,
          color: colorsBg[0],
          borderRadius: 0,
        },
      },
      // 第二条数据进度柱子
      {
        type: "bar",
        stack: "2",
        barWidth: barWidth,
        itemStyle: {
          color: colors[0],
        },
        label: {
          show: true,
          position: [labelXPosition, fitChartSize(-20)],
          color: "#E9CB35", //黄色
          fontSize: fitChartSize(12),
        },
        data: wgx1,
      },
      // 第二条数据中间正方形:颜色
      {
        type: "pictorialBar",
        symbol: "diamond",
        symbolSize: [barWidth, symbolSizeTop],
        symbolOffset: [symbolOffsetX, -symbolSizeTop / 2],
        symbolPosition: "end",
        z: 12,
        color: "#E5CD37",
        data: wgx1,
      },
      // 第二条数据底部正方形
      {
        name: "",
        type: "pictorialBar",
        symbol: "diamond",
        symbolSize: [barWidth, symbolSizeTop],
        symbolOffset: [symbolOffsetX, symbolSizeTop / 2],
        color: colors[0],
        z: 12,
        data: wgx1,
      },
      // 第二条数据上部正方形:透明背景
      {
        data: maxData,
        type: "pictorialBar",
        symbol: "diamond",
        symbolSize: [barWidth, symbolSizeTop],
        symbolOffset: [symbolOffsetX, -symbolSizeTop / 2],
        color: colorsTopBg,
        symbolPosition: "end",
      },
      // 第二条数据底部柱子:透明背景
      {
        data: wg,
        type: "bar",
        barWidth: barWidth,
        stack: "2",
        zlevel: -1,
        itemStyle: {
          opacity: 0.5,
          color: colorsBg[0],
          borderRadius: 0,
        },
      },
      {
        // 临界值-超标线
        name: str1,
        markLine: {
          silent: true,
          symbol: false,
          label: {
            fontSize: fitChartSize(12),
            position: "insideEndTop",
            fontWeight: 200,
            color: "#FF5757",
          },
          data: [
            {
              yAxis: warnValue,
              lineStyle: {
                color: "#FF5757",
                type: [fitChartSize(3), fitChartSize(3)],
                dashOffset: fitChartSize(2),
                width: fitChartSize(1),
              },
            },
          ],
        },
        type: "line",
        smooth: true,
        animationDuration: 2000,
      },
      {
        // 临界值-超标线
        name: str2,
        markLine: {
          silent: true,
          symbol: false,
          label: {
            fontSize: fitChartSize(12),
            position: "insideEndTop",
            fontWeight: 200,
            color: "#FF5757",
          },
          data: [
            {
              yAxis: warnValue,
              lineStyle: {
                color: "#FF5757",
                type: [fitChartSize(3), fitChartSize(3)],
                dashOffset: fitChartSize(2),
                width: fitChartSize(1),
              },
            },
          ],
        },
        type: "line",
        smooth: true,
        animationDuration: 2000,
      },
      {
        // 临界值-超标线
        name: str3,
        markLine: {
          silent: true,
          symbol: false,
          label: {
            fontSize: fitChartSize(12),
            position: "insideEndTop",
            fontWeight: 200,
            color: "#FF5757",
          },
          data: [
            {
              yAxis: warnValue,
              lineStyle: {
                color: "#FF5757",
                type: [fitChartSize(3), fitChartSize(3)],
                dashOffset: fitChartSize(2),
                width: fitChartSize(1),
              },
            },
          ],
        },
        type: "line",
        smooth: true,
        animationDuration: 2000,
      },
    ],
  };
  mChart.setOption(options);
};
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
});
</script>
<style lang="less" scoped>
.sider-item {
  width: 356px;
  // 添加背景颜色
  background: rgba(0, 58, 75, 0.2);
  box-shadow: inset 0px 0px 6px 4px rgba(45, 179, 220, 0.3);
  border-radius: 4px;
  border: 1px solid rgba(11, 133, 170, 0.32);
  margin: 30px auto;
}
.bar-chart {
  width: 326px;
  height: 250px;
  margin: 0 auto;
}
</style>
