import {
    connect
} from 'react-redux'

import {
    DetailComponent
} from '../../components'

import {
    ACTION_DETAIL_UPDATE_RESOURCE_INFO
} from '../../ActionType';

import {
    MovieAPI,
    getMovieAxios,
} from '../../config/API';

import message from 'antd/lib/message';

export default connect(
    (state) => {
        return {
            ...state.DetailReducer
        }
    },
    (dispatch) => {
        return {
            updateResourceInfo: (resource) => {
                dispatch({
                    type: ACTION_DETAIL_UPDATE_RESOURCE_INFO,
                    data: resource,
                })
            },
            getResourceById: (id) => {
                getMovieAxios(axios => {
                   axios.get(`${MovieAPI.GET_MOVIE_BY_ID.api}?${MovieAPI.GET_MOVIE_BY_ID.PARAM_ID}=${id}`)
                       .then(res => {
                            if(res.data.code === 0){
                                dispatch({
                                    type: ACTION_DETAIL_UPDATE_RESOURCE_INFO,
                                    data: res.data.data,
                                });
                            } else {
                                console.log(res.data);
                                message.error(res.data.msg);
                            }
                       })
                       .catch(err => {
                           console.log(err);
                           message.error(err.message);
                       })
                });
            },
        }
    },
) (DetailComponent)