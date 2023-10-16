<template>
  <div class="container">
    <Pie
      :data="state.data"
      :extra-option="extraOption"
      :width="388"
      :height="244"
    />
  </div>
</template>
<script setup>
import Pie from "./Pie.vue";
import { reactive } from "vue";
const state = reactive({
  data: [
    {
      value: 10,
      name: "测试一",
    },
    {
      value: 1,
      name: "测试二",
    },
    {
      value: 30,
      name: "测试三",
    },
    {
      value: 60,
      name: "测试四",
    },
    {
      value: 10,
      name: "测试五",
    },
    {
      value: 10,
      name: "测试六",
    },
  ],
});
const extraOption = {};
</script>
<style lang="less" scoped>
.container {
  width: 388px;
  height: 244px;
  position: relative;
  margin: 40px auto;
  &::before {
    content: "";
    position: absolute;
    left: calc(50% - 85px);
    top: calc(50% - 85px);
    width: 170px;
    height: 170px;
    background-image: url("@/assets/images/echarts/pie-out.png");
    background-size: 100% 100%;
  }
  &::after {
    content: "";
    width: 72px;
    height: 72px;
    position: absolute;
    left: calc(50% - 36px);
    top: calc(50% - 36px);
    background-image: url("@/assets/images/echarts/pie-inner.png");
    background-size: 100% 100%;
  }
}
</style>
