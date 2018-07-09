import {
    ACTION_HOME_ADD_ITEMS,
    ACTION_HOME_LOADING_FINISH,
    ACTION_HOME_NO_MORE,
    ACTION_HOME_BEGIN_LOADING,
} from '../../ActionType';

const initState = {
    items: [],
    loading: false,
    hasMore: true,
};

const HomeReducer = (state = initState, action) => {
    let newState = state;
    switch (action.type){
        case ACTION_HOME_ADD_ITEMS:
            newState.items = newState.items.concat(action.data);
            break;
        case ACTION_HOME_NO_MORE:
            newState.hasMore = false;
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