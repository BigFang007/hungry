import { reqCaptcha, register, login, getUserInfo } from "@/api";
export default ({
    namespaced: true,
    state: {
        userInfo: {}
    },
    actions: {
        // 获取验证码
        async getCaptcha(context, user) {
            let result = await reqCaptcha(user);
            // console.log('传过去的参数user' + user);
            if (result.data.code == 202) {
                alert(result.data.message)
            }
            else if (result.data.code == 201) {
                alert('该号码有误')
            }
            else if (result.data.code == 200) {
                alert('验证码: ' + result.data.data)
                // console.log(typeof result.data.data);//string
            }
        },
        // 注册用户，
        async register(context, user) {
            let result = await register(user);
            if (result.data.code == 202) {
                alert(result.data.message)
            }
            else if (result.data.code == 201) {
                alert('未知错误')
            }
            else if (result.data.code == 200) {
                alert('注册成功！请登录')
            }
        },
        // 登陆成功就在local中保存token
        async login(context, user) {
            let result = await login(user);
            if (result.data.code == 202 || result.data.code == 203) {
                alert(result.data.message)
            }
            else if (result.data.code == 201) {
                alert('未知错误')
            }
            else if (result.data.code == 200) {
                localStorage.setItem('token', result.data.token)
                // alert('登陆成功')
                // window.Vue.$router.push({ path: '/home' })
            }
        },
        // 获取用户基本信息，不包括密码哈
        async getUserInfo(context) {
            let result = await getUserInfo();
            if (result.data.code == 202 || result.data.code == 201) {
                alert(result.data.message)
            }
            // 获取了信息，存到哪里呢？？？
            else if (result.data.code == 200) {
                context.commit('GETUSERINFO', result.data.data)
            }
        }
    },
    mutations: {
        GETUSERINFO(store, value) {
            store.userInfo = value
        },
        LOGOUT(store) {
            store.userInfo = '';
            localStorage.removeItem('token');
        }
    },
    getters: {}
})