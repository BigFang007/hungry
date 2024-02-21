<template>
  <!-- 每日任务 start -->
  <div class="w">
    <div class="assign">
      <div class="assign_hd">
        <p>每日任务</p>
      </div>
      <div class="assign_bd">
        <img src="./images/xiaofangzi.jpg" alt="" />
        <img src="./images/xiaofangzi.jpg" alt="" />
        <img src="./images/xiaofangzi.jpg" alt="" />
        <img src="./images/xiaofangzi.jpg" alt="" />
      </div>
    </div>
  </div>
  <!-- 每日任务 end -->
</template>

<script>
export default {
  name: "DailyTasks",
};
</script>

<style>
.assign {
  height: 165px;
  margin-top: 10px;
  background-color: #dacee2c9;
}
.assign_hd {
  float: left;
  width: 220px;
  text-align: center;
}
.assign_hd::before {
  content: "\e900";
  font-family: "icomoon";
  font-size: 80px;
  color: rgba(221, 156, 221, 0.925);
}
.assign_hd p {
  font-size: 25px;
  color: #fff;
}
.assign_bd {
  float: left;
}
.assign_bd img {
  float: left;
  width: 245px;
  height: 165px;
}
</style>