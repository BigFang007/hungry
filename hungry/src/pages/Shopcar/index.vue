<template>
  <div>
    <TypeNav></TypeNav>
    <center class="shopcar-main">
      <table class="shopcar-table" cellspacing="0" rules="all">
        <!-- 标题行 -->
        <thead>
          <tr>
            <th width="15%">全部</th>
            <th class="th-2" width="30%">名称</th>
            <th class="th-3" width="15%">单价</th>
            <th class="th-4" width="15%">数量</th>
            <th class="th-5" width="15%">小计</th>
            <th class="th-6" width="10%">操作</th>
          </tr>
        </thead>
        <tbody>
          <!-- 购物车内容 -->
          <tr v-for="(s, index) in shopcarInfo" :key="index">
            <td>
              <input
                type="checkbox"
                v-model="s.isChecked"
                @click="updateChecked(index, s.isChecked)"
              />
            </td>
            <td>{{ s.shoppingName }}</td>
            <td>{{ s.unitPrice }}</td>
            <!-- 选购数量 -->
            <td>
              <input
                type="number"
                @click="getNumber(s.shoppingNumber)"
                @input="addShopping(index, s.shoppingNumber)"
                v-model.number="s.shoppingNumber"
              />
            </td>
            <td>
              {{ s.unitPrice.slice(0, 1)
              }}{{ s.unitPrice.slice(1) * s.shoppingNumber }}
            </td>
            <td>
              <button @click="deleteToShopcar(index)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total">
        <!-- 全选or not -->
        <input
          type="checkbox"
          id="allcheck"
          @click="updateAllChecked(isAllChecked)"
          v-model="isAllChecked"
        />
        <label for="allcheck" style="float: left">全选</label>
        <!-- <span style="float: left">删除全选</span> -->
        <button>结算</button>
        <span>合计: {{ total }}</span>
        <span>已选择{{ sum }}件商品</span>
      </div>
    </center>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Shopcar",
  computed: {
    ...mapState("shopcar", ["shopcarInfo"]),
    // ...mapState("shopcar", ["isAllChecked"]),这样写不行，要加setter，不然只读不改.computed里默认只有getter
  },
  data() {
    return {
      interim: 1,
      isAllChecked: false,
      sum: 0,
      total: "",
    };
  },
  methods: {
    async deleteToShopcar(index) {
      try {
        await this.$store.dispatch("shopcar/deleteShopping", index);
        this.$store.dispatch("shopcar/getShopcarInfo");
      } catch (error) {}
    },
    // 点击的时候就获取数量,避免乱改数字回不去
    getNumber(n) {
      this.interim = n;
      // this.updateTotal();
    },
    // 这里我不懂为什么1000ms后input框里的数字不会立马变
    // 难道是之前变化的是data里的数据，触发updata所以页面刷新了？
    addShopping(index, n) {
      if (/^[1-9]\d*$/.test(n)) {
        this.interim = n;
        //刷新总计，并修改数据库里的商品数据
        this.updateTotal();
        this.$store.dispatch("shopcar/changeShopping", index);
      } else {
        // setTimeout(() => {
        this.shopcarInfo[index].shoppingNumber = this.interim;
        // }, 1000);
      }
    },
    // 更新购物车项目check框
    updateChecked(index, isChecked) {
      // 先手动取反，因为点击时候ischecked的值还没来得及改变
      this.shopcarInfo[index].isChecked = !isChecked;
      // 更新全选框
      this.isAllChecked = this.shopcarInfo.every(
        (item) => item.isChecked == true
      );

      // 更新结算商品数量sum
      this.updateTotal();
    },
    updateAllChecked(isAllChecked) {
      // 天呐，点击触发的事件，参数isAllChecked是改变之前的！！
      isAllChecked = !isAllChecked;
      this.$store.commit("shopcar/UPDATEALLCHECKED", isAllChecked);
      this.updateTotal();
    },
    // 更新结算商品数量sum\商品价格total
    updateTotal() {
      this.sum = 0;
      this.total = "";
      let money = 0;
      let xin = 0;
      let la = 0;
      for (let k of this.shopcarInfo) {
        if (k.isChecked) {
          this.sum += k.shoppingNumber;
          let monetaryUnit = k.unitPrice.slice(0, 1);
          let monetaryNum = parseInt(k.unitPrice.slice(1) * k.shoppingNumber);
          if (monetaryUnit == "¥") {
            money += monetaryNum;
          } else if (monetaryUnit == "心") {
            xin += monetaryNum;
          } else if (monetaryUnit == "蜡") {
            la += monetaryNum;
          }
        }
      }
      this.total =
        (money ? "¥" + money + " " : "") +
        (xin ? "心" + xin + " " : "") +
        (la ? "蜡" + la : "");
    },
  },
  mounted() {
    this.$store.dispatch("shopcar/getShopcarInfo");
  },
};
</script>

<style>
.shopcar-table {
  /* fixed是自定义宽度，默认是auto，inherit是继承 */
  table-layout: fixed;
  width: 1000px;
  background-color: skyblue;
  text-align: center;
  color: white;
}
.shopcar-table th {
  height: 40px;
  border: 2px solid rgb(102, 203, 243);
  font-size: 20px;
}
.shopcar-table td {
  height: 30px;
  border: 1px dotted rgb(102, 203, 243);
  font-size: 17px;
}
.shopcar-table input {
  width: 40px;
  height: 20px;
}
.shopcar-table button {
  border: 1px solid rgb(252, 218, 218);
  border-radius: 5px;
  background-color: rgb(236, 124, 124);
  box-shadow: 2px 2px 2px rgb(236, 124, 124, 0.7);
  color: white;
}
.total {
  margin-top: 15px;
  width: 1000px;
  height: 40px;
  background-color: skyblue;
  line-height: 40px;
  font-size: 16px;
  color: white;
}
.total input {
  float: left;
  margin: 10px;
  height: 20px;
  width: 20px;
}
.total span,
.total button {
  float: right;
  margin-left: 10px;
}
.total button {
  margin: 2px 5px;
  border: 1px solid rgb(140, 190, 248);
  border-radius: 5px;
  background-color: rgb(109, 146, 248);
  box-shadow: 2px 2px 2px rgb(109, 146, 248);
  font-size: 20px;
  color: white;
}
</style>