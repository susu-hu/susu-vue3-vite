<template>
  <div class="container" :data-num="totalNum">
    <div ref="Chart" class="chart"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import "echarts-gl";
import * as echarts from "echarts";
import { debounce } from "@/utils/tools.js";
import { fitChartSize } from "@/utils/echartSize";
const COLORS = [
  "#2B99EE",
  "#EB7A6A",
  "#4FED7D",
  "#47D8E1",
  "#E1CD47",
  "#4F5AED",
  "#E19D47",
];
const data = [
  {
    name: "测试1",
    value: 160,
  },
  {
    name: "测试2",
    value: 244,
  },
  {
    name: "测试3",
    value: 332,
  },
  {
    name: "测试4",
    value: 400,
  },
  {
    name: "测试5",
    value: 19,
  },
];
const totalNum = 300;
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
  let option = getPie3D(data, 0.75);
  if (option && typeof option === "object") {
    mChart.setOption(option);
  }
  // 添加事件监听
  listenEvent(mChart, option);
};
// 生成扇形的曲面参数方程
const getParametricEquation = (
  startRatio,
  endRatio,
  isSelected,
  isHovered,
  k,
  h,
) => {
  // 计算
  const midRatio = (startRatio + endRatio) / 2;
  const startRadian = startRatio * Math.PI * 2;
  const endRadian = endRatio * Math.PI * 2;
  const midRadian = midRatio * Math.PI * 2;
  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== "undefined" ? k : 1 / 3;
  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1;
  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },
    x(u, v) {
      if (u < startRadian) {
        return (
          offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    y(u, v) {
      if (u < startRadian) {
        return (
          offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    z(u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      // 当前图形的高度是Z根据h（每个value的值决定的）
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
};
// 生成模拟 3D 饼图的配置项
const getPie3D = (pieData, internalDiameterRatio) => {
  const series = [];
  // 总和
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  const legendData = [];
  const k =
    typeof internalDiameterRatio !== "undefined"
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3;
  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i += 1) {
    sumValue += pieData[i].value;
    const seriesItem = {
      name:
        typeof pieData[i].name === "undefined"
          ? `series${i}`
          : pieData[i].name + "  " + pieData[i].value,

      type: "surface",
      parametric: true,
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k,
      },
    };
    if (typeof pieData[i].itemStyle !== "undefined") {
      const { itemStyle } = pieData[i];
      typeof pieData[i].itemStyle.color !== "undefined"
        ? (itemStyle.color = pieData[i].itemStyle.color)
        : null;
      typeof pieData[i].itemStyle.opacity !== "undefined"
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null;
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }
  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i += 1) {
    endValue = startValue + series[i].pieData.value;
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      // ，使除了第一个之外的值都是10
      series[i].pieData.value === series[0].pieData.value ? 35 : 10,
    );
    startValue = endValue;
    legendData.push(series[i].name);
  }
  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  const option = {
    color: COLORS,
    legend: {
      type: "scroll",
      data: legendData,
      icon: "roundRect",
      padding: fitChartSize(5),
      itemGap: fitChartSize(20),
      bottom: fitChartSize(0),
      itemWidth: fitChartSize(10), // 设置宽度
      itemHeight: fitChartSize(10), // 设置高度
      selectedMode: true,
      textStyle: {
        color: "#FFFFFF",
        fontSize: fitChartSize(14),
        lineHeight: fitChartSize(14),
        rich: {
          a: {
            verticalAlign: "middle",
          },
        },
        padding: [0, 0, fitChartSize(-3), 0],
      },
      // 翻页按钮未激活颜色
      pageIconColor: "#fff",
      // 翻页按钮激活颜色
      pageIconInactiveColor: "#2f4554",
      // 翻页按钮大小
      pageIconSize: fitChartSize(12),
      // 图例页信息的文字样式
      pageTextStyle: {
        color: "#FFFFFF",
      },
    },
    tooltip: {
      formatter: (params) => {
        if (params.seriesName !== "mouseoutSeries") {
          return `${
            params.seriesName
          }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
            params.color
          };"></span>${option.series[params.seriesIndex].pieData.value}`;
        }
        return "";
      },
    },
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      min: -1,
      max: "dataMax",
    },
    grid3D: {
      show: false,
      boxHeight: fitChartSize(16),
      top: "-18%",
      viewControl: {
        // 3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: 27,
        beta: 70, //旋转角度
        rotateSensitivity: 1,
        zoomSensitivity: 0,
        panSensitivity: 0,
        // autoRotate: true,
        distance: 150,
      },
      // 后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
      postEffect: {
        // 配置这项会出现锯齿，请自己去查看官方配置有办法解决
        enable: false,
        bloom: {
          enable: true,
          bloomIntensity: 0.1,
        },
        SSAO: {
          enable: true,
          quality: "medium",
          radius: 2,
        },
      },
    },
    series,
  };
  return option;
};

const listenEvent = (myChart, option) => {
  let hoveredIndex = "";
  // 监听 mouseover，近似实现高亮（放大）效果
  myChart.on("mouseover", (params) => {
    // 准备重新渲染扇形所需的参数
    let isSelected;
    let isHovered;
    let startRatio;
    let endRatio;
    let k;
    let i;
    // 如果触发 mouseover 的扇形当前已高亮，则不做操作
    if (hoveredIndex === params.seriesIndex) {
      return;
      // 否则进行高亮及必要的取消高亮操作
    } else {
      // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
      if (hoveredIndex !== "") {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
        isSelected = option.series[hoveredIndex].pieStatus.selected;
        isHovered = false;
        startRatio = option.series[hoveredIndex].pieData.startRatio;
        endRatio = option.series[hoveredIndex].pieData.endRatio;
        k = option.series[hoveredIndex].pieStatus.k;
        i =
          option.series[hoveredIndex].pieData.value ===
          option.series[0].pieData.value
            ? 35
            : 10;
        // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
        option.series[hoveredIndex].parametricEquation = getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          i,
        );
        option.series[hoveredIndex].pieStatus.hovered = isHovered;
        // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
        hoveredIndex = "";
      }
      // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
      if (params.seriesName !== "mouseoutSeries") {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
        isSelected = option.series[params.seriesIndex].pieStatus.selected;
        isHovered = true;
        startRatio = option.series[params.seriesIndex].pieData.startRatio;
        endRatio = option.series[params.seriesIndex].pieData.endRatio;
        k = option.series[params.seriesIndex].pieStatus.k;
        // 对当前点击的扇形，执行高亮操作（对 option 更新）
        option.series[params.seriesIndex].parametricEquation =
          getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            option.series[params.seriesIndex].pieData.value + 5,
          );
        option.series[params.seriesIndex].pieStatus.hovered = isHovered;
        // 记录上次高亮的扇形对应的系列号 seriesIndex
        hoveredIndex = params.seriesIndex;
      }
      // 使用更新后的 option，渲染图表
      myChart.setOption(option);
    }
  });
  // 修正取消高亮失败的 bug
  myChart.on("globalout", () => {
    if (hoveredIndex !== "") {
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
      let isSelected = option.series[hoveredIndex].pieStatus.selected;
      let isHovered = false;
      let k = option.series[hoveredIndex].pieStatus.k;
      let startRatio = option.series[hoveredIndex].pieData.startRatio;
      let endRatio = option.series[hoveredIndex].pieData.endRatio;
      // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
      let i =
        option.series[hoveredIndex].pieData.value ===
        option.series[0].pieData.value
          ? 35
          : 10;
      option.series[hoveredIndex].parametricEquation = getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        i,
      );
      option.series[hoveredIndex].pieStatus.hovered = isHovered;
      // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
      hoveredIndex = "";
    }
    // 使用更新后的 option，渲染图表
    myChart.setOption(option);
  });
  // 监听legend点击事件
  myChart.off("legendselectchanged");
  myChart.on("legendselectchanged", (e) => {
    myChart.setOption({
      legend: { selected: { [e.name]: true } },
    });
    let curr = option.series.find((i) => i.name == e.name)?.pieData;
    console.log("监听legend点击事件", curr);
  });
  // 监听点击事件，实现选中效果（单选）
  myChart.on("click", (params) => {
    let curr = option.series[params.seriesIndex]?.pieData;
    console.log("监听点击事件，实现选中效果（单选）", curr);
  });
};
// 传入数据生成 option
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
});
</script>
<style lang="less" scoped>
.container {
  width: 500px;
  height: 264px;
  position: relative;
  margin: 40px auto;
}

.container::after {
  content: "";
  position: absolute;
  width: 290px;
  height: 198px;
  background: url("@/assets/images/shift-bg.png") no-repeat;
  background-size: 100% 100%;
  left: calc(50% - 145px);
  bottom: 1%;
}

.container::before {
  content: attr(data-num);
  position: absolute;
  font-size: 18px;
  font-family: YouSheBiaoTiHei;
  color: #ffffff;
  line-height: 42px;
  text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
  left: 50%;
  transform: translate(-50%);
  top: 30%;
}

.chart {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}
</style>
