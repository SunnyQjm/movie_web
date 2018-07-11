import {
    ACTION_HOME_ADD_ITEMS,
    ACTION_HOME_LOADING_FINISH,
    ACTION_HOME_NO_MORE,
    ACTION_HOME_BEGIN_LOADING,
} from '../../ActionType';

import {
    MovieAPI
} from '../../config/API'
const initState = {
    allItems: [],
    allHasMore: true,
    videoItems: [],
    videoHasMore: true,
    applicationItems: [],
    applicationHasMore: true,
    audioItems: [],
    audioHasMore: true,
    imageItems: [],
    imageHasMore: true,
    loading: false,
};

const HomeReducer = (state = initState, action) => {
    let newState = state;
    switch (action.type){
        case ACTION_HOME_ADD_ITEMS:
            if(!action.toType)
                newState.allItems = newState.allItems.concat(action.data);
            else if(action.toType === MovieAPI.GET_MOVIES.TYPE_VIDEO)
                newState.videoItems = newState.videoItems.concat(action.data);
            else if(action.toType === MovieAPI.GET_MOVIES.TYPE_APPLICATION)
                newState.applicationItems = newState.applicationItems.concat(action.data);
            else if(action.toType === MovieAPI.GET_MOVIES.TYPE_AUDIO)
                newState.audioItems = newState.audioItems.concat(action.data);
            else if(action.toType === MovieAPI.GET_MOVIES.TYPE_IMAGE)
                newState.imageItems = newState.imageItems.concat(action.data);
            break;
        case ACTION_HOME_NO_MORE:
            if(!action.toType)
                newState.allHasMore = false;
            else if(action.toType === MovieAPI.GET_MOVIES.TYPE_VIDEO)
                newState.videoHasMore = false;
            else if(action.toType === MovieAPI.GET_MOVIES.TYPE_APPLICATION)
                newState.applicationHasMore = false;
            else if(action.toType === MovieAPI.GET_MOVIES.TYPE_AUDIO)
                newState.audioHasMore = false;
            else if(action.toType === MovieAPI.GET_MOVIES.TYPE_IMAGE)
                newState.imageHasMore = false;
            break;
        case ACTION_HOME_BEGIN_LOADING:
            newState.loading = true;
            break;
        case ACTION_HOME_LOADING_FINISH:
            newState.loading = false;
            break;
    }
    return newState;
};

export default HomeReducer