<template>
  <div>
    <TypeNav></TypeNav>
    <div class="w">
      <!-- 注册主体 -->
      <div class="reg_log">
        <!-- 注册头部 -->
        <h3>
          注册新用户
          <div class="pink-head">
            已注册，去<router-link to="/login">登陆</router-link>
          </div>
        </h3>
        <!-- 注册表 -->
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
                  @input="checkUserTell"
                />
                <!-- 这谁看了不得夸一句--漂亮！！ -->
                <span class="warn" v-if="user.tell == ''"
                  >请输入11位电话号码</span
                >
                <span class="success" v-else-if="!err.tell"
                  ><i class="success_icon"> ✅ </i>电话号码格式正确</span
                >
                <span class="error" v-else>手机号码格式不正确</span>
              </li>
              <!-- 用户名 -->
              <li>
                <label for="username">用户名：</label
                ><input
                  type="text"
                  id="username"
                  class="inp"
                  maxlength="8"
                  v-model="user.name"
                />
                <span class="warn">用户名不能超过八个字符哦</span>
              </li>
              <!-- 验证码 -->
              <li>
                <label for="captcha">验证码：</label
                ><input
                  type="tell"
                  id="captcha"
                  class="inp"
                  maxlength="6"
                  v-model="user.captcha"
                />
                <!-- 如果电话号码不正确，这个按钮是失效的 -->
                <button
                  class="captcha"
                  @click="getCaptcha"
                  :disabled="err.tell"
                  v-if="num == 0"
                >
                  发送验证码
                </button>
                <!-- 不可点击的按钮，且有倒计时 -->
                <button class="captcha" disabled v-else>
                  请{{ num }}秒后重试
                </button>
              </li>
              <!-- 设置密码 -->
              <li>
                <label for="password">登陆密码：</label
                ><input
                  type="password"
                  id="password"
                  class="inp"
                  maxlength="10"
                  v-model="user.password1"
                  @input="checkUserPassword"
                />
                <span class="warn" v-if="user.password1 == ''"
                  >密码只能由4～10位大小写字母、数字构成</span
                >
                <span class="error" v-else-if="err.password"
                  >密码格式不正确</span
                >
                <span class="success" v-else>
                  <i class="success_icon"> ✅ </i>密码格式正确
                </span>
              </li>
              <!-- 验证密码安全程度 -->
              <li class="pwLevel">
                安全程度<span :class="{ ruo: pwLevel.ruo }">弱</span
                ><span :class="{ zhong: pwLevel.zhong }">中</span
                ><span :class="{ qiang: pwLevel.qiang }">强</span>
              </li>
              <!-- 再次确认密码 -->
              <li>
                <label for="again">确认密码：</label>
                <input
                  type="password"
                  id="again"
                  class="inp"
                  maxlength="10"
                  v-model="password2"
                  @input="checkAgain"
                />
                <span class="warn" v-if="password2 == ''">请再次确认密码</span>
                <span class="error" v-else-if="err.again"
                  ><i class="error_icon"> ❌ </i>密码不匹配</span
                >
                <span class="success" v-else>
                  <i class="success_icon"> ✅ </i>密码匹配成功
                </span>
              </li>
              <!-- 同意用户协议 -->
              <li class="agree">
                <input type="checkbox" checked="checked" v-model="aggre" />
                同意协议并注册
                <a href="#"> 《用户协议》</a>
              </li>
              <!-- 注册 -->
              <li>
                <input
                  type="submit"
                  value="立即注册"
                  class="btn"
                  @click="register"
                />
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
    <!-- 这里没有footer是因为一开始在路由哪里设置好了，但我改了（router-link->to的地方要加<router-view></router-view>） -->
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      // 用户相关
      user: { tell: "", name: "", password1: "", captcha: "" },
      password2: "",
      // 错误相关，默认false都是无错
      err: { tell: true, password: true, again: true },
      // 密码安全等级
      pwLevel: { ruo: false, zhong: false, qiang: false },
      // 同意协议，默认勾选
      aggre: true,
      // 60s后才能再次获取验证码,默认是0，0的时候可以点击
      num: 0,
    };
  },
  methods: {
    // 验证电话号码格式，不正确的话就置空x
    checkUserTell() {
      // 如果符合该正则表达式，就代表电话号码合理，false-》无错
      if (
        /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(
          this.user.tell
        )
      ) {
        this.err.tell = false;
        // 一秒后清空电话号码---清空不人性化
        // setTimeout(() => (this.user.tell = ""), 1000);
      } else {
        this.err.tell = true;
      }
    },
    // 触发仓库获取验证码,并设置60s冷却时间
    getCaptcha() {
      this.$store.dispatch("user/getCaptcha", this.user);
      // console.log("能获取验证码");
      this.num = 60;
      // 验证码不能点击太快
      const countdown = setInterval(() => {
        if (this.num >= 1) this.num--;
        else {
          this.num = 0;
          clearInterval(countdown);
        }
      }, 1000);
    },
    // 验证密码合法性
    checkUserPassword() {
      // 密码合法-验证安全等级
      if (
        // (?=.*[a-z])表示任意字符串后的a～z
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{4,10}$/.test(
          this.user.password1
        )
      ) {
        this.err.password = false;
        // 简易根据密码长度判断密码安全度
        let length = this.user.password1.length;
        // 拍他思想
        this.pwLevel.ruo = false;
        this.pwLevel.zhong = false;
        this.pwLevel.qiang = false;
        if (length > 0 && length < 7) this.pwLevel.ruo = true;
        else if (length > 6 && length < 9) this.pwLevel.zhong = true;
        else this.pwLevel.qiang = true;
      }
      // 密码不合法,true代表确实有错
      else {
        this.pwLevel.ruo = false;
        this.pwLevel.zhong = false;
        this.pwLevel.qiang = false;
        this.err.password = true;
      }
    },
    // 验证两次密码是否一致
    checkAgain() {
      //buyizhi
      if (this.user.password1 != this.password2) {
        this.err.again = true;
      } else {
        this.err.again = false;
      }
    },
    // 注册
    register() {
      const { tell, password, again } = this.err;
      // 在前端就确保表单内容完整
      if (
        !tell &&
        !password &&
        !again &&
        this.user.name &&
        this.user.captcha &&
        this.aggre
      ) {
        console.log("提交");
        this.$store.dispatch("user/register", this.user);
      } else {
        alert("请完善注册表");
      }
    },
  },
};
</script>

<style>
/* 注册 */
.reg_log {
  /* height: 520px; */
  border: 1px solid #00a4ff;
  /* margin-top: 20px; */
}
.reg_log h3 {
  height: 42px;
  padding: 0 10px;
  border-bottom: 1px dotted #00a4ff;
  background-color: pink;
  line-height: 42px;
  color: white;
  font-size: 18px;
  font-weight: 400;
}
.pink-head {
  float: right;
  font-size: 14px;
}
.pink-head a,
.agree a {
  color: rgb(156, 198, 214);
}
.pink-head a:hover,
.agree a:hover {
  color: #00a4ff;
}
/* 注册表/登陆表 */
.reg-log_form {
  width: 600px;
  margin: 30px auto;
  /* background-color: #00a4ff; */
}
.reg-log_form ul li {
  margin-bottom: 30px;
}
.reg-log_form ul li label {
  display: inline-block;
  width: 88px;
  text-align: right;
}
.reg-log_form ul li .inp {
  width: 242px;
  height: 37px;
  border: 1px solid #00a4ff;
}
.reg-log_form .captcha {
  margin-left: 5px;
  height: 37px;
  border: 1px solid #41b7f7;
  cursor: pointer;
}
.error {
  color: red;
}
.error_icon,
.success_icon {
  display: inline-block;
  width: 20px;
  height: 20px;
}
.warn {
  color: coral;
}
.success {
  color: rgb(169, 224, 87);
}
/* 密码安全程度 */
.pwLevel {
  margin-top: -15px;
  padding-left: 145px;
}
.pwLevel span {
  margin: 0 5px;
  padding: 0 12px;
  background-color: rgb(202, 199, 199);
  color: white;
}
.pwLevel .ruo {
  background-color: red;
}
.pwLevel .zhong {
  background-color: green;
}
.pwLevel .qiang {
  background-color: orange;
}
/* 用户协议 ｜｜记住密码*/
.agree {
  padding-left: 95px;
}
/* 提交注册 ｜｜登陆*/
.btn {
  width: 200px;
  height: 34px;
  margin-top: -15px;
  margin-left: 95px;
  background-color: #00a4ff;
  color: white;
  font-size: 14px;
}
/* .mod_copyright {
  padding-top: 20px;
  text-align: center;
}
.links {
  margin-bottom: 15px;
}
.copyright {
  line-height: 20px;
} */
</style>