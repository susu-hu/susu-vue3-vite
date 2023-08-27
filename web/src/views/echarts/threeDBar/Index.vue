<template>
  <section class="flex-row j_c">
    <Bar :data="state.data" :extra-option="extraOption" />
  </section>
</template>
<script setup>
import { reactive } from "vue";
import Bar from "./Bar.vue";
const state = reactive({
  data: {
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
  },
});
setTimeout(() => {
  state.data = {
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
    yData: [100, 200, 255, 344, 333, 555, 111, 999, 1000],
  };
}, 6000);
const extraOption = {};
</script>
<style lang="less" scoped>
section {
  margin: 40px auto;
}
</style>
