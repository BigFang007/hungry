// 对axios进行二次封装
import axios from 'axios'
// 进度条样式
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'
// 利用axios对象的方法create创建axios实例
const requests = axios.create({
    baseURL: '/api',
    timeout: 500,
})
// 请求拦截器：在请求发出之前做一些事
requests.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    nprogress.start();
    let token = localStorage.getItem('token')
    // 发送请求前，如果有token，就会带上，这时候如果token失效了，后台能检测到，并返回身份认证失败的消息，出现这个消息就及时重新登录
    if (token) {
        // bearer后面有个空格，我在这里卡了24小时不止吧。。。。。。
        config.headers.Authorization = 'Bearer ' + token
        // console.log(config.headers);//object
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    nprogress.done();
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default requests;