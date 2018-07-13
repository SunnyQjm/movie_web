import {
    ACTION_LITTLE_TOOL_ADD_ITEMS
} from '../../ActionType';

const initState = {
    data: [],
};

initState.category = ['科技数码', '工具', '新闻', '影视视频', '直播', '电子书', '游戏', '漫画', '图片'];
initState.category.forEach(category => {
   initState[category] = [];
});

Array.prototype.insertOrUpdateList = function (datas, judgeKey) {
    let newArray = this.slice();
    datas.forEach(data => {
        let idx = -1;
        newArray.forEach((item, index) => {
            if (item[judgeKey] === data[judgeKey])
                idx = index;
        });
        if (idx === -1) {
            newArray.push(data);
        } else {
            newArray[idx] = data;
        }
    });
    return newArray;
};


/**
 <Link href="#test1" title="科技数码"/>
 <Link href="#test2" title="工具"/>
 <Link href="#test3" title="新闻"/>
 <Link href="#test4" title="影视视频"/>
 <Link href="#test4" title="直播"/>
 <Link href="#test4" title="电子书"/>
 <Link href="#test4" title="游戏"/>
 <Link href="#test4" title="漫画"/>
 <Link href="#test4" title="图片"/>

 * @param state
 * @param action
 * @constructor
 */


const LittleToolReducer = (state = initState, action) => {
    let newState = {};
    Object.assign(newState, state);
    switch (action.type){
        case ACTION_LITTLE_TOOL_ADD_ITEMS:
            if(!newState[action.category])
                newState[action.category] = [];
            newState[action.category] = newState[action.category].insertOrUpdateList(action.data, 'website');
            break;
    }
    return newState;
};

export default LittleToolReducer;