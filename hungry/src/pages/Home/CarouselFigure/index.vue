<template>
  <!-- 主模块 strat -->
  <div class="w">
    <div class="main">
      <!-- 焦点图-->
      <Carousel :list="carouselList"></Carousel>
      <!-- 快报 -->
      <div class="newsflash">
        <!-- 新闻📰 -->
        <div class="news">
          <div class="news_hd">
            <h5>快报</h5>
            <a href="#">more++</a>
          </div>
          <div class="news_bd">
            <ul>
              <li><a href="#">【开挂】 已处置违规账号1000</a></li>
              <li><a href="#">【公告】 已处置违规账号1000</a></li>
              <li><a href="#">【开挂】 已处置违规账号1000</a></li>
              <li><a href="#">【公告】 已处置违规账号1000</a></li>
              <li><a href="#">【开挂】 已处置违规账号1000</a></li>
            </ul>
          </div>
        </div>
        <!-- 跑图服务 -->
        <div class="playservice">
          <ul>
            <li><br /><a>啊哈</a></li>
            <li><br /><a>啊哈</a></li>
            <li class="hot">
              <br /><a>季卡</a>
              <div class="label_give"></div>
            </li>
            <li><br /><a>啊哈</a></li>
            <li><br /><a>啊哈</a></li>
            <li><br /><a>啊哈</a></li>
            <li><br /><a>啊哈</a></li>
            <li><br /><a>啊哈</a></li>
            <li class="hot">
              <br /><a>啊哈</a>
              <div class="label_give"></div>
            </li>
            <li><br /><a>啊哈</a></li>
            <li><br /><a>啊哈</a></li>
            <li><br /><a>啊哈</a></li>
          </ul>
        </div>
        <div class="bargain"></div>
      </div>
    </div>
  </div>
  <!-- 主模块 end -->
</template>

<script>
import home from "@/store/home";
import { mapState } from "vuex";
// 引入swiper
export default {
  name: "CarouselFigure",
  mounted() {
    // 派发action，通过vuex向mock发起请求，将获取的数据放在仓库中
    this.$store.dispatch("home/carouselList");
  },
  computed: {
    ...mapState("home", ["carouselList"]),
  },
};
</script>

<style>
.main {
  width: 980px;
  height: 445px;
  /* 这里真的很奇怪诶，margintop=10会挤到typenav盒子，但是padding就不会挤到 */
  margin: 0 0 0 220px;
  padding-top: 10px;
}
/* 焦点图 */
.main .swiper {
  position: relative;
  overflow: hidden;
  float: left;
  width: 721px;
  height: 100%;
}
/* 快报 */
.main .newsflash {
  float: right;
  width: 250px;
  height: 100%;
  background-color: rgb(243, 165, 165);
}
.news {
  height: 165px;
}
.news_hd {
  height: 33px;
  padding: 0 20px;
  border-bottom: 1px dotted #b4b0b1;
  line-height: 33px;
}
.news_hd h5 {
  float: left;
  color: #fff;
  font-size: 14px;
}
.news_hd a {
  float: right;
  color: #fff;
}
.news a:hover,
.playservice ul li a:hover {
  color: rgb(47, 122, 235);
}
.news_hd a::after {
  content: "\e903";
  font-family: "icomoon";
}
.news_bd {
  padding: 5px 15px 0;
}
.news_bd ul li {
  height: 24px;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 跑图服务 */
.playservice {
  overflow: hidden;
  height: 211px;
  border: 1px solid #b4b0b1;
  border-bottom: 0;
}
.playservice ul {
  width: 252px;
}
.playservice ul li {
  float: left;
  width: 63px;
  height: 70px;
  padding: 10px;
  border-right: 1px solid #b4b0b1;
  border-bottom: 1px solid #b4b0b1;
  line-height: 20px;
  text-align: center;
}
.playservice ul li::before {
  content: "\e902";
  font-family: "icomoon";
  font-size: 22px;
  color: #fff;
}
.playservice ul li a {
  color: #fff;
}
.playservice .hot {
  position: relative;
}
.playservice .label_give {
  position: absolute;
  top: 0;
  right: 7px;
  width: 14px;
  height: 20px;
  border-top: 10px solid rgb(245, 185, 73);
  border-right: 7px solid rgb(245, 185, 73);
  border-left: 7px solid rgb(245, 185, 73);
  border-bottom: 10px solid transparent;
}
</style>