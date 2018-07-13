import React from 'react';
import PropTypes from 'prop-types'
import {
    ShareWebsiteServerConfig
} from '../../config/server-info-config';
import {
    BaseResourceItem
} from '../base';

class LittleToolItem extends React.Component {
    render() {
        let {title, cover, description, website,} = this.props.resource;
        if(cover)
            cover = cover.startsWith('http') ? cover : ShareWebsiteServerConfig.BASE_URL + '/' + cover;
        //取得文件列表中最大的文件作为主标题
        return (
            <BaseResourceItem {...this.props} resource={{
                title: title,
                cover: cover,
                introduction: description,
                mime: '',
            }}/>
        )
    }
}

LittleToolItem.propTypes = {
    resource: PropTypes.shape({
            title: PropTypes.string,
            website: PropTypes.string,
            description: PropTypes.string,
            cover: PropTypes.string,
            category: PropTypes.string,
        }
    ),
    width: PropTypes.number,
    onRemove: PropTypes.func,
    staticPath: PropTypes.string,
};

LittleToolItem.defaultProps = {
    resource: PropTypes.shape({
            title: '',
            website: '#',
            description: '',
            category: '',
            cover: '',
        }
    ),
    width: 200,
};

export default LittleToolItem;