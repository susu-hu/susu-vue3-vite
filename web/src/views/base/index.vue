<template>
  <div>
    <div v-for="(item, index) in list" :key="index">{{ item }}</div>
    <div v-for="(item, index) in list1" :key="index">{{ item }}</div>
    <div>{{ obj.num }}</div>
    <div v-for="(item, index) in obj.list" :key="index">{{ item }}</div>
    <div v-for="(item, index) in listState" :key="index">state:{{ item }}</div>
    <div>state.name:{{ objState.name }}</div>
    <div>state.status:{{ a.objState.value.name }}</div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  toRefs,
  watch,
  computed,
  onMounted,
  onBeforeUnmount,
} from "vue";
const state = reactive({
  listState: [],
  objState: {},
  status: false,
});
let list = reactive([]);
let list1 = ref([]);
const obj = ref({});

let { listState, objState } = toRefs(state);
console.log(listState, objState);
let a = { ...toRefs(state) };
console.log("sdfisd ", a);

onMounted(() => {
  // reactive数组异步赋值问题
  const a = ["苏苏1", "苏苏2"];
  list.push(...a);
  console.log("reactive-list", list);

  list1.value = ["苏苏3", "苏苏4"];
  console.log("ref-list1", list1);

  obj.value.num = "21402304";
  obj.value.list = list1.value;
  console.log("ref-obj", obj);

  state.listState = ["苏苏wahhhh ", "苏苏sdfgdnfkg"];
  state.objState = { name: "苏苏就是小苏苏哇" };
  console.log("state", state);
});
</script>

<style></style>
