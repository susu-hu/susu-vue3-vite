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
      // .loop(0,144px,42px,30);
      100% {
        transform: translate(144px, 0px);
      }
      96.66666666666667% {
        transform: translate(140.85325451px, -8.73229101px);
      }
      93.33333333333333% {
        transform: translate(131.5505459px, -17.08293901px);
      }
      90% {
        transform: translate(116.49844719px, -24.6869806px);
      }
      86.66666666666667% {
        transform: translate(96.35480732px, -31.21208267px);
      }
      83.33333333333333% {
        transform: translate(72px, -36.37306696px);
      }
      80% {
        transform: translate(44.49844719px, -39.94437368px);
      }
      76.66666666666667% {
        transform: translate(15.05209871px, -41.76991961px);
      }
      73.33333333333333% {
        transform: translate(-15.05209871px, -41.76991961px);
      }
      70% {
        transform: translate(-44.49844719px, -39.94437368px);
      }
      66.66666666666667% {
        transform: translate(-72px, -36.37306696px);
      }
      63.333333333333336% {
        transform: translate(-96.35480732px, -31.21208267px);
      }
      60% {
        transform: translate(-116.49844719px, -24.6869806px);
      }
      56.666666666666664% {
        transform: translate(-131.5505459px, -17.08293901px);
      }
      53.333333333333336% {
        transform: translate(-140.85325451px, -8.73229101px);
      }
      50% {
        transform: translate(-144px, 0px);
      }
      46.666666666666664% {
        transform: translate(-140.85325451px, 8.73229101px);
      }
      43.333333333333336% {
        transform: translate(-131.5505459px, 17.08293901px);
      }
      40% {
        transform: translate(-116.49844719px, 24.6869806px);
      }
      36.666666666666664% {
        transform: translate(-96.35480732px, 31.21208267px);
      }
      33.333333333333336% {
        transform: translate(-72px, 36.37306696px);
      }
      30% {
        transform: translate(-44.49844719px, 39.94437368px);
      }
      26.666666666666668% {
        transform: translate(-15.05209871px, 41.76991961px);
      }
      23.333333333333332% {
        transform: translate(15.05209871px, 41.76991961px);
      }
      20% {
        transform: translate(44.49844719px, 39.94437368px);
      }
      16.666666666666668% {
        transform: translate(72px, 36.37306696px);
      }
      13.333333333333334% {
        transform: translate(96.35480732px, 31.21208267px);
      }
      10% {
        transform: translate(116.49844719px, 24.6869806px);
      }
      6.666666666666667% {
        transform: translate(131.5505459px, 17.08293901px);
      }
      3.3333333333333335% {
        transform: translate(140.85325451px, 8.73229101px);
      }
      0% {
        transform: translate(144px, 0px);
      }
    }
  }
  // .loop(@index,@a, @b, @s) when (@index < @s+1) {
  //   // 椭圆x轴半径(长半径)@a
  //   // 椭圆y轴半径(短半径)@b
  //   // 坐标点的数目(数目越大，动画越精细)@s
  //   .loop((@index + 1),@a, @b, @s);
  //   @keyframeSel: @index * 100% / @s;
  //   @{keyframeSel}{
  //     transform: translate((@a * cos(360deg / @s*@index)),(@b * sin(360deg / @s*@index)));
  //   }
  // }
}
</style>
