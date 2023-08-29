import { fitChartSize } from "@/utils/echartSize";
export const BASIC_OPTION = () => {
    return {
        grid: {
            top: fitChartSize( 40 ),
            left: 0,
            right: 0,
            bottom: fitChartSize( 20 ),
            containLabel: true,
        },
        legend: {
            icon: "rect",
            show: true,
            selectedMode: false,
            //图例组件，颜色和名字
            top: "2%",
            right: 0,
            itemGap: fitChartSize( 15 ),
            itemWidth: fitChartSize( 12 ),
            itemHeight: fitChartSize( 8 ),
            textStyle: {
                color: "rgba(255,255,255,0.74)",
                fontStyle: "normal",
                fontSize: fitChartSize( 12 ),
                lineHeight: fitChartSize( 12 ),
                rich: {
                    a: {
                        verticalAlign: "middle",
                    },
                },
                padding: [0, 0, fitChartSize( -3 ), 0],
            },
        },
        xAxis: {
            type: "category",
            axisLine: {
                //坐标轴线颜色
                lineStyle: {
                    color: "#626361",
                },
            },
            splitNumber: fitChartSize( 4 ),
            interval: fitChartSize( 4 ),
            boundaryGap: ["8%", "8%"],
            axisLabel: {
                color: "rgba(255,255,255,.9)", //坐标的字体颜色
                fontSize: fitChartSize( 12 ),
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
                    type: [fitChartSize( 3 ), fitChartSize( 3 )],
                    dashOffset: fitChartSize( 2 ),
                    width: fitChartSize( 1 ),
                },
            },
            axisTick: {
                //坐标轴刻度颜色
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
    }
}
