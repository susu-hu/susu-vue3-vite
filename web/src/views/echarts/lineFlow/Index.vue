<template>
  <section class="flex-row j_c">
    <LineFlow :data="data" :extra-option="extraOption" />
  </section>
</template>
<script setup>
import LineFlow from "./Line.vue";
const data = {
  xData: [
    "0:00",
    "2:00",
    "4:00",
    "6:00",
    "8:00",
    "12:00",
    "16:00",
    "20:00",
    "24:00",
  ],
  yData: [888, 600, 255, 344, 333, 555, 111, 999, 0],
};
const extraOption = {};
</script>
<style lang="less" scoped>
section {
  margin: 40px auto;
}
</style>
