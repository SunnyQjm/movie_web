import {
    connect
} from 'react-redux'

import {
    VideoComponent
} from '../../components'
import {
    ACTION_VIDEO_LOADING_FINISH,
    ACTION_VIDEO_NO_MORE,
    ACTION_VIDEO_CHANGE_TAB,
    ACTION_VIDEO_BEGIN_LOADING,
    ACTION_VIDEO_ADD_ITEMS,
} from '../../ActionType';
import {
    MovieAPI,
    getMovieAxios,
} from '../../config/API';
import message from "antd/lib/message/index";

export default connect(
    (state) => {
        return {
            ...state.VideoReducer
        }
    },
    (dispatch) => {
        return {
            loadMore: (page, isDownload = false, sortByTime = true, type) => {
                dispatch({
                    type: ACTION_VIDEO_BEGIN_LOADING,
                    toType: type
                });
                const GET_MOVIES = MovieAPI.GET_MOVIES;
                let URL = `${GET_MOVIES.api}?${GET_MOVIES.PARAM_PAGE}=${page}&${GET_MOVIES.PARAM_SIZE}=10`;
                // if(isDownload)
                //     URL += `&${GET_MOVIES.PARAM_IS_DOWNLOAD}=1`;
                if(sortByTime)
                    URL = URL + `&${GET_MOVIES.PARAM_ORDER_PROP}=createdAt&${GET_MOVIES.PARAM_ORDER}=DESC`;
                URL = URL + `&${GET_MOVIES.PARAM_TYPE}=${MovieAPI.GET_MOVIES.TYPE_VIDEO}`;
                getMovieAxios(axois => {
                    axois.get(URL)
                        .then(res => {
                            dispatch({
                                type: ACTION_VIDEO_LOADING_FINISH,
                                toType: type
                            });
                            let items = res.data.data;
                            if (!items || items.length === 0) {       //没有获取到数据说明说有数据都获取完毕了
                                dispatch({
                                    type: ACTION_VIDEO_NO_MORE,
                                    toType: type
                                });
                            } else {
                                dispatch({
                                    type: ACTION_VIDEO_ADD_ITEMS,
                                    data: items,
                                    toType: type
                                })
                            }
                        })
                        .catch(err => {
                            dispatch({
                                type: ACTION_VIDEO_NO_MORE,
                                toType: type
                            });
                            dispatch({
                                type: ACTION_VIDEO_LOADING_FINISH,
                                toType: type
                            });
                            console.log(err);
                            message.info('获取错误')
                        });
                });
            },
            changeTab: (key) => {
                dispatch({
                    type: ACTION_VIDEO_CHANGE_TAB,
                    data: key,
                })
            }
        }
    },
) (VideoComponent)