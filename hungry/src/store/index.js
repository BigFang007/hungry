import Vue from 'vue';
import Vuex from 'vuex';

// 引入小仓库
import home from './home'
import search from './search';
import shopcar from './shopcar';
import user from './user';
// 使用插件
Vue.use(Vuex);
// 对外暴露store类实例
export default new Vuex.Store({
    modules: {
        home,
        search,
        shopcar,
        user
    }
})