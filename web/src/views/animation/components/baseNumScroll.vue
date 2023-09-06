<template>
  <span v-if="state.isString">{{ state.numData }}</span>
  <count-to
    :endVal="state.numData"
    :startVal="state.numStart"
    v-bind="$attrs"
    v-else
  />
</template>
<script setup>
import { reactive, watch } from "vue";
import { CountTo } from "vue3-count-to";
const props = defineProps({
  endVal: {
    // 结束数值，当为文本时，显示文本，不显示数字滚动
    type: [String, Number],
    default: "",
  },
  stringText: {
    // 当结束数值为字符串时,显示的文本内容
    props: String,
    default: "--",
  },
  startVal: {
    // 开始数值
    type: Number,
    default: 0,
  },
});
const state = reactive({
  isString: true, //是否是字符串
  numData: "", //结束值
  numStart: 0, //开始数值
});
watch(
  () => props.endVal,
  (n, o) => {
    console.log(n, o);
    state.isString = !(typeof n == "number" && !isNaN(n));
    state.numData = n || props.stringText;
    state.numStart = props.startVal || o || 0;
    console.log(state);
  },
  { immediate: true },
);
</script>
