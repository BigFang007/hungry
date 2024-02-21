<template>
  <div class="w">
    <div class="box-hd">
      <div>
        <!-- <h3>精品推荐</h3> -->
        <a href="#">查看全部</a>
      </div>
      <!-- 排序 -->
      <div class="sequence skybutton">
        <button class="active">综合</button>
        <button>价格</button>
        <button>上架时间</button>
      </div>
    </div>
    <div class="box-bd">
      <ul class="clearfix">
        <!-- 1 -->
        <li class="mask-bb" v-for="d in displayListShow" :key="d.id">
          <div class="mask"></div>
          <img :src="d.imgUrl" />
          <p class="review">
            {{ d.appraises }}
          </p>
          <div class="appraise">来自大冤种的评价</div>
          <div class="info">
            <h4 class="goods-name">
              <!-- 这么久我才发现我的问题是页面跳转了两次，此一次是触发godetail，第二次是a标签的href -->
              <a @click="goDetail(d.detail, d.name, d.price)">
                {{ d.name }}...</a
              >
            </h4>
            <em>|</em>
            <span>{{ d.price }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Display",
  props: ["displayListShow"],
  methods: {
    goDetail(detail, name, price) {
      this.$router.push({ name: "detail" });
      // this.$nextTick(() => {
      //   this.$bus.$emit("getDetail", detail);
      // });
      // 合并对象,把名字、价格传过去--如果mock的时候我没有写detail，就在这里加上，不然detail为undefined，onject.assign啥都没有
      if (!detail) {
        detail = {
          pic: [
            {
              id: "1.1",
              imgUrl: "./displayImage/1.1.JPG",
            },
            {
              id: "1.2",
              imgUrl: "./displayImage/1.2.JPG",
            },
            {
              id: "1.3",
              imgUrl: "./displayImage/1.3.JPG",
            },
            {
              id: "1.4",
              imgUrl: "./displayImage/1.4.JPG",
            },
          ],
          description:
            "!!!Thatgamecompany是由南加州大学学生开创的游戏公司，专注于设计PSN独占的创意休闲游戏。Thatgamecompany是一家独立游戏开发公司，产品有《云》、《浮游世界》、《花》、《旅行》等。tgc斗篷是售价软妹币198的tgc功能斗篷，是通往办公室的唯一钥匙。hahahahahahahahahahahahahahahahavhahahahahahahahahahahahahahahahahahahahavhahahaha",
        };
      }
      const information = Object.assign(detail, { name }, { price });
      sessionStorage.setItem("detail", JSON.stringify(information));
    },
  },
};
</script>

<style>
.box-hd h3 {
  float: left;
  margin-top: 10px;
  color: #494949;
  font-size: 20px;
}
.box-hd a {
  float: right;
  margin: 10px 30px 0 0;
  color: #a5a5a5;
  font-size: 12px;
}
.box-hd .sequence {
  padding-top: 45px;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  *zoom: 1;
  padding: 11px 0;
}
.box-bd ul {
  width: 1215px;
  /* background-color: rgb(233, 116, 116); */
}
.box-bd ul li {
  position: relative;
  float: left;
  width: 228px;
  height: 332px;
  margin-right: 15px;
  margin-bottom: 15px;
  background-color: #fff;
}
.box-bd li:hover {
  box-shadow: 10px 10px 10px -4px rgba(248, 188, 188, 0.7);
}
.box-bd ul li .mask {
  display: none;
  position: absolute;
  width: 100%;
  height: 105px;
  background: rgba(0, 0, 0, 0.3);
}
.box-bd li:hover .mask {
  display: block;
}
.box-bd img {
  width: 100%;
}

.box-bd .review {
  padding: 0 28px;
  color: rgb(160, 158, 158);
  font-size: 15px;
  margin-top: 30px;
  height: 70px;
}

.box-bd .appraise {
  margin-top: 30px;
  color: rgb(189, 186, 186);
  font-size: 12px;
  padding: 0 28px;
}

.box-bd .goods-name {
  display: inline-block;
  font-weight: 400;
}

.box-bd .info {
  padding: 0 28px;
  font-size: 14px;
  margin-top: 25px;
}

.box-bd .info span {
  color: #ff6700;
}

.box-bd .info em {
  font-style: normal;
  color: #ebe4e0;
  margin: 0 8px 0 15px;
}
</style>