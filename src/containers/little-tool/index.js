import {
    connect
} from 'react-redux'
import {
    ACTION_LITTLE_TOOL_ADD_ITEMS
} from '../../ActionType';
import {
    getTorrentTransferAxois,
    TorrentTransferAPI,
} from '../../config/API';

import {
    LittleToolComponent
} from '../../components'

export default connect(
    (state) => {
        return {
            ...state.LittleToolReducer
        }
    },
    (dispatch) => {
        return {
            initAllWebsites: (category) => {
                category.forEach(category => {
                    getTorrentTransferAxois(axios => {
                       axios.get(`${TorrentTransferAPI.GET_WEBSITE.api}?${TorrentTransferAPI.GET_WEBSITE.PARAM_CATEGORY}=${category}`)
                           .then(res => {
                               if(res.data.code === 0)
                                   dispatch({
                                       type: ACTION_LITTLE_TOOL_ADD_ITEMS,
                                       data: res.data.data,
                                       category: category,
                                   });
                               else
                                   console.log(res.data);
                           })
                           .catch(e => {
                               console.log(e);
                           })
                    });
                });
            },

        }
    },
) (LittleToolComponent)