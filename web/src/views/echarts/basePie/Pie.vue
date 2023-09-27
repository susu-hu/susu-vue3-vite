<template>
  <Echart :width="width" :height="height" :option="getFullOptions" />
</template>
<script setup>
import Echart from "../components/Echart.vue";
import { merge } from "lodash";
import { BASIC_OPTION } from "./defaultOption";
import { forArrayValue } from "@/utils/tools";
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
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
  colors: {
    type: Array,
    default: () => [
      "#40FFAF",
      "#2B89FF",
      "#54EDFF",
      "#AFD3FF",
      "#FFAA3A",
      "#EF419C",
      "#FF613A",
      "#EF7C41",
      "#CAFC51",
      "#40FF89",
      "#FFCD30",
      "#ef4163",
      "#7a41ef",
      "#5241EF",
      "#19E7FF",
      "#fee186",
    ],
  },
});
const getFullOptions = () => {
  const sum = props.data.reduce((per, cur) => per + cur.value, 0),
    gap = (1 * sum) / 100,
    gapData = {
      name: "",
      value: gap,
      itemStyle: {
        color: "transparent",
      },
      labelLine: { show: false },
      label: { show: false },
    },
    data = [];
  props.data.forEach((e, i) => {
    data.push({
      ...e,
      itemStyle: {
        color: forArrayValue(props.colors, i),
      },
      label: {
        rich: {
          hr: {
            borderColor: forArrayValue(props.colors, i),
          },
          value: {
            color: forArrayValue(props.colors, i),
          },
        },
      },
    });
    data.push(gapData);
  });
  let _option = {
    series: [
      {
        data: data,
        label: {
          formatter(params) {
            return (
              "{name|" +
              params.name +
              "}{value|" +
              ((params.value / sum) * 100).toFixed(0) +
              "%" +
              "}\n{hr|}"
            );
          },
        },
      },
    ],
  };
  return merge({}, BASIC_OPTION(), _option, props.extraOption);
};
</script>
