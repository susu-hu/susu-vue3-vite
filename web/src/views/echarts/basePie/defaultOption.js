import { fitChartSize } from "@/utils/echartSize";
import * as echarts from "echarts";
export const BASIC_OPTION = () => {
  return {
    animationDuration: 3000,
    color: ["#19E7FF", "#fee186", "#FFAA3A", "#EF7C41", "#ef4163", "#7a41ef"],
    tooltip: {
      trigger: "item",
      show: false,
    },
    series: [
      {
        name: "",
        type: "pie",
        roundCap: true,
        radius: ["40%", "53%"],
        labelLine: {
          length: fitChartSize(15),
          length2: fitChartSize(45),
          lineStyle: {
            width: fitChartSize(1),
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(255, 255, 255,.1)",
              },
              {
                offset: 1,
                color: "#7d8389",
              },
            ]),
          },
        },
        label: {
          show: true,
          position: "outside",
          padding: [0, fitChartSize(-4), 0, fitChartSize(-4)],
          color: "#fff",
          fontSize: fitChartSize(14),
          formatter: "{a|{b}：{d}%}\n{hr|}",
          rich: {
            hr: {
              backgroundColor: "#fff",
              borderRadius: fitChartSize(10),
              width: fitChartSize(5),
              height: fitChartSize(5),
              borderColor: "#fff",
              borderWidth: fitChartSize(1),
            },
            name: {
              padding: [fitChartSize(-25), fitChartSize(-0), 0, 0],
              fontSize: fitChartSize(14),
            },
            value: {
              fontSize: fitChartSize(16),
              fontWeight: "Bold",
              padding: [fitChartSize(-25), fitChartSize(10), 0, 0],
            },
          },
        },
      },
    ],
  };
};
