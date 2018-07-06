import {
    ACTION_P2P_SHARE_ADD_TORRENT,
    ACTION_P2P_SHARE_UPDATE_CLIENT_INFO,
    ACTION_P2P_SHARE_REMOVE_TORRENT,
    ACTION_P2P_SHARE_CHANGE_STATE,
} from '../../ActionType';

import {
    connect
} from 'react-redux'

import {
    P2pShareComponent
} from '../../components'

export default connect(
    (state) => {
        return {
            ...state.P2pShareReducer
        }
    },
    (dispatch) => {
        return {
            addTorrent: torrent => {
                dispatch({
                    type: ACTION_P2P_SHARE_ADD_TORRENT,
                    data: torrent,
                })
            },
            updateClientInfo: client => {
                dispatch({
                    type: ACTION_P2P_SHARE_UPDATE_CLIENT_INFO,
                    data: client,
                })
            },
            removeTorrent: torrent => {
                dispatch({
                    type: ACTION_P2P_SHARE_REMOVE_TORRENT,
                    data: torrent,
                })
            },
            changeState: state => {
                dispatch({
                    type: ACTION_P2P_SHARE_CHANGE_STATE,
                    data: state,
                })
            }
        }
    },
) (P2pShareComponent)