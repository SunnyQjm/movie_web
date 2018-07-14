import {
    connect
} from 'react-redux'

import {
    ShareWebsiteComponent
} from '../../components'

export default connect(
    (state) => {
        return {
            ...state.ShareWebsiteReducer
        }
    },
    (dispatch) => {
        return {

        }
    },
) (ShareWebsiteComponent)