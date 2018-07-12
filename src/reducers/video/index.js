import {
    ACTION_VIDEO_LOADING_FINISH,
    ACTION_VIDEO_NO_MORE,
    ACTION_VIDEO_CHANGE_TAB,
    ACTION_VIDEO_BEGIN_LOADING,
    ACTION_VIDEO_ADD_ITEMS,
} from '../../ActionType';

const initState = {
    allItems: [],
    allHasMore: true,
    loading: false,
    activityTabKey: '所有视频',
};

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
            if (!action.toType)
                newState.allItems = newState.allItems.insertOrUpdateList(action.data, 'id');
            // else if (action.toType === MovieAPI.GET_MOVIES.TYPE_VIDEO)
            //     newState.videoItems = newState.videoItems.insertOrUpdateList(action.data, 'id');
            // else if (action.toType === MovieAPI.GET_MOVIES.TYPE_APPLICATION)
            //     newState.applicationItems = newState.applicationItems.insertOrUpdateList(action.data, 'id');
            // else if (action.toType === MovieAPI.GET_MOVIES.TYPE_AUDIO)
            //     newState.audioItems = newState.audioItems.insertOrUpdateList(action.data, 'id');
            // else if (action.toType === MovieAPI.GET_MOVIES.TYPE_IMAGE)
            //     newState.imageItems = newState.imageItems.insertOrUpdateList(action.data, 'id');
            break;
        case ACTION_VIDEO_NO_MORE:
            if (!action.toType)
                newState.allHasMore = false;
            // else if (action.toType === MovieAPI.GET_MOVIES.TYPE_VIDEO)
            //     newState.videoHasMore = false;
            // else if (action.toType === MovieAPI.GET_MOVIES.TYPE_APPLICATION)
            //     newState.applicationHasMore = false;
            // else if (action.toType === MovieAPI.GET_MOVIES.TYPE_AUDIO)
            //     newState.audioHasMore = false;
            // else if (action.toType === MovieAPI.GET_MOVIES.TYPE_IMAGE)
            //     newState.imageHasMore = false;
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