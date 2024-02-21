import Mock from 'mockjs';
// webpack默认对外暴露：图片、json数据格式
import carousel from './carousel'
import season from './season'
import display from './display'
import display2 from './display2'

// Mock.mock(url,retype,template,function(options))
Mock.mock('/mock/carousel', { code: 200, data: carousel });
Mock.mock('/mock/season', { code: 200, data: season });
// post请求，且传递参数searchParams，在options.body对象里
Mock.mock('/mock/display', 'post', function (options) {
    // options是个对象，里面的属性body是个JSON式string！！我真是个天才
    const optionsObj = JSON.parse(options.body)
    if (optionsObj.category2Id == 1 || optionsObj.category1Id == 1) {
        if (optionsObj.keyword == '礼包')
            return {
                code: 200, data: display2
            }
        else if (!optionsObj.keyword)
            return {
                code: 200, data: display
            }
        else return { code: 201 };
    }
    else if (optionsObj.keyword == '礼包') {
        return {
            code: 200, data: display2
        }
    }
    else
        return { code: 201 };
});