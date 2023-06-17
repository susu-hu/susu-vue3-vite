import * as echarts from "echarts";
import { fitChartSize } from "@/utils/echartSize";
export const BASIC_OPTION = {
  animationDuration: 3000,
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(0,0,0,.5)", //tooltip背景色
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "rgba(0,0,0,.5)", //label标签颜色
      },
    },
    textStyle: {
      color: "#fff",
      fontSize: fitChartSize(14),
    },
  },
  grid: {
    left: "0%", //图表距边框的距离
    right: "3%",
    top: "11%",
    bottom: "2%",
    containLabel: true,
  },
  xAxis: [
    {
      nameGap: 3, //坐标轴名称与轴线之间的距离。
      nameTextStyle: {
        color: "rgba(255,255,255,.8)",
        fontSize: fitChartSize(12),
      },
      type: "category",
      boundaryGap: false, //从0开始
      axisLine: {
        //坐标轴线颜色
        rotate: fitChartSize(30), //坐标轴内容过长旋转
        interval: 0,
        lineStyle: {
          color: "#636E7C", // x轴线条颜色
        },
      },
      axisLabel: {
        showMaxLabel: true,
        fontSize: fitChartSize(12),
        color: "rgba(255,255,255,.8)", //坐标的字体颜色
      },
      axisTick: {
        //是否显示坐标轴刻度  x和y不交叉
        show: false,
      },
    },
  ],
  yAxis: [
    {
      name: "折线流光图",
      type: "value",
      nameGap: fitChartSize(20),
      min: 0,
      max: function (value) {
        return Math.ceil(value.max / 5) * 5;
      },
      splitNumber: 5,
      nameTextStyle: {
        //坐标轴字体
        color: "rgba(255,255,255,.89)",
        fontSize: fitChartSize(12),
      },
      splitLine: {
        //网格线颜色
        show: true,
        lineStyle: {
          color: "rgba(255,255,255,.25)",
          type: "dashed",
        },
      },
      axisTick: {
        //是否显示坐标轴刻度
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
  ],
  series: [
    {
      name: "苏苏的折线图",
      type: "line",
      smooth: 0, //可设置弧度，0-1
      lineStyle: {
        width: fitChartSize(1.5),
        type: "solid",
        shadowOffsetX: 0, // 折线的X偏移
        shadowOffsetY: fitChartSize(3), // 折线的Y偏移
        shadowBlur: fitChartSize(4), // 折线模糊
        shadowColor: "rgba(220,120,40,0.95)", //阴影色
        color: "#DC7828", //折线颜色
      },
      showSymbol: true,
      symbol: "circle",
      symbolSize: fitChartSize(8),
      itemStyle: {
        color: "#021E47", //实心的圆点的背景颜色------圆透明！！！！！！！
        borderWidth: fitChartSize(1),
        borderColor: "#DC7828", //与折线颜色一致
      },
      areaStyle: {
        // 颜色渐变函数 前四个参数分别表示四个位置依次为---右下左上
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          {
            offset: 1,
            color: "rgba(220,120,40,0.3)",
          },
          {
            offset: 0.74,
            color: "rgba(220,120,40,0.5)",
          },
          {
            offset: 0,
            color: "rgba(220,120,40,0)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
    },
    //流光效果-配置项代码
    {
      polyline: true,
      showSymbol: false,
      name: "流动光线",
      type: "lines",
      coordinateSystem: "cartesian2d",
      effect: {
        trailLength: 0.3,
        show: true,
        period: fitChartSize(6),
        symbolSize: fitChartSize(4),
        loop: true,
      },
      lineStyle: {
        color: "#fff",
        width: 0,
        opacity: 0,
        curveness: 0,
        type: "dashed",
      },
    },
  ],
};
