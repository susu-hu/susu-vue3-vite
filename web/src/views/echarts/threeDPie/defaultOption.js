import { fitChartSize } from "@/utils/echartSize";
export const BASIC_OPTION = {
  color: ["red", "pink", "green", "#47D8E1", "#E1CD47", "#4F5AED", "#E19D47"],
  legend: {
    type: "scroll",
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
};
