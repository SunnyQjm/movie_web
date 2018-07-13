import {
    connect
} from 'react-redux'

import {
    SearchResultComponent
} from '../../components'
import {
    ACTION_SEARCH_RESULT_ADD_ITEMS,
    ACTION_SEARCH_RESULT_BEGIN_LOADING,
    ACTION_SEARCH_RESULT_CHANGE_TAB,
    ACTION_SEARCH_RESULT_LOADING_FINISH,
    ACTION_SEARCH_RESULT_NO_MORE,
    ACTION_SEARCH_RESULT_UPDATE_KEYWORDS,
} from "../../ActionType";
import {getTorrentTransferAxois, TorrentTransferAPI} from "../../config/API";
import message from "antd/lib/message/index";

export default connect(
    (state) => {
        return {
            ...state.SearchResultReducer
        }
    },
    (dispatch) => {
        return {
            loadMore: (page, category, keywords) => {
                dispatch({
                    type: ACTION_SEARCH_RESULT_BEGIN_LOADING,
                    category: category,
                    keywords: keywords,
                });
                let URL = TorrentTransferAPI.BASE_URL;
                if(category === TorrentTransferAPI.QUERY_WEBSITE.CATEGORY){
                    URL += `${TorrentTransferAPI.QUERY_WEBSITE.api}?${TorrentTransferAPI.QUERY_WEBSITE.PARAM_KEY_WORDS}=${keywords}`;
                    // URL += `&${TorrentTransferAPI.QUERY_WEBSITE.PARAM_SIZE}=10`;
                    // URL += `&${TorrentTransferAPI.QUERY_WEBSITE.PARAM_PAGE}=${page}`
                } else if(category === TorrentTransferAPI.QUERY_RESOURCE.CATEGORY){
                    URL += `${TorrentTransferAPI.QUERY_RESOURCE.api}?${TorrentTransferAPI.QUERY_RESOURCE.PARAM_KEY_WORDS}=${keywords}`;
                    // URL += `&${TorrentTransferAPI.QUERY_RESOURCE.PARAM_SIZE}=10`;
                    // URL += `&${TorrentTransferAPI.QUERY_RESOURCE.PARAM_PAGE}=${page}`
                } else {
                    return;
                }
                getTorrentTransferAxois(axois => {
                    axois.get(URL)
                        .then(res => {
                            dispatch({
                                type: ACTION_SEARCH_RESULT_LOADING_FINISH,
                                category: category
                            });
                            let items = res.data.data;
                            if (!items || items.length === 0) {       //没有获取到数据说明说有数据都获取完毕了
                                dispatch({
                                    type: ACTION_SEARCH_RESULT_NO_MORE,
                                    category: category
                                });
                            } else {
                                dispatch({
                                    type: ACTION_SEARCH_RESULT_ADD_ITEMS,
                                    data: items,
                                    category: category
                                })
                            }
                        })
                        .catch(err => {
                            dispatch({
                                type: ACTION_SEARCH_RESULT_NO_MORE,
                                category: category
                            });
                            dispatch({
                                type: ACTION_SEARCH_RESULT_LOADING_FINISH,
                                category: category
                            });
                            console.log(err);
                            message.info('获取错误')
                        });
                });
            },
            changeTab: (key) => {
                dispatch({
                    type: ACTION_SEARCH_RESULT_CHANGE_TAB,
                    data: key,
                })
            },
            updateKeywords: (keyWords) => {
                dispatch({
                    type: ACTION_SEARCH_RESULT_UPDATE_KEYWORDS,
                    data: keyWords,
                })
            }
        }
    },
) (SearchResultComponent)