<template>
  <div>
    <TypeNav></TypeNav>
    <!-- center会使页面内容都居中 -->
    <center>
      <!-- 面包屑 -->
      <ul class="breadcrumbs w">
        <li v-show="searchParams.categoryName">
          {{ searchParams.categoryName }}<i @click="removeCategory">x</i>
        </li>
        <li v-show="searchParams.keyword">
          {{ searchParams.keyword }}<i @click="removeKeyword">x</i>
        </li>
      </ul>
      <!-- 商品陈列 -->
      <Display :displayListShow="displayListShow" v-show="!showError"></Display>
      <!-- 搜索失败显示信息 -->
      <h3 class="showerror" v-show="showError">
        敬请期待,小光正在努力上新哟😊
      </h3>
      <!-- 分页器 -->
      <!-- 父组件这里自定义事件什么参数都不要带，，，服了，带了就相当于是定义的时候给他传参数 -->
      <Pagination
        v-show="!showError"
        :total="displayList.length"
        :pageNo="pageNo"
        @getPageNo="getPageNo"
      ></Pagination>
    </center>
  </div>
</template>

<script>
import search from "@/store/search";
import Display from "./Display";
import Pagination from "./Pagination";
import { mapState } from "vuex";

export default {
  name: "Search",
  components: {
    Display,
    Pagination,
  },
  computed: {
    ...mapState("search", ["displayList", "showError"]),
    displayListShow() {
      return this.displayList.slice((this.pageNo - 1) * 10, this.pageNo * 10);
    },
  },
  methods: {
    // 获取数据
    getData() {
      // 哈哈要加仓库名字，不然。。。
      this.$store.dispatch("search/displayList", this.searchParams);
      // console.log(typeof this.displayList); //object
      // console.log(this.displayList.length);//为啥对象还有length啊，因为数组也是对象？。。
    },
    // 面包屑-清除商品
    removeCategory() {
      //  把带给服务器的参数置空，设置为undefined这些字段不会带给服务器，设为‘’空还是会被传，相当于小优化
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.categoryName = undefined;
      // console.log(this.searchParams.categoryName, 1);
      // 不知道为什么query报错
      // this.$route.query = undefined;
      this.$router.push({ name: "search", params: this.$route.params });
    },
    // 面包屑-清楚关键字
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.$router.push({ name: "search", query: this.$route.query });
      // 通知header删除关键字
      this.$bus.$emit("clearKeyword");
    },
    // 从分页子组件获取当前页数
    getPageNo(pageNo) {
      this.pageNo = pageNo;
      // this.getData();
      // console.log(this.pageNo + "???");
    },
  },
  watch: {
    $route(newValue, oldValue) {
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // console.log(this.searchParams.categoryName, 2);
      this.getData();
    },
  },
  data() {
    return {
      // search post请求带给服务器参数
      searchParams: {
        category1Id: "",
        category2Id: "",
        categoryName: "",
        keyword: "",
        order: "",
      },
      pageNo: 1,
      // a: 1,
    };
  },
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
center {
  background-color: rgb(240, 213, 218);
}
.breadcrumbs li {
  float: left;
  margin: 10px 20px 0 0;
  padding: 3px;
  border: 1px solid skyblue;
  background-color: #fff;
  color: #494949;
  font-size: 15px;
}
.breadcrumbs i {
  padding-left: 10px;
  cursor: pointer;
}
.showerror {
  padding: 10px;
  /* background-color: rgb(240, 213, 218); */
  text-align: center;
  font-size: 30px;
  color: white;
}
</style>