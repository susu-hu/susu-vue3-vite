<template>
  <Echart :width="width" :height="height" :option="getFullOptions" />
</template>
<script setup>
import { ref, watch } from "vue";
import Echart from "../components/Echart.vue";
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
const hasData = ref(true);
watch(
  () => props.data,
  async (n) => {
    hasData.value = false;
    if (n?.list) {
      hasData.value = true;
    } else {
      hasData.value = false;
    }
  },
  { immediate: true, deep: true },
);
// 传入数据生成 option
const getFullOptions = () => {
  let XArr = [],
    yData1 = [],
    yData2 = [],
    maxData = [],
    yData1Op = [],
    yData2Op = [],
    str1 = "",
    str2 = "",
    str3 = "";
  let { limit1, limit2, list } = props.data;
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
  let barWidth = fitChartSize(16),
    symbolSizeTop = fitChartSize(8),
    symbolOffsetX = fitChartSize(10);
  const _option = {
    color: legendColor,
    legend: {
      data: [str1, str2, str3],
    },
    xAxis: {
      data: XArr,
    },
    dataZoom: [
      {
        disabled: !zoomShow,
        type: "inside",
        realtime: true,
        startValue: 0,
        endValue: fitChartSize(4),
      },
    ],
    yAxis: {
      max: hasData.value ? null : 1,
      axisLabel: {
        color: "rgba(255,255,255,.9)", //坐标的字体颜色
        fontSize: hasData.value ? fitChartSize(12) : 0,
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
          fontSize: fitChartSize(12),
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
          fontSize: fitChartSize(12),
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
  return merge({}, BASIC_OPTION(), _option, props.extraOption);
};
</script>
