import {
    connect
} from 'react-redux'

import {
    HomeComponent
} from '../../components'

import {
    ACTION_HOME_ADD_ITEMS,
    ACTION_HOME_LOADING_FINISH,
    ACTION_HOME_NO_MORE,
    ACTION_HOME_BEGIN_LOADING,
} from '../../ActionType';
import message from 'antd/lib/message';
import {
    MovieAPI,
    getMovieAxios,
} from '../../config/API';

export default connect(
    (state) => {
        return {
            ...state.HomeReducer
        }
    },
    (dispatch) => {
        return {
            loadMore: (page) => {
                dispatch({
                    type: ACTION_HOME_BEGIN_LOADING
                });
                const GET_MOVIES = MovieAPI.GET_MOVIES;
                getMovieAxios(axois => {
                    axois.get(`${GET_MOVIES.api}?${GET_MOVIES.PARAM_PAGE}=${page}&${GET_MOVIES.PARAM_SIZE}=10`)
                        .then(res => {
                            dispatch({
                                type: ACTION_HOME_LOADING_FINISH
                            });
                            let items = res.data.data;
                            if(!items || items.length === 0){       //没有获取到数据说明说有数据都获取完毕了
                                dispatch({
                                    type: ACTION_HOME_NO_MORE,

                                });
                            } else {
                                dispatch({
                                    type: ACTION_HOME_ADD_ITEMS,
                                    data: items,
                                })
                            }
                        })
                        .catch(err => {
                            dispatch({
                                type: ACTION_HOME_NO_MORE,
                            });
                            dispatch({
                                type: ACTION_HOME_LOADING_FINISH
                            });
                            console.log(err);
                            message.info('获取错误')
                        });
                });

            }
        }
    },
) (HomeComponent)