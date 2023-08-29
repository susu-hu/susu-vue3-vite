<template>
  <div class="container" :data-num="content">
    <Pie
      :data="state.data"
      :extra-option="extraOption"
      :width="500"
      :height="264"
    />
  </div>
</template>
<script setup>
import Pie from "./Pie.vue";
import { reactive } from "vue";
const content = "3D环形饼图";
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
const state = reactive({
  data: [
    {
      name: "测试1",
      value: 160,
    },
    // {
    //   name: "测试2",
    //   value: 244,
    // },
    // {
    //   name: "测试3",
    //   value: 332,
    // },
    // {
    //   name: "测试4",
    //   value: 400,
    // },
    // {
    //   name: "测试5",
    //   value: 19,
    // },
  ],
});
setTimeout(() => {
  state.data = [
    {
      name: "测试1",
      value: 2,
    },
    // {
    //   name: "测试2",
    //   value: 4556,
    // },
    // {
    //   name: "测试3",
    //   value: 22,
    // },
    // {
    //   name: "1",
    //   value: 400,
    // },
    // {
    //   name: "测试5",
    //   value: 233,
    // },
  ];
}, 6000);
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
</style>
