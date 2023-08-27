<template>
  <div class="container flex-row j_c">
    <div class="logo">
      <div class="line"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.container {
  margin: 40px auto;
  .logo {
    width: 450px;
    height: 451px;
    transform-style: preserve-3d;
    position: relative;
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      background: url("@/assets/images/ani/logo.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      top: 0;
      animation: douce 2s infinite linear;
      @keyframes douce {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
    }
  }
  .line {
    width: 288px;
    height: 93px;
    left: calc(50% - 144px);
    bottom: 128px;
    border-radius: 50%;
    position: absolute;
    background: url("@/assets/images/ani/circle-round.png") no-repeat;
    background-size: 100% 100%;
    transform-style: preserve-3d;
    transform: rotateZ(0deg) rotateX(1deg);

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
      animation: move 10s linear infinite;
    }

    @keyframes move {
      .loop(0,144px,42px,30);
    }
  }
  .loop(@index,@a, @b, @s) when (@index < @s+1) {
    // 椭圆x轴半径(长半径)@a
    // 椭圆y轴半径(短半径)@b
    // 坐标点的数目(数目越大，动画越精细)@s
    .loop((@index + 1),@a, @b, @s);
    @keyframeSel: @index * 100% / @s;
    @{keyframeSel}{
      transform: translate((@a * cos(360deg / @s*@index)),(@b * sin(360deg / @s*@index)));
    }
  }
}
</style>
