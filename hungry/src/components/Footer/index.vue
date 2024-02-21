<template>
  <!-- footer start -->
  <div class="footer">
    <div class="w">
      <!-- 服务模块 start -->
      <div class="mod_service">
        <ul>
          <li>
            <h5></h5>
            <h4>XXXX</h4>
            <p>xxxxxxxx</p>
          </li>
          <li>
            <h5></h5>
            <h4>XXXX</h4>
            <p>xxxxxxxx</p>
          </li>
          <li>
            <h5></h5>
            <h4>XXXX</h4>
            <p>xxxxxxxx</p>
          </li>
          <li>
            <h5></h5>
            <h4>XXXX</h4>
            <p>xxxxxxxx</p>
          </li>
        </ul>
      </div>
      <!-- 服务模块 end -->
      <!-- 帮助模块 start -->
      <div class="mod_help">
        <dl>
          <dt>XXXX</dt>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
        </dl>
        <dl>
          <dt>XXXX</dt>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
        </dl>
        <dl>
          <dt>XXXX</dt>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
        </dl>
        <dl>
          <dt>XXXX</dt>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
        </dl>
        <dl>
          <dt>XXXX</dt>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
          <dd><a href="#">xxxx</a></dd>
        </dl>
        <dl>
          <dt>帮助中心</dt>
          <dd><img src="" alt="这是一个二维码" /></dd>
          <dd><a href="#">光遇赝网</a></dd>
        </dl>
      </div>
      <!-- 帮助模块 end -->
      <!-- 版权模块 start -->
      <div class="mod_copyright">
        <div class="links">
          <a href="#">XXXX</a>|<a href="#">XXXX</a>|<a href="#">XXXX</a>|<a
            href="#"
            >XXXX</a
          >|<a href="#">XXXX</a>|<a href="#">XXXX</a>|<a href="#">XXXX</a>|<a
            href="#"
            >XXXX</a
          >|
        </div>
        <div class="copyright">
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br />xxxxxxxxxxxxxxxxxxxxxxxxxx
        </div>
      </div>
      <!-- 版权模块 end -->
    </div>
  </div>
  <!-- footer end -->
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
/* jiojio */
.footer {
  padding-top: 30px;
  height: 415px;
  background-color: rgba(72, 134, 192, 0.829);
}
/* 服务模块 */
.mod_service {
  height: 80px;
  border-bottom: 1px solid #b4b0b1;
}
.mod_service ul li {
  float: left;
  width: 300px;
  padding-left: 30px;
}
.mod_service ul li h5 {
  float: left;
  width: 50px;
  height: 50px;
  margin-right: 8px;
  background: url(~@/assets/images/logo.jpeg);
}
.mod_service ul li h4 {
  font-size: 14px;
}
.mod_service ul li p {
  font-style: 12px;
}
/* 帮助模块 */
.mod_help {
  height: 185px;
  padding: 20px 0 0 50px;
  border-bottom: 1px solid #b4b0b1;
}
.mod_help dl {
  float: left;
  width: 200px;
}
.mod_help dl:last-child {
  width: 90px;
  text-align: center;
}
.mod_help dl dt {
  margin-bottom: 10px;
  font-size: 16px;
}
.mod_copyright {
  padding-top: 20px;
  text-align: center;
}
.links {
  margin-bottom: 15px;
}
.copyright {
  line-height: 20px;
}
</style>