<template>
  <!-- 楼层区 start -->
  <div class="floor">
    <!-- 感恩季 -->
    <div class="season1 w">
      <div class="box_hd">
        <h3>{{ season.title }}</h3>
        <div class="tab_list">
          <ul>
            <li v-for="(nav, index) in season.navitems" :key="index">
              <a href="#">{{ nav }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="box_bd">
        <!-- <div class="tab_list_item"> -->
        <div class="carouselSeason">
          <!-- <img src="./images/xiaofangzi.jpg" alt="" /> -->
          <Carousel :list="season.carousel"></Carousel>
        </div>
        <!-- <div class="graduation"> -->
        <div v-for="s in season.graduation" :key="s.id" class="graduation">
          <img :src="s.imgUrl" />
        </div>
        <!-- </div> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Season",
  props: ["season"],
};
</script>

<style>
.box_hd {
  height: 30px;
  margin-top: 10px;
  border-bottom: 2px solid #00a4ff;
  line-height: 30px;
}
.box_hd h3 {
  float: left;
  color: #00a4ff;
  font-size: 18px;
}
.tab_list {
  float: right;
}
.tab_list ul li {
  float: left;
}
.tab_list ul li a {
  padding: 0 15px;
}
/* 终于是解决了|的问题。。 */
.tab_list ul li::after {
  content: "|";
}
.tab_list ul li:last-child::after {
  content: "";
}
.box_bd {
  height: 360px;
}
.carouselSeason .swiper {
  float: left;
  position: relative;
  width: 360px;
  height: 360px;
  overflow: hidden;
}
.swiper img {
  width: 100%;
  height: 100%;
}
.graduation img {
  float: left;
  width: 210px;
  height: 360px;
}
</style>