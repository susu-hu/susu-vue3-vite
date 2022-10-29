<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-10-29 22:58:31
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-10-29 23:08:12
 * @FilePath: \web\src\views\gsap\digitalScroll.vue
 * @Description: gsap实现数字滚动动画
-->
<template>
  输入一个数字: <input v-model.number="number" />
  <p class="big-number">{{ tweened.num.toFixed(2) }}</p>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import gsap from "gsap";
const number = ref(0);
const tweened = reactive({
  num: 0,
});
watch(number, (n, o) => {
  console.log("数字", n);
  gsap.to(tweened, { duration: 0.5, num: n });
});
</script>

<style scoped>
.big-number {
  font-weight: bold;
  font-size: 2em;
}
input {
  border: 1px solid #fff;
  color: #fff;
}
</style>
