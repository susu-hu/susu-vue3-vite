<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-10-10 00:18:53
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-10-12 23:04:50
 * @FilePath: \web\src\views\index.vue
 * @Description: 首页
-->
<template>
  <div class="container flex-row j_c flex-wrap">
    <div class="ani-box">
      <LottieAni :src="dataJson1" />
    </div>
    <div class="ani-box">
      <LottieAni :src="dataJson2" />
    </div>
    <div class="ani-box">
      <LottieAni :src="dataJson3" />
    </div>
    <div class="ani-box">
      <LottieAni :src="dataJson4" />
    </div>
    <div class="ani-box">
      <LottieAni :src="dataJson5" />
    </div>
    <div class="ani-box">
      <LottieAni :src="dataJson6" />
    </div>
    <div class="ani-box">
      <LottieAni
        path="https://labs.nearpod.com/bodymovin/demo/markus/halloween/markus.json"
      />
    </div>
  </div>
</template>

<script setup>
import dataJson1 from "@/assets/json/data1.json";
import dataJson2 from "@/assets/json/data2.json";
import dataJson3 from "@/assets/json/data3.json";
import dataJson4 from "@/assets/json/data4.json";
import dataJson5 from "@/assets/json/data5.json";
import dataJson6 from "@/assets/json/data6.json";
import LottieAni from "@/components/lottie.vue";
</script>

<style scoped lang="less">
.container {
  padding: 40px;
}
.ani-box {
  width: 200px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 0px 2px 2px 1px #abb3cf;
  transition: all 0.5s;
  margin-right: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
