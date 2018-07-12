import {
    ACTION_VIDEO_LOADING_FINISH,
    ACTION_VIDEO_NO_MORE,
    ACTION_VIDEO_CHANGE_TAB,
    ACTION_VIDEO_BEGIN_LOADING,
    ACTION_VIDEO_ADD_ITEMS,
} from '../../ActionType';
import {
    MovieAPI
} from '../../config/API';

const initState = {
    allItems: [],
    allHasMore: true,

    /**
     * 分类
     */
    actItems: [],
    actHashMore: true,
    loveItems: [],
    loveHasMore: true,
    thrillerItems: [],
    thrillerHasMore: true,
    adventureItems: [],
    adventureHasMore: true,
    scienceFictionItems: [],
    scienceFictionHasMore: true,

    loading: false,
    activityTabKey: '所有视频',
};


const myDate = new Date();
const currentYear = myDate.getUTCFullYear();
initState[`year${currentYear}_items`] = [];
initState[`year${currentYear}_hasMore`] = true;

initState[`year${currentYear - 1}_items`] = [];
initState[`year${currentYear - 1}_hasMore`] = true;

initState[`year${currentYear - 2}_items`] = [];
initState[`year${currentYear - 2}_hasMore`] = true;

initState.years = [currentYear, currentYear - 1, currentYear - 2];


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

const VideoReducer = (state = initState, action) => {
    let newState = state;
    switch (action.type) {
        case ACTION_VIDEO_ADD_ITEMS:
            if (!action.category)
                newState.allItems = newState.allItems.insertOrUpdateList(action.data, 'id');
            else if (action.category === MovieAPI.GET_MOVIES.CATEGORY_ACT)
                newState.actItems = newState.actItems.insertOrUpdateList(action.data, 'id');
            else if (action.category === MovieAPI.GET_MOVIES.CATEGORY_LOVE)
                newState.loveItems = newState.loveItems.insertOrUpdateList(action.data, 'id');
            else if (action.category === MovieAPI.GET_MOVIES.CATEGORY_THRILLER)
                newState.thrillerItems = newState.thrillerItems.insertOrUpdateList(action.data, 'id');
            else if (action.category === MovieAPI.GET_MOVIES.CATEGORY_ADVENTURE)
                newState.adventureItems = newState.adventureItems.insertOrUpdateList(action.data, 'id');
            else if(action.category === MovieAPI.GET_MOVIES.CATEGORY_SCIENCE_FICTION)
                newState.scienceFictionItems = newState.scienceFictionItems.insertOrUpdateList(action.data, 'id');
            else if(action.category === MovieAPI.GET_MOVIES.CATEGORY_YEAR)
                newState[`year${action.year}_items`] = newState[`year${action.year}_items`].insertOrUpdateList(action.data, 'id');
            break;
        case ACTION_VIDEO_NO_MORE:
            if (!action.category)
                newState.allHasMore = false;
            else if (action.category === MovieAPI.GET_MOVIES.CATEGORY_ACT)
                newState.actHashMore = false;
            else if (action.category === MovieAPI.GET_MOVIES.CATEGORY_LOVE)
                newState.loveHasMore = false;
            else if (action.category === MovieAPI.GET_MOVIES.CATEGORY_THRILLER)
                newState.thrillerHasMore = false;
            else if (action.category === MovieAPI.GET_MOVIES.CATEGORY_ADVENTURE)
                newState.adventureHasMore = false;
            else if (action.category === MovieAPI.GET_MOVIES.CATEGORY_SCIENCE_FICTION)
                newState.scienceFictionHasMore = false;
            else if (action.category === MovieAPI.GET_MOVIES.CATEGORY_YEAR)
                newState[`year${action.year}_hasMore`] = false;
            break;
        case ACTION_VIDEO_BEGIN_LOADING:
            newState.loading = true;
            break;
        case ACTION_VIDEO_LOADING_FINISH:
            newState.loading = false;
            break;
        case ACTION_VIDEO_CHANGE_TAB:
            newState.activityTabKey = action.data;
            break;

    }
    return newState;
};

export default VideoReducer