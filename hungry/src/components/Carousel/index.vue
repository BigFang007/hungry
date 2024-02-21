<template>
  <!-- 主模块 strat -->
  <!-- 焦点图-->
  <div class="swiper" ref="swiper1">
    <div class="swiper-wrapper">
      <!-- 仓库获取carousellist是异步操作，v-for遍历需要时间，所以new swiper实例不能在mounted时，
          此时很可能仓库还没获取到数据；也不能单靠watch监听，虽然此时carousellist已经有了，很可能v-for循环没结束；
          所以要用nextTick：数据改变后不会立即重新解析模板，起码得等这个函数里的东西执行完毕--也是为了效率,$nextTick就是下次一刷新Dom时候开启
           -->
      <div class="swiper-slide" v-for="c in list" :key="c.id">
        <img :src="c.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
  </div>
</template>

<script>
// 引入swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  // 父组件要通过list将图片传进来
  props: ["list"],
  watch: {
    // 当carousel由空到有的时候
    list: {
      // season那里由于list一开始就存在，所以watch不可能检测到数据变化
      immediate: true,
      handler(newValue, oldValue) {
        // v-for循环结束
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.swiper1, {
            // direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: {
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
/* 焦点图 */
.main .swiper-button-prev,
.main .swiper-button-next {
  color: rgba(255, 255, 255, 0.863);
}
</style>