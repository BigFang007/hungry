<template>
  <div id="app">
    <Header />
    <!-- 显示与 url 对应的组件 -->
    <router-view></router-view>
    <!-- 其实我不懂为什么有的页面没有footer -->
    <!-- <Footer v-show="$route.meta.showfooter" /> -->
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 一开始就加载好数据存入仓库
    this.$store.dispatch("home/categoryList");
  },
};
</script>

<style>
@import "@/assets/base.css";
/* 版心 */
.w {
  width: 1200px;
  margin: 0 auto;
}
a:hover {
  color: rgba(0, 195, 255, 0.5);
}
.style_red {
  color: rgb(214, 81, 81);
}
.style_bule {
  color: #00a4ff;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>

