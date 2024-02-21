<template>
  <div class="w">
    <TypeNav></TypeNav>
    <div class="detail-main">
      <div class="carousel">
        <Carousel :list="detail.pic"></Carousel>
      </div>
      <div class="detail-right">
        <div class="description">
          <h4>{{ detail.name }}:</h4>
          <i>{{ detail.description }}</i>
        </div>
        <div class="sales">总销量: 33333334528件</div>
        <div class="addtoShopcar">
          <input
            type="number"
            @input="changeNum"
            v-model.number="shoppingNumber"
          />
          <button @click="addtoShopcar">加入购物车</button>
        </div>
      </div>
      <div class="appraises">滚动评价待定</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      shoppingNumber: 1,
      flag: true,
      interim: 1,
      // 设置一个函数接收东西，不然赋值会改变detail对象的内容
      shopping: {},
    };
  },
  computed: {
    detail() {
      return JSON.parse(sessionStorage.getItem("detail"));
    },
  },
  beforeDestroy() {
    // console.log("我死了");
    this.$bus.$off("getDetail");
  },
  methods: {
    // 加入购物车操作

    addtoShopcar() {
      // 如果没有token说明没登录，弹框提示请先登录
      if (!localStorage.getItem("token")) {
        alert("请您先登录");
        return false;
      }
      if (this.flag) {
        // 把购物车页面需要的数据存储到store里，供shopcar页面获取
        // 额外添加属性，ischecked，标识是否选中
        Object.assign(
          this.shopping,
          this.detail,
          {
            n: this.shoppingNumber,
          }
          // { isChecked: false }//数据库没有这个字段，这里加了也没用，在mutation里加吧，反正数据库不需要这个属性
        );
        delete this.shopping.description;
        delete this.shopping.pic;
        // 返回成功的结果
        this.$store.dispatch("shopcar/addInfo", this.shopping);
      } else {
        alert("请输入合法数字");
      }
    },
    // 修改要加入购物车的数量
    changeNum(e) {
      // let value = e.target.value;
      if (/^[1-9]\d*$/.test(this.shoppingNumber)) {
        this.interim = this.shoppingNumber;
        this.flag = true;
      } else {
        this.flag = false;
        setTimeout(() => {
          this.shoppingNumber = this.interim;
          this.flag = true;
        }, 1000);
      }
    },
  },
};
</script>

<style>
.detail-main {
  width: 1200px;
  height: 600px;
}
.carousel {
  float: left;
  width: 930px;
  height: 430px;
}
.carousel .swiper {
  /* 有子盒子是absolute，所以这里要设置relative */
  position: relative;
  overflow: hidden;
  height: 100%;
}
.detail-right {
  float: right;
  width: 270px;
  height: 100%;
  padding: 20px;
  background-image: linear-gradient(skyblue, rgba(245, 231, 106, 0.842), pink);
  color: white;
}
.description {
  overflow: hidden;
  word-wrap: break-word;
  /* 将对象作为弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 从上到下垂直排列子元素 */
  -webkit-box-orient: vertical;
  /* 表示显示的行数（需要结合上面两个属性） */
  -webkit-line-clamp: 13;
  height: 390px;
  /* border: 1px solid cornflowerblue; */
  font-size: 20px;
}
.description i {
  font-size: 18px;
}
.addtoShopcar {
  padding: 20px 0;
}
.addtoShopcar input {
  width: 70px;
  height: 50px;
}
.addtoShopcar button {
  width: 150px;
  height: 50px;
  background-color: skyblue;
}
.sales {
  margin-top: 25px;
  font-size: 20px;
}
.appraises {
  float: left;
  width: 930px;
  height: 170px;
  background-color: #3b8ccfb2;
  color: white;
  font-size: 40px;
}
</style>