<template>
  <!-- 下拉菜单 start -->
  <div class="w">
    <!-- mouseenter-leave不会冒泡是指触发一次再在子元素里移动不会继续出发enter事件，挺好的，看名字就看得出来，enter不就是enter一次吗
    相反，over和out可以冒泡 -->
    <div class="typenav" @mouseenter="showNav" @mouseleave="leaveIndex">
      <!-- title -->
      <div class="droptitle">商品分类</div>
      <!-- 下拉导航主体 -->
      <transition name="dropdown">
        <div class="dropdown" @click="goSearch" v-show="show">
          <div
            v-for="(c1, index) in categoryList"
            :key="c1.categoryId"
            @mouseenter="enterIndex(index)"
            class="items"
          >
            <!-- 一级导航 -->
            <a
              cur
              :data-categoryName="c1.categoryName"
              :data-category1Id="c1.categoryId"
              >{{ c1.categoryName }}</a
            >
            <!-- 二级导航 -->
            <div class="details" v-show="currentIndex == index">
              <div v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                <a
                  :data-categoryName="c2.categoryName"
                  :data-category2Id="c2.categoryId"
                  >{{ c2.categoryName }}</a
                >
              </div>
            </div>
          </div>
          <!-- <dd><a href="#">伴爱</a></dd>
          <dd><a href="#">圣诞老人</a></dd>
          <dd><a href="#">樱花🌸妹</a>、<a href="#">茶桌</a></dd>
          <dd><a href="#">捕鱼鱼达人</a></dd>
          <dd><a href="#">福娃套装</a></dd>
          <dd><a href="#">小王子</a></dd>
          <dd><a href="#">伴爱</a></dd>
          <dd><a href="#">圣诞老人</a></dd>
          <dd><a href="#">樱花🌸妹</a>、<a href="#">茶桌</a></dd>
          <dd><a href="#">捕鱼鱼达人</a></dd>
          <dd><a href="#">福娃套装</a></dd>
          <dd><a href="#">福娃套装</a></dd> -->
        </div>
      </transition>
      <!-- <div class="details">xx</div> -->
    </div>
  </div>
  <!-- 下拉菜单 end -->
</template>

<script>
import { mapState } from "vuex";
import { throttle } from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  mounted() {
    // 考虑性能优化，不要在这里加载数据，放到app组件中，别人用只需要加载一次
    // this.$store.dispatch("home/categoryList");
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    enterIndex: throttle(function (index) {
      this.currentIndex = index;
      // console.log(index);
    }, 100),
    // 老师只给鼠标进入加节流，不给鼠标移出加，就很离谱
    leaveIndex: throttle(function () {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
        // console.log("离开");
      }
    }, 100),
    // 商品导航块的跳转
    goSearch(e) {
      let item = e.target;
      let { categoryname, category1id, category2id } = item.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else {
          query.category2Id = category2id;
        }
        location.query = query;
        // 合并参数
        location.params = this.$route.params;
        this.$router.push(location);
      }
    },
    showNav() {
      if (this.$route.path != "/home") {
        this.show = true;
        // console.log("进入");
      }
    },
  },
};
</script>

<style>
/* .nav {
  height: 47px;
  border-bottom: 2px solid #00a4ff;
} */
.typenav {
  position: relative;
}
.droptitle {
  position: absolute;
  top: -47px;
  /* z-index: 2; */
  width: 210px;
  /* 我是做梦也没想到，这个盒子高度不够，原来写的45，导致他和子盒子有缝隙，但是被横线挡住了我没看出来 */
  height: 47px;
  margin-bottom: 2px;
  background-color: #00a4ff;
  color: #fff;
  text-align: center;
  line-height: 45px;
  font-size: 16px;
}
.dropdown {
  float: left;
  /* position: relative; */
  position: absolute;
  width: 210px;
  z-index: 2;
  /* height: 45px; */
}
.dropdown .items {
  /* position: relative; */
  /* display: none; */
  height: 35px;
  background-color: #00a6ff70;
  text-align: center;
  line-height: 35px;
}
.dropdown .items:hover {
  border-left: 2px solid #00a6ff70;
  background-color: rgb(255, 255, 255);
}
.dropdown .items a {
  margin-left: 2px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.dropdown .items:hover a {
  color: #00a4ff;
}
.dropdown .items::after {
  position: absolute;
  /* 加了top=0就把位置定死了，所有的都在第一行 */
  /* top: 0; */
  right: 10px;
  content: "\e907";
  color: #0a92dba9;
  font-family: "icomoon";
  font-size: 20px;
}
/* .dropdown-enter {
  height: 0;
}
.dropdown-enter-to {
  height: 455px;
}
.dropdown-enter-active {
  transition: all 1s;
} */
.details {
  position: absolute;
  top: 0;
  left: 210px;
  /* display: none; */
  z-index: 2;
  width: 731px;
  height: 455px;
  background-color: rgba(255, 255, 255, 0.6);
}
</style>