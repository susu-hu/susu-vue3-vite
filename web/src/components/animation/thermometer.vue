<template>
  <section class="container flex-row j_c">
    <div class="container-box">
      <div class="box-lines">
        <div v-for="(item, index) in stepList" :key="index" class="line-item">
          <div class="left" :data-num="item"></div>
          <div class="right" :data-num="item"></div>
        </div>
      </div>
      <div class="box-pan">
        <div class="box-shadow"></div>
        <div
          :class="[
            'bottom-circle',
            show && (data.value >= 0 ? 'active' : 'trans'),
          ]"
        ></div>
        <div class="bottom-center" v-show="data.value >= 0">
          <div
            :class="['active', currPer >= 0.94 && 'br', show && 'trans']"
            :style="{ '--per': currPer < 1 ? currPer : 1 }"
          >
            <div
              :class="['bottom-warn', currPer >= 0.94 && 'br']"
              v-show="data.value > data.warn"
              :style="{ '--per': warnPer < 1 ? warnPer : 1 }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-title">{{ data.value }}°<text>C</text></div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
const props = defineProps({
  show: {
    type: Boolean,
    default: false, //展示过渡效果
  },
  data: {
    type: Object,
    default: () => {},
    required: true,
  },
});
let step = parseInt(props.data.max) / 4,
  stepList = [];
for (let i = 0; i < 5; i++) {
  stepList.unshift(step * i);
}
let currPer = parseInt(props.data.value) / parseInt(props.data.max),
  warnPer = 0;
if (parseInt(props.data.value) > parseInt(props.data.warn)) {
  warnPer =
    (parseInt(props.data.value) - parseInt(props.data.warn)) /
    parseInt(props.data.max);
}
</script>

<style scoped lang="less">
.container {
  font-size: 16px;
  font-family: AlibabaPuHuiTiM;
  color: #ffffff;
  height: 280px;
  width: 300px;
  border: 1px solid orange;
  &-box {
    position: relative;
    .box-pan {
      background: url("@/assets/images/ani/therm-bg.png") no-repeat;
      background-size: 100% 100%;
      width: 83px;
      height: 203px;
      position: absolute;
      left: calc(50% - 42px);
      top: -10px;
      z-index: 1;
      &::before {
        content: "";
        width: 4px;
        height: 105px;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.34) 0%,
          rgba(255, 255, 255, 0.12) 100%
        );
        border-radius: 2px;
        opacity: 0.31;
        position: absolute;
        right: 35px;
        top: 21px;
        z-index: 13;
      }
      &::after {
        content: "";
        position: absolute;
        left: 30px;
        top: 15px;
        width: 6px;
        height: 119px;
        border-radius: 20px 0 20px 10px;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.82) 0%,
          rgba(255, 255, 255, 0) 100%
        );
        z-index: 13;
      }
      .box-shadow {
        position: absolute;
        width: 23px;
        height: 29px;
        background: url("@/assets/images/ani/therm-shadow.png") no-repeat;
        background-size: 100% 100%;
        bottom: 32px;
        left: 20px;
        z-index: 13;
      }
      .bottom-circle {
        position: absolute;
        width: 70px;
        height: 0px;
        overflow: hidden;
        bottom: 2px;
        left: calc(50% - 35px);
        filter: blur(1px);
        z-index: 11;
        transition: all 2.5s;
        transition-delay: 0.8s;
        &.trans {
          height: 45px;
        }
        &.active {
          height: 75px;
        }
        &::after {
          content: "";
          width: 60px;
          height: 60px;
          background: linear-gradient(90deg, #fde44d 0%, #e8a901 100%);
          box-shadow: 0px 1px 5px 3px #f4ca2b;
          position: absolute;
          left: calc(50% - 30px);
          bottom: 10px;
          border-radius: 50%;
        }
      }
      .bottom-center {
        width: 36px;
        height: 135px; //满高
        position: absolute;
        bottom: 60px;
        left: calc(50% - 18px);
        filter: blur(1px);
        z-index: 10;
        .active {
          width: 100%;
          height: 0;
          position: absolute;
          left: 0;
          bottom: 0;
          background: linear-gradient(90deg, #fde44d 0%, #e8a901 100%);
          transition: all 2.5s;
          transition-delay: 2.2s;
          .bottom-warn {
            width: 42px;
            height: 0;
            background: linear-gradient(
              180deg,
              #e80000 0%,
              rgba(254, 100, 100, 0) 100%
            );
            filter: blur(1px);
            position: absolute;
            top: 0;
            left: calc(50% - 21px);
            z-index: 11;
            transition: all 2.5s;
            transition-delay: 2.2s;
          }
        }
        .trans {
          height: calc(var(--per) * 100%);
          box-shadow: 0px 1px 5px 3px #f4ca2b;
          .bottom-warn {
            height: calc(135px * var(--per));
            box-shadow: 0px -5px 5px 0px rgba(231, 0, 0, 0.74);
          }
        }
        .br {
          border-radius: 16px 16px 0 0;
        }
      }
    }
    .box-lines {
      .line-item {
        width: 90px;
        font-size: 12px;
        margin-bottom: 30px;
        height: 1px;
        padding-right: 90px;
        position: relative;
        &:last-child {
          margin-bottom: 0;
        }
        .left {
          position: absolute;
          left: -5px;
          width: 19px;
          height: 1px;
          opacity: 0.9;
          border: 1px dashed rgba(255, 255, 255, 0.39);
          &::after {
            content: attr(data-num);
            position: absolute;
            top: -10px;
            left: -35px;
            text-align: right;
            min-width: 25px;
          }
        }
        .right {
          position: absolute;
          right: -5px;
          width: 19px;
          height: 1px;
          opacity: 0.9;
          border: 1px dashed rgba(255, 255, 255, 0.39);
          &::before {
            content: attr(data-num);
            position: absolute;
            top: -10px;
            right: -35px;
            text-align: left;
            min-width: 25px;
          }
        }
      }
    }
  }
  &-title {
    margin-left: 35px;
    font-size: 24px;
    font-family: YouSheBiaoTiHei;
    color: #f2af33;
    line-height: 31px;
    position: relative;
    min-width: 80px;
    text-align: center;
    text {
      font-size: 12px;
    }
  }
}
</style>
