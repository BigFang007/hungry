<template>
  <div class="pagination skybutton">
    <div class="w">
      <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
        上一页
      </button>
      <button v-if="computedPages.start > 1" @click="$emit('getPageNo', 1)">
        1
      </button>
      <button v-if="computedPages.start > 2">...</button>
      <!-- 中间部分 -->
      <!-- 绝绝子 -->
      <button
        v-for="(page, index) in continues > totalPage ? totalPage : continues"
        :key="index"
        @click="$emit('getPageNo', computedPages.start + page - 1)"
        :class="{ active: pageNo == computedPages.start + page - 1 }"
      >
        {{ computedPages.start + page - 1 }}
      </button>

      <button v-if="computedPages.end < totalPage - 1">...</button>
      <button
        v-if="computedPages.end < totalPage"
        @click="$emit('getPageNo', totalPage)"
      >
        {{ totalPage }}
      </button>
      <button
        :disabled="pageNo == totalPage"
        @click="$emit('getPageNo', pageNo + 1)"
      >
        下一页
      </button>
      <button>共{{ total }}条</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 这里的pageNo要传过来，不然写死了分页器点不动
  props: ["total", "pageNo"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    computedPages() {
      let start = 0,
        end = 0;
      if (this.continues >= this.totalPage) {
        start = 1;
        end = this.totalPage;
        // console.log("yes");
      } else {
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        if (start < 1) {
          start = 1;
          end = this.continues;
          // console.log(start);
        }
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
  data() {
    return {
      // 当前是第几页、每页展示几组数据,
      pageSize: 10,
      continues: 3,
    };
  },
};
</script>

<style>
.pagination {
  background-color: rgb(240, 213, 218);
}
.skybutton button {
  height: 30px;
  margin: 10px 10px;
  padding: 0 9px;
  border: 2px solid skyblue;
  background-color: #5fc4fa70;
  color: white;
  line-height: 26px;
  cursor: pointer;
}
.skybutton .active {
  background-color: rgb(24, 164, 207);
}
</style>