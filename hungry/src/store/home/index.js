// 导入接口
import { reqCategoryList, reqCarouselList, reqSeasonList } from "@/api";
// 对外暴露store类实例
export default ({
    namespaced: true,
    state: {
        // categoryList应初始化为数组
        categoryList: [],
        carouselList: [],
        seasonList: [],
    },
    actions: {
        // 通过调用API里面的接口函数，向服务器发送请求，获取数据
        // 千万要加data呀不然给你一个对象
        async categoryList(context) {
            let result = await reqCategoryList();
            if (result.data.code == 200) {
                context.commit('CATEGORYLIST', result.data.data)
            }
        },
        async carouselList(context) {
            let result = await reqCarouselList();
            if (result.data.code == 200) {
                context.commit('CAROUSELLIST', result.data.data)
            }
        },
        async seasonList(context) {
            let result = await reqSeasonList();
            if (result.data.code == 200) {
                context.commit('SEASONLIST', result.data.data)

            }
        }
    },
    mutations: {
        CATEGORYLIST(state, value) {
            // 
            state.categoryList = value.slice(0, 13);
            // console.log(value)
        },
        CAROUSELLIST(state, value) {
            state.carouselList = value;
        },
        SEASONLIST(state, value) {
            state.seasonList = value;
        }
    },
})