<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-10-29 22:58:31
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2023-08-27 13:15:00
 * @FilePath: \web\src\views\gsap\digitalScrollBg.vue
 * @Description: gsap实现数字滚动动画带背景
-->
<template>
  <section>
    <div class="flex-row">
      <span
        class="num"
        v-for="(item, index) in tweened.num.toFixed(0).toString()"
        :key="index"
        >{{ item }}</span
      >
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import gsap from "gsap";
const tweened = reactive({
  num: 0,
});
gsap.to(tweened, { duration: 2, num: 1231231 });
</script>

<style scoped>
section {
  width: 300px;
  margin: 100px auto;
}
.big-number {
  font-weight: bold;
  font-size: 2em;
}
input {
  border: 1px solid #fff;
  color: #fff;
}
.num {
  width: 29px;
  height: 42px;
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-right: 5px;
  background: url("@/assets/images/bar.png");
}
</style>
