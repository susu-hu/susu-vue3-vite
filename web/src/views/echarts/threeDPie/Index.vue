<template>
  <div @click="click">点击</div>
  <div class="container" :data-num="content">
    <Pie
      :data="state.data"
      :extra-option="extraOption"
      isDispose
      isCarpeted
      :class="[a && 'custom-cahart']"
    />
  </div>
</template>
<script setup>
import Pie from "./Pie.vue";
import { reactive, ref } from "vue";
const content = "3D环形饼图";
const state = reactive({
  data: [
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
  ],
});
const a = ref("");
const width = ref(500),
  height = ref(500);
const click = () => {
  a.value = !a.value;
  state.data = [
    {
      name: "测试1",
      value: 2,
    },
    {
      name: "测试2",
      value: 4556,
    },
    {
      name: "测试3",
      value: 22,
    },
    {
      name: "1",
      value: 400,
    },
  ];
  width.value = 400;
  height.value = 800;
};

// setTimeout(() => {
//   state.data = [
//     {
//       name: "测试1",
//       value: 2,
//     },
//   ];
// }, 6000);
// setTimeout(() => {
//   state.data = [
//     {
//       name: "测试1",
//       value: 2,
//     },
//     {
//       name: "测试2",
//       value: 4556,
//     },
//     {
//       name: "测试3",
//       value: 22,
//     },
//     {
//       name: "1",
//       value: 400,
//     },
//   ];
// }, 12000);
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
<style lang="less" scoped>
.container {
  width: 500px;
  height: 264px;
  position: relative;
  margin: 40px auto;
}

.container::after {
  content: "";
  position: absolute;
  width: 290px;
  height: 198px;
  background: url("@/assets/images/shift-bg.png") no-repeat;
  background-size: 100% 100%;
  left: calc(50% - 145px);
  bottom: 1%;
  z-index: -1;
}

.container::before {
  content: attr(data-num);
  position: absolute;
  font-size: 18px;
  font-family: AlibabaPuHuiTiB;
  color: #ffffff;
  line-height: 42px;
  text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
  left: 50%;
  transform: translate(-50%);
  top: 30%;
}
.custom-cahart {
  width: 80% !important;
  height: 50vh !important;
}
</style>
