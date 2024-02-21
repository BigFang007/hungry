<template>
  <div>
    <TypeNav></TypeNav>
    <CarouselFigure></CarouselFigure>
    <DailyTasks></DailyTasks>
    <Season v-for="s in seasonList" :key="s.id" :season="s"></Season>
  </div>
</template>

<script>
import CarouselFigure from "./CarouselFigure";
import DailyTasks from "./DailyTasks";
import Season from "./Season";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    CarouselFigure,
    DailyTasks,
    Season,
  },
  mounted() {
    this.$store.dispatch("home/seasonList");
    // 浅浅获取用户信息
    this.$store.dispatch("user/getUserInfo");
  },
  computed: {
    ...mapState("home", ["seasonList"]),
  },
};
</script>

<style>
</style>