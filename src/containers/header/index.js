import {
    connect
} from 'react-redux'

import {
    HeaderComponent
} from '../../components'

export default connect(
    (state) => {
        return {
            ...state.HeaderReducer
        }
    },
    (dispatch) => {
        return {

        }
    },
) (HeaderComponent)