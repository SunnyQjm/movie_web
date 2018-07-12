import HeaderReducer from './header'
import FooterReducer from './footer'
import HomeReducer from './home'
import P2pShareReducer from './p2p-share';
import UploadReducer from './upload';
import DetailReducer from './detail';
import VideoReducer from './video';
import LittleToolReducer from './little-tool';

import {
    combineReducers
} from 'redux'

export default combineReducers({
    HeaderReducer,
    FooterReducer,
    HomeReducer,
    P2pShareReducer,
    UploadReducer,
    DetailReducer,
    VideoReducer,
    LittleToolReducer,
})