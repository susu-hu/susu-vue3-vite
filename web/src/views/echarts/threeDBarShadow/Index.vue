<template>
  <section class="flex-row j_c">
    <Bar :data="state.data" :extra-option="extraOption" :height="400" />
  </section>
</template>
<script setup>
import { reactive } from "vue";
import Bar from "./Bar.vue";
const state = reactive({
  data: {
    limit1: 10,
    limit2: 15,
    list: [
      {
        code: "标题1",
        value1: 10,
        value2: 2,
      },
      {
        code: "标题2",
        value1: 1,
        value2: 2,
      },
      {
        code: "标题3",
        value1: 5,
        value2: 11,
      },
      {
        code: "标题4",
        value1: 15,
        value2: 11,
      },
      {
        code: "标题4",
        value1: 5,
        value2: 1,
      },
      {
        code: "标题6",
        value1: 22,
        value2: 1,
      },
      {
        code: "标题7",
        value1: 33,
        value2: 22,
      },
      {
        code: "标题8",
        value1: 11,
        value2: 2,
      },
    ],
  },
});
// setTimeout(() => {
//   state.data = {
//     limit1: 444,
//     limit2: 22,
//     list: [
//       {
//         code: "标题4",
//         value1: 15,
//         value2: 11,
//       },
//       {
//         code: "标题4",
//         value1: 5,
//         value2: 1,
//       },
//       {
//         code: "标题6",
//         value1: 22,
//         value2: 1,
//       },
//     ],
//   };
// }, 6000);
const extraOption = {};
</script>
<style lang="less" scoped>
section {
  margin: 40px auto;
}
</style>
