import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from './router'
Vue.config.productionTip = false
// 引入仓库
import store from './store'

// 注册全局组件\
import Header from './components/Header'
Vue.component(Header.name, Header)
import Footer from './components/Footer'
Vue.component(Footer.name, Footer)
import TypeNav from './components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
import Carousel from './components/Carousel'
Vue.component(Carousel.name, Carousel)
// 引入mock文件
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'
window.Vue = new Vue({
  render: h => h(App),
  // 注册路由，使路由/非路由组件都有$route（路由信息path、query。。）/$router属性（编程式路由跳转）
  router,
  // 注册仓库，组件实例身上有$store属性
  store,
  // 配置全局事件总线--在Vue原型对象中添加属性$bus，其值为vm实例，就意味着$bus身上有vue所有的方法+属性
  beforeCreate() {
    Vue.prototype.$bus = this;
    // console.log(this.$bus);
  }
}).$mount('#app')
