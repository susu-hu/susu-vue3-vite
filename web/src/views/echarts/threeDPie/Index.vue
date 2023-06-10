<template>
  <Pie :data="data" :extra-option="extraOption" />
</template>
<script setup>
import Pie from "./Pie.vue";
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
const extraOption = {
  color: [
    "#2B99EE",
    "#EB7A6A",
    "#4FED7D",
    "#47D8E1",
    "#E1CD47",
    "#4F5AED",
    "#E19D47",
  ],
};
</script>
<style lang="less" scoped></style>
