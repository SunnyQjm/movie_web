import {
    connect
} from 'react-redux'

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

        }
    },
) (LittleToolComponent)