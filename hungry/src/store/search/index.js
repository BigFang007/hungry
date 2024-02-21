// 导入接口
import { reqDisplayList } from "@/api";
// 对外暴露store类实例
export default ({
    namespaced: true,
    state: {
        // categoryList应初始化为数组
        displayList: [],
        showError: false,
    },
    actions: {
        // 通过调用API里面的接口函数，向服务器发送请求，获取数据
        // 千万要加data呀不然给你一个对象
        async displayList(context, params) {
            let result = await reqDisplayList(params);
            if (result.data.code == 200) {
                context.commit('DISPLAYLIST', result.data.data)
            }
            else if (result.data.code == 201) {
                context.commit('DISPLAYLIST2')
            }
        },
    },
    mutations: {
        // 有数据就展示数据
        DISPLAYLIST(state, value) {
            state.displayList = value;
            state.showError = false;
        },
        // 没有数据就展示错误
        DISPLAYLIST2(state) {
            state.showError = true;
        }
    },
})