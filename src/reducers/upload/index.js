import {
    ACTION_UPLOAD_ADD_FILE
} from '../../ActionType';

const initState = {
    fileList: [],
};

const UploadReducer = (state = initState, action) => {
    let newState = state;
    switch (action.type){
        case ACTION_UPLOAD_ADD_FILE:
            newState.fileList = newState.fileList.concat(action.data);
            break;
    }
    return newState;
};

export default UploadReducer