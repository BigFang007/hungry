// 一开头莫名其妙来个import { turn } from "core-js/core/array";给我报错，整懵了，咋回事
import { addShopping, getShopcarInfo, changeShopping, deleteShopping } from '@/api';
import store from '..';
export default ({
    namespaced: true,
    state: {
        shopcarInfo: [],
        // isAllChecked: false,
    },
    actions: {
        // 获取购物车信息
        async getShopcarInfo(context) {
            let result = await getShopcarInfo();
            // 获取成功
            if (result.data.code == 200) {
                // console.log(result.data.data);//array
                context.commit('GETSHOPCARINFO', result.data.data)
            }
            // 失败
            else {
                alert(result.data.message)
            }
        },
        // 添加商品到购物车
        async addInfo(context, shopping) {
            let result = await addShopping(shopping)
            // 加入购物车成功
            if (result.data.code == 200) {
                // context.commit('DISPLAYLIST', result.data.data)
                // 有点被搞晕了，如果到时候加入购物车错误没有被识别出来，弹框就放到这里。我现在用await，把弹框放detail页面了
                alert(`成功加入${shopping.n}件商品`);
            }
            // 失败
            else {
                alert('加入购物车失败')
                // console.log('失败');
            }
        },
        // 修改商品数量
        async changeShopping(context, index) {
            let result = await changeShopping(context.state.shopcarInfo[index])
            // console.log(context.state.shopcarInfo[index]);//每次使用数据，不是忘记this，就是忘记其他前缀
            // 加入购物车成功
            if (result.data.code !== 200) {
                alert(`修改商品数量失败`);
            }
        },
        // 删除某个商品
        async deleteShopping(context, index) {
            let result = await deleteShopping(context.state.shopcarInfo[index])
            // 加入购物车成功
            if (result.data.code == 200) {
                // context.commit('DISPLAYLIST', result.data.data)
                // 有点被搞晕了，如果到时候加入购物车错误没有被识别出来，弹框就放到这里。我现在用await，把弹框放detail页面了
                alert(`删除成功`);
            }
            // 失败
            else {
                alert('删除失败')
                // console.log('失败');
            }
        },
    },
    mutations: {
        // 获取购物车商品
        GETSHOPCARINFO(state, value) {
            for (let k of value) {
                k.isChecked = false
            }
            state.shopcarInfo = value
        },
        // 全选/全不选
        UPDATEALLCHECKED(state, isAllChecked) {
            for (let k of state.shopcarInfo) {
                k.isChecked = isAllChecked;
            }
        }
    },
    getters: {}
})