<template>
  <div>
    <TypeNav></TypeNav>
    <div class="w">
      <!-- 登陆主体 -->
      <div class="reg_log">
        <!-- 登陆头部 -->
        <h3>
          登陆
          <div class="pink-head">
            未注册，去<router-link to="/register">注册</router-link>
          </div>
        </h3>
        <!-- 登陆表 -->
        <div class="reg-log_form">
          <form action="">
            <ul>
              <!-- 输入手机号 -->
              <li>
                <label for="tell">手机号：</label
                ><input
                  type="tel"
                  id="tell"
                  class="inp"
                  maxlength="11"
                  v-model="user.tell"
                />
              </li>
              <li>
                <label for="password">登陆密码：</label
                ><input
                  type="password"
                  id="password"
                  class="inp"
                  maxlength="10"
                  v-model="user.password"
                />
              </li>
              <li>
                <!-- submit默认提交跳转，+prevent组织默认行为，不然登录的时候，第一次会清空框框，需要登陆2次 -->
                <input
                  type="submit"
                  value="登陆"
                  class="btn"
                  @click.prevent="login"
                />
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
    <!-- 这里没有footer是因为一开始在路由哪里设置好了 -->
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: { tell: "", password: "" },
    };
  },
  methods: {
    // 登陆业务
    async login() {
      // 检测格式
      const tellCheck =
        /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(
          this.user.tell
        );
      const pwCheck = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{4,10}$/.test(
        this.user.password
      );
      // 基本格式正确，触发action，调用接口
      if (tellCheck && pwCheck) {
        await this.$store.dispatch("user/login", this.user);
        // await成功后，执行下面的操作
        let topath = this.$route.query.redirect || "/home";
        this.$router.push(topath);
      } else {
        alert("电话号码或密码格式不正确");
      }
    },
  },
};
</script>

<style>
</style>