import * as echarts from "echarts";
import { fitChartSize } from "@/utils/echartSize";
export const BASIC_OPTION = {
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
};
