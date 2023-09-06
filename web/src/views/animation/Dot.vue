<template>
  <div class="container flex-row j_c">
    <div class="logo">
      <div class="line"></div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="less" scoped>
.container {
  margin: 40px auto;
  .logo {
    width: 245px;
    height: 284px;
    background: url("@/assets/images/ani/logo.png") no-repeat;
    background-size: 100% 100%;
    transform-style: preserve-3d;
    position: relative;
  }
  .line {
    width: 288px;
    height: 288px;
    left: calc(50% - 144px);
    bottom: -50px;
    border-radius: 50%;
    position: absolute;
    border:2px solid pink;
    background-size: 100% 100%;
    transform-style: preserve-3d;
    transform: rotateZ(90deg) rotateY(109deg);

    &::after {
      content: "";
      position: absolute;
      width: 11px;
      height: 11px;
      background: #5fffa5;
      border-radius: 50%;
      transform-style: preserve-3d;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      animation: move 5s linear infinite;
    }
    @keyframes move {
      from {
        transform: rotateZ(0deg) translateX(144px) rotateZ(0deg)
          rotateY(-109deg);
      }

      to {
        transform: rotateZ(360deg) translateX(144px) rotateZ(-360deg)
          rotateY(-109deg);
      }
    }
  }
}
</style>
