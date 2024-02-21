<template>
  <div>
    <!-- 快捷导航 start-->
    <section class="shortcut">
      <div class="w">
        <!-- 左 -->
        <div class="fl">
          <ul>
            <li>光遇赝网欢迎逆子们!&nbsp;&nbsp;</li>
            <!-- 未登陆 -->
            <li v-if="!username">
              <!-- 登陆有路由跳转，将a转为routerlink -->
              <router-link to="/login">请登录</router-link>&nbsp;
              <router-link to="/register" class="style_red"
                >免费注册</router-link
              >
            </li>
            <!-- 已登陆 -->
            <li v-else>
              {{ username }}
              <a class="style_red" @click="logout">退出登陆</a>
            </li>
          </ul>
        </div>
        <!-- 右 -->
        <div class="fr">
          <ul>
            <li>我的订单</li>
            <li>|</li>
            <li class="arrow_icon1">我的衣柜</li>
            <li>|</li>
            <li>周边商城</li>
            <li>|</li>
            <li class="arrow_icon2">季节预览</li>
            <li>|</li>
            <li>客服</li>
            <li>|</li>
            <li>网站导航</li>
          </ul>
        </div>
      </div>
    </section>
    <!-- 快捷导航 end -->
    <!-- 头部模块 start -->
    <header class="header w">
      <!-- logo SEO优化 start-->
      <div class="logo">
        <h1>
          <router-link to="/home" title="光遇赝网">光遇赝网</router-link>
        </h1>
      </div>
      <!-- logo SEO优化 end -->
      <!-- 搜索框🔍 start-->
      <div class="search">
        <input type="search" placeholder="驯龙高手" v-model="keyword" />
        <button @click="goSearch">搜索</button>
      </div>
      <!-- 搜索框 end -->
      <!-- 高频搜索词 start-->
      <div class="hotwords">
        <a href="#" class="style_red">无翼坠机</a>
        <a href="#">暴风雨直飞</a>
        <a href="#">卡红石雨🌧️</a>
        <a href="#">遁地</a>
        <a href="#">复刻疯了</a>
      </div>
      <!-- 高频搜索词 end -->
      <!-- 购物车 start -->
      <router-link to="/shopcar" class="shopcar">
        我的购物车
        <span class="count">8</span>
      </router-link>
      <!-- 购物车 end -->
    </header>
    <!-- 头部模块 end -->
    <!-- 导航栏 start -->
    <nav class="nav">
      <div class="w">
        <!-- 下拉菜单 start -->
        <!-- <div class="droptitle">
          <dl>
            <dt>商品分类</dt>
          </dl>
        </div> -->
        <!-- 下拉菜单 end -->
        <!-- 衣柜细分 start -->
        <div class="navitems">
          <ul>
            <li><a href="#">裤子👖</a></li>
            <li><a href="#">面具🎭</a></li>
            <li><a href="#">发型👧</a></li>
            <li><a href="#">斗篷🎽</a></li>
            <li><a href="#">背饰🎸</a></li>
            <li><a href="#">动作🤸🏻</a></li>
            <li><a href="#">魔法🪄</a></li>
            <li><a href="#">商船🛶</a></li>
            <li><a href="#">办公室🏡</a></li>
          </ul>
        </div>
        <!-- 衣柜细分 end -->
      </div>
    </nav>
    <!-- 导航栏 end -->
  </div>
</template>

<script>
import Home from "@/pages/Home";
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  // 如果登陆成功、获取了用户信息，就要在头部展示用户名
  computed: {
    username() {
      return this.$store.state.user.userInfo.name;
    },
  },
  components: {
    Home,
  },
  methods: {
    // 路由的跳转--编程式导航
    goSearch() {
      // 字符串/模版字符串写法
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 对象写法，params要占位，且要用name不能用path
      // 方法1
      // let location = {
      //   name: "search",
      //   // path: "/search",
      //   params: {
      //     keyword: this.keyword || undefined,
      //   },
      // };
      // // 事先点了商品分类，要带上query参数
      // if (this.$route.query) {
      //   location.query = this.$route.query;
      // }
      // this.$router.push(location);
      // 方法2
      this.$router.push({
        name: "search",
        // path: "/search",
        params: {
          keyword: this.keyword || undefined,
        },
        query: this.$route.query,
      });
    },
    // 退出登录——清理当前用户缓存数据，返回登陆页
    async logout() {
      try {
        await this.$store.commit("user/LOGOUT");
        // console.log("退出登录");
        this.$router.push("/");
      } catch (error) {}
    },
  },
  mounted() {
    // 在全局事件总线上注册事件clearKeyword
    this.$bus.$on("clearKeyword", () => {
      this.keyword = "";
    });
  },
};
</script>

<style >
@font-face {
  font-family: "icomoon";
  src: url("~@/assets/fonts/icomoon.eot?w6zuv8");
  src: url("~@/assets/fonts/icomoon.eot?w6zuv8#iefix")
      format("embedded-opentype"),
    url("~@/assets/fonts/icomoon.ttf?w6zuv8") format("truetype"),
    url("~@/assets/fonts/icomoon.woff?w6zuv8") format("woff"),
    url("~@/assets/fonts/icomoon.svg?w6zuv8#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
/* 快捷导航 */
.shortcut {
  height: 30px;
  line-height: 30px;
  background-color: antiquewhite;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.shortcut li {
  float: left;
}
.shortcut .fr ul li:nth-child(even) {
  width: 1px;
  height: 12px;
  margin: 0 15px;
}
.arrow_icon1::after {
  content: "\e90d";
  font-family: "icomoon";
  margin-left: 6px;
  color: rgb(255, 123, 0);
}
.arrow_icon2::after {
  content: "\e90e";
  font-family: "icomoon";
  margin-left: 6px;
}
/* 头部制作 */
.header {
  position: relative;
  height: 105px;
  background-color: rgba(255, 192, 203, 0.699);
}
.logo {
  position: absolute;
  top: 12px;
  left: 15px;
  width: 75px;
  height: 75px;
}
/* 虽然那边写的是router-link，但是最终会转换为a的，所以样式不会失效 */
.logo a {
  display: block;
  width: 75px;
  height: 75px;
  background: url(~@/assets/images/logo.jpeg) no-repeat;
  font-size: 0;
}
/* 搜索框 */
.search {
  position: absolute;
  top: 25px;
  left: 350px;
  width: 538px;
  height: 36px;
  border: 2px solid #00a4ff;
}
.search input {
  float: left;
  width: 454px;
  height: 32px;
  padding-left: 10px;
}
.search button {
  float: left;
  width: 80px;
  height: 32px;
  background-color: #00a4ff;
  font-size: 16px;
  color: white;
}
/* 高频词 */
.hotwords {
  position: absolute;
  top: 70px;
  left: 350px;
}
.hotwords a {
  margin: 0 15px 0 10px;
  font-size: 12px;
}
/* 购物车 */
.shopcar {
  position: absolute;
  right: 60px;
  top: 25px;
  width: 140px;
  height: 35px;
  border: 1px solid #00a4ff;
  line-height: 33px;
  text-align: center;
}
.shopcar::before {
  margin-right: 5px;
  content: "\e90b";
  font-family: "icomoon";
  color: #00a4ff;
}
/* 这里我有个很大的疑问，为什么padding和margin挤不掉> */
/* 卧槽卧槽破案啦  行内元素设置水平内外边距有效，垂直无效*/
.shopcar::after {
  display: line-block;
  margin-left: 10px;
  /* padding-top: 20px; */
  content: "\e910";
  font-family: "icomoon";
}
.shopcar .count {
  position: absolute;
  top: -5px;
  left: 105px;
  height: 14px;
  background-color: #00a4ff;
  line-height: 14px;
  color: #fff;
  padding: 0 5px;
  border-radius: 7px 7px 7px 0;
}
/* 导航栏 */
.nav {
  height: 47px;
  border-bottom: 2px solid #00a4ff;
}
/* 衣柜 */
.nav .navitems {
  float: left;
  margin-left: 25px;
  padding-left: 200px;
}
.navitems ul li {
  float: left;
}
.navitems ul li a {
  display: block;
  height: 45px;
  padding: 0 25px;
  line-height: 45px;
  font-size: 16px;
}
</style>