<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-12-29 20:57:17
 * @LastEditors: 胡苏珍 1628469970@qq.com
 * @LastEditTime: 2023-01-17 16:04:10
 * @FilePath: \web\src\views\echarts\ThreeDBar.vue
 * @Description:  立体柱状图
-->
<template>
  <div class="container">
    <div class="sider-item">
      <div class="bar-chart" ref="target"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { fitChartSize } from "@/utils/echartSize";
import { debounce } from "@/utils/tools.js";
import * as echarts from "echarts";
const target = ref(null);
let mChart = null,
  hasData = ref(true);
let dataValue = ref({
  limit1: 10,
  limit2: 15,
  list: [
    {
      code: "标题1",
      value1: 10,
      value2: 2,
    },
    {
      code: "标题2",
      value1: 1,
      value2: 2,
    },
    {
      code: "标题3",
      value1: 5,
      value2: 11,
    },
    {
      code: "标题4",
      value1: 15,
      value2: 11,
    },
    {
      code: "标题4",
      value1: 5,
      value2: 1,
    },
    {
      code: "标题6",
      value1: 22,
      value2: 1,
    },
  ],
});
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
  let XArr = [],
    yData1 = [],
    yData2 = [],
    maxData = [],
    yData1Op = [],
    yData2Op = [],
    str1 = "",
    str2 = "",
    str3 = "";
  let { limit1, limit2, list } = dataValue.value;
  if ((limit1, limit2, list)) {
    list.map((i) => {
      XArr.push(i.code); //x轴数据
      yData1.push(Number(i.value1).toFixed(1)); // 第一条数据
      yData2.push(Number(i.value2).toFixed(1)); // 第二条数据
    });
    // legend显示值
    str1 = "<" + limit1 + "○";
    str2 = limit1 + "~" + limit2 + "○";
    str3 = ">=" + limit2 + "○";
  }
  let zoomShow = yData1.length + yData2.length > 10; //是否展示dataZoom
  let range = [Math.max(...yData1), Math.max(...yData2)];
  // y轴数据最大值(最大值+1之后的1.05倍)
  let maxValue = (Math.max(...range) + 1) * 1.05;
  maxData = new Array(yData1.length).fill(maxValue);
  // 第一条数据透明柱子值
  yData1Op = yData1.map((i) => maxValue - i);
  // 第二条数据透明柱子值
  yData2Op = yData2.map((i) => maxValue - i);
  const colorsLow = [
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
    ],
    colorsLowTop = "#37DAE5"; // 蓝色
  const colorsMiddle = [
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
    ],
    colorsMiddleTop = "#E9CB35"; //黄色
  const colorsHigh = [
      {
        type: "linear",
        x: 1,
        y: 0,
        x2: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: "#DB463B",
          },
          {
            offset: 0.5,
            color: "#F33939",
          },
          {
            offset: 0.5,
            color: "#B51919",
          },
          {
            offset: 1,
            color: "#F33939",
          },
        ],
      },
    ],
    colorsHighTop = "#E53737"; // 红色
  const colorsTransparent = [
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
    ],
    colorsTopBg = "#252f31"; //透明背景柱子
  const legendColor = ["#00FEFF", "#E9CB35", "#DB463B"];
  let barWidth = 16,
    symbolSizeTop = 8,
    symbolOffsetX = 10;
  const options = {
    color: legendColor,
    grid: {
      top: 40,
      left: 0,
      right: 0,
      bottom: 20,
      containLabel: true,
    },
    legend: {
      icon: "rect",
      data: [str1, str2, str3],
      show: true,
      selectedMode: false,
      //图例组件，颜色和名字
      top: "2%",
      right: 0,
      itemGap: 15,
      itemWidth: 12,
      itemHeight: 8,
      textStyle: {
        color: "rgba(255,255,255,0.74)",
        fontStyle: "normal",
        fontSize: 12,
        lineHeight: 12,
        rich: {
          a: {
            verticalAlign: "middle",
          },
        },
        padding: [0, 0, -3, 0],
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
        fontSize: 12,
      },
      axisTick: {
        //坐标轴刻度颜色
        show: false,
      },
    },
    dataZoom: [
      {
        disabled: !zoomShow,
        type: "inside",
        realtime: true,
        startValue: 0,
        endValue: 4,
      },
    ],
    yAxis: {
      min: 0,
      max: hasData.value ? null : 1,
      type: "value",
      //设置网格线颜色
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(255,255,255,.3)",
          type: [3, 3],
          dashOffset: 2,
          width: 1,
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
        fontSize: hasData.value ? 12 : 0,
      },
    },
    series: [
      // 第一条数据进度柱子
      {
        type: "bar",
        barWidth: barWidth,
        stack: "1",
        itemStyle: {
          color: function (e) {
            let color = "";
            switch (true) {
              case e.value < Number(limit1):
                color = colorsLow[0];
                break;
              case e.value >= Number(limit1) && e.value < Number(limit2):
                color = colorsMiddle[0];
                break;
              case e.value >= Number(limit2):
                color = colorsHigh[0];
                break;
              default:
                color = colorsLow[0];
                break;
            }
            return color;
          },
        },
        label: {
          show: true,
          position: "top",
          textAlign: "center",
          fontSize: 12,
          formatter: function (e) {
            let text = "";
            switch (true) {
              case e.value < Number(limit1):
                text = "{a|" + e.value + "}";
                break;
              case e.value >= Number(limit1) && e.value < Number(limit2):
                text = "{b|" + e.value + "}";
                break;
              case e.value >= Number(limit2):
                text = "{c|" + e.value + "}";
                break;
              default:
                text = "{a|" + e.value + "}";
                break;
            }
            return text;
          },
          rich: {
            a: {
              color: legendColor[0],
            },
            b: {
              color: legendColor[1],
            },
            c: {
              color: legendColor[2],
            },
          },
        },
        data: yData1,
      },
      // 第一条数据上面正方形：颜色
      {
        type: "pictorialBar",
        symbol: "diamond",
        symbolSize: [barWidth, symbolSizeTop],
        symbolOffset: [-symbolOffsetX, -symbolSizeTop / 2],
        symbolPosition: "end",
        z: 12,
        itemStyle: {
          color: function (e) {
            let color = "";
            switch (true) {
              case e.value < Number(limit1):
                color = colorsLowTop;
                break;
              case e.value >= Number(limit1) && e.value < Number(limit2):
                color = colorsMiddleTop;
                break;
              case e.value >= Number(limit2):
                color = colorsHighTop;
                break;
              default:
                color = colorsLowTop;
                break;
            }
            return color;
          },
        },
        data: yData1,
      },
      //  第一条数据底部正方形：颜色
      {
        type: "pictorialBar",
        symbol: "diamond",
        symbolSize: [barWidth, symbolSizeTop],
        symbolOffset: [-symbolOffsetX, symbolSizeTop / 2],
        z: 12,
        itemStyle: {
          color: function (e) {
            let color = "";
            switch (true) {
              case e.value < Number(limit1):
                color = colorsLow[0];
                break;
              case e.value >= Number(limit1) && e.value < Number(limit2):
                color = colorsMiddle[0];
                break;
              case e.value >= Number(limit2):
                color = colorsHigh[0];
                break;
              default:
                color = colorsLow[0];
                break;
            }
            return color;
          },
        },
        data: yData1,
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
        data: yData1Op,
        type: "bar",
        barWidth: barWidth,
        stack: "1",
        zlevel: -1,
        itemStyle: {
          opacity: 0.7,
          color: colorsTransparent[0],
        },
      },
      // 第二条数据进度柱子
      {
        type: "bar",
        stack: "2",
        barWidth: barWidth,
        itemStyle: {
          color: function (e) {
            let color = "";
            switch (true) {
              case e.value < Number(limit1):
                color = colorsLow[0];
                break;
              case e.value >= Number(limit1) && e.value < Number(limit2):
                color = colorsMiddle[0];
                break;
              case e.value >= Number(limit2):
                color = colorsHigh[0];
                break;
              default:
                color = colorsLow[0];
                break;
            }
            return color;
          },
        },
        label: {
          show: true,
          position: "top",
          textAlign: "center",
          fontSize: 12,
          formatter: function (e) {
            let text = "";
            switch (true) {
              case e.value < Number(limit1):
                text = "{a|" + e.value + "}";
                break;
              case e.value >= Number(limit1) && e.value < Number(limit2):
                text = "{b|" + e.value + "}";
                break;
              case e.value >= Number(limit2):
                text = "{c|" + e.value + "}";
                break;
              default:
                text = "{a|" + e.value + "}";
                break;
            }
            return text;
          },
          rich: {
            a: {
              color: legendColor[0],
            },
            b: {
              color: legendColor[1],
            },
            c: {
              color: legendColor[2],
            },
          },
        },
        data: yData2,
      },
      // 第二条数据中间正方形:颜色
      {
        type: "pictorialBar",
        symbol: "diamond",
        symbolSize: [barWidth, symbolSizeTop],
        symbolOffset: [symbolOffsetX, -symbolSizeTop / 2],
        symbolPosition: "end",
        z: 12,
        itemStyle: {
          color: function (e) {
            let color = "";
            switch (true) {
              case e.value < Number(limit1):
                color = colorsLowTop;
                break;
              case e.value >= Number(limit1) && e.value < Number(limit2):
                color = colorsMiddleTop;
                break;
              case e.value >= Number(limit2):
                color = colorsHighTop;
                break;
              default:
                color = colorsLowTop;
                break;
            }
            return color;
          },
        },
        data: yData2,
      },
      // 第二条数据底部正方形
      {
        name: "",
        type: "pictorialBar",
        symbol: "diamond",
        symbolSize: [barWidth, symbolSizeTop],
        symbolOffset: [symbolOffsetX, symbolSizeTop / 2],
        itemStyle: {
          color: function (e) {
            let color = "";
            switch (true) {
              case e.value < Number(limit1):
                color = colorsLow[0];
                break;
              case e.value >= Number(limit1) && e.value < Number(limit2):
                color = colorsMiddle[0];
                break;
              case e.value >= Number(limit2):
                color = colorsHigh[0];
                break;
              default:
                color = colorsLow[0];
                break;
            }
            return color;
          },
        },
        z: 12,
        data: yData2,
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
        data: yData2Op,
        type: "bar",
        barWidth: barWidth,
        stack: "2",
        zlevel: -1,
        itemStyle: {
          opacity: 0.5,
          color: colorsTransparent[0],
        },
      },
      // legend展示数据
      {
        name: str1,
        type: "line",
      },
      {
        name: str2,
        type: "line",
      },
      {
        name: str3,
        type: "line",
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
.container {
  height: 100%;
  padding: 30px;
  .sider-item {
    width: 356px;
    // 添加背景颜色
    background: rgba(0, 58, 75, 0.2);
    box-shadow: inset 0px 0px 6px 4px rgba(45, 179, 220, 0.3);
    border-radius: 4px;
    border: 1px solid rgba(11, 133, 170, 0.32);
    margin: 0 auto;
    .bar-chart {
      width: 326px;
      height: 250px;
      margin: 0 auto;
    }
  }
}
</style>
