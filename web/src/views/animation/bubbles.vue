<template>
  <section>
    <div class="bubbles">
      <span
        class="bubble"
        v-for="(item, index) in bubbles"
        :key="index"
        :style="{
          '--w': item.w,
          '--c': item.c,
          '--x': item.x,
          '--d':
            parseInt(bubbles.length / 2) +
            1 -
            Math.abs(index - parseInt(bubbles.length / 2)),
        }"
      ></span>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
import { forArrayValue } from "@/utils/tools";
const props = defineProps({
  colors: {
    type: Array,
    default: () => ["#00BABC", "#009FA4", "#00FFC0"],
  },
});
const bubbles = ref([
  {
    w: 8,
    x: 10,
  },
  {
    w: 9,
    x: 50,
  },
  {
    w: 4,
    x: 30,
  },
  {
    w: 5,
    x: 80,
  },
  {
    w: 4,
    x: 30,
  },
  {
    w: 4,
    x: 70,
  },
  {
    w: 6,
    x: 20,
  },
  {
    w: 8,
    x: 50,
  },
  {
    w: 4,
    x: 60,
  },
  {
    w: 6,
    x: 65,
  },
]);
bubbles.value.forEach((i, index) => {
  i.c = forArrayValue(props.colors, index);
});
</script>
<style lang="less" scoped>
section {
  height: 300px;
  width: 300px;
  margin: 50px auto;
  position: relative;
  z-index: 1;
  border-radius: 20px;
  box-shadow: 0px 9px 17px 4px rgba(0, 0, 0, 0.5);
}
.bubbles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;
}
.bubble {
  position: absolute;
  width: calc(1px * var(--w));
  height: calc(1px * var(--w));
  background: var(--c);
  border-radius: 50%;
  left: calc(50% - calc(1px * calc(var(--w) / 2)));
  opacity: 0;
  bottom: 10%;
  animation: rise 3s infinite linear;
  animation-delay: calc(600ms * var(--d));
  left: calc(1% * var(--x));
}
@keyframes rise {
  0% {
    left: calc(50% - calc(1px * calc(var(--w) / 2)));
    opacity: 0;
    bottom: 10%;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    left: calc(1% * var(--x));
    bottom: 90%;
    opacity: 0;
  }
}
</style>
