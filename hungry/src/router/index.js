import Vue from "vue";
import Vuerouter from 'vue-router';
// 使用插件
Vue.use(Vuerouter);
// 引入路由组件
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Searche from '@/pages/Search';
import Detail from '@/pages/Detail'
import Shopcar from '@/pages/Shopcar'
import Pay from '@/pages/Pay'
// 引入仓库，路由守卫要用
import store from '@/store'
// 拷贝一份Vuerouter原型对象的方法push/replace
let originPush = Vuerouter.prototype.push;
let originReplace = Vuerouter.prototype.replace;

// 重写push/replace--不然重复加载同一路径会报错
Vuerouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
};
Vuerouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        // 其实我还是没太懂这个this的问题
        // 在重写push中调用保存的originPush,因为originPush是挂载在window的方法,所以通过call修改this的指向？？？
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
};
// 配置路由
let router = new Vuerouter({
    routes: [
        {
            path: '/home',
            component: Home,
            // meta: {
            //     showfooter: true,
            // }
        },
        {
            name: 'search',
            // 加问号表示params可传可不传，但是不要写成空字符串，可以写undefined
            path: '/search/:keyword?',
            component: Searche,
            // meta: {
            //     showfooter: true,
            // }
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        // 重定向，路径为xx使跳到xx
        {
            path: '*',
            redirect: '/home'
        },
        {
            name: 'detail',
            path: '/detail',
            component: Detail,
            // meta: {
            //     showfooter: true,
            // }
        },
        {
            path: '/shopcar',
            component: Shopcar,
        },
        {
            path: '/pay',
            component: Pay,
        }
    ]
})
// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    let name = store.state.user.userInfo.name
    const token = localStorage.getItem('token')
    // 已登陆
    if (token) {
        // 不能再注册了
        if (to.path == '/login') {
            next('/home')
        }
        else {
            // 已有用户名
            if (name) {
                next()
            }
            // 没有用户信息,获取用户信息
            else {
                try {
                    await store.dispatch('user/getUserInfo');
                    next();
                } catch (error) {
                    console.log('快去router里检查错误！为啥token没有被删掉啊');
                    // token失效了，需要重新登陆，但这里userinfo是清空了，并没有删掉token，是为啥？
                    await store.commit('user/LOGOUT')
                    next('/login')
                }
            }
        }
    }
    // 未登陆
    else {
        // 未登陆不能去购物车页面
        if (to.path == '/shopcar') {
            // 添加重定向，query参数放的是你本来想去的页面路径，登陆成功后就跳转到这个页面
            next('/login?redirect=' + to.path);
        }
        else {
            next();
        }
    }
})
export default router;