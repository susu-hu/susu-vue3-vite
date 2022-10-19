<template>
  <div class="flex-row flex-wrap">
    <Thermometer :show="showAni" :data="thermObjLow" />
    <Thermometer :show="showAni" :data="thermObjZero" />
    <Thermometer :show="showAni" :data="thermObjCen" />
    <Thermometer :show="showAni" :data="thermObjWarn" />
    <Thermometer :show="showAni" :data="thermObjHighWarn" />
    <Thermometer :show="showAni" :data="thermObjHigh" />
    <Thermometer :show="showAni" :data="thermObjMax" />
    <Thermometer :show="showAni" :data="thermObjMaxPlus" />
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import Thermometer from "@/components/animation/thermometer.vue";
const showAni = ref(false);
const thermObjHigh = ref({
    max: 60,
    min: 0,
    value: 60,
    warn: 60,
  }),
  thermObjHighWarn = ref({
    max: 60,
    min: 0,
    value: 60,
    warn: 30,
  }),
  thermObjWarn = ref({
    max: 60,
    min: 0,
    value: 45,
    warn: 10,
  }),
  thermObjCen = ref({
    max: 60,
    min: 0,
    value: 30,
    warn: 35,
  }),
  thermObjLow = ref({
    max: 60,
    min: 0,
    value: -10,
    warn: 35,
  }),
  thermObjZero = ref({
    max: 60,
    min: 0,
    value: 0,
    warn: 35,
  }),
  thermObjMax = ref({
    max: 80,
    min: 0,
    value: 66,
    warn: 5,
  }),
  thermObjMaxPlus = ref({
    max: 100,
    min: 0,
    value: 99,
    warn: 35,
  });
onMounted(() => {
  setTimeout(() => {
    showAni.value = true;
  }, 100);
});
</script>

<style lang="less" scoped></style>
