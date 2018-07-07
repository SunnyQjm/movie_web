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
import axios from 'axios';
axios.defaults.baseURL = 'http://39.106.138.103:4897';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



export default connect(
    (state) => {
        return {
            ...state.P2pShareReducer
        }
    },
    (dispatch) => {
        return {
            addTorrent: torrent => {
                axios.post('/pushId', {
                    torrentId: torrent.magnetURI
                })
                    .then(res => {
                        if(res.data.code === 0)
                            torrent.code = res.data.data;
                        dispatch({
                            type: ACTION_P2P_SHARE_ADD_TORRENT,
                            data: torrent,
                        })
                    })
                    .catch(err => {
                        dispatch({
                            type: ACTION_P2P_SHARE_ADD_TORRENT,
                            data: torrent,
                        });
                        console.log(err);
                    });

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