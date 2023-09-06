<template>
  <section class="flex-row j_c">
    <NumScroll
      :decimals="0"
      :duration="2000"
      separator=""
      :end-val="num"
      class="text"
    />
  </section>
</template>
<script setup>
import { ref } from "vue";
import NumScroll from "./components/baseNumScroll.vue";
let num = ref("");
setTimeout(() => {
  num.value = 1;
}, 5000);
setTimeout(() => {
  num.value = 4;
}, 9000);
</script>
<style lang="less" scoped>
section {
  height: 100vh;
}
.text {
  font-size: 5rem;
  font-family: HuXiaoBo;
  background: linear-gradient(180deg, #ffffff 0%, #9be5ff 67%, #0dcaf5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
}
</style>
