import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import {
    StaticFileConfig
} from '../../../config/server-info-config';

const radius = '8px';

const TransCardBody = styled.div`
    border-radius: ${radius};
    display: flex;
    flex-direction: column;
    transition: transform 0.3s;
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 7px 14px rgba(50, 50, 93, .1), 0 3px 6px rgba(0, 0, 0, .08);
    };
    cursor: pointer;
    margin: 5px;
    width: 100%;
    max-width: 800px;
`;

const CardImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${radius};
    background-size: cover;
`;

const CardTitle = styled.span`
    margin: 5px;
    text-align: center;
`;

function getIconByMIME(mime) {
    if (mime.startsWith('audio/'))
        return require('../../../img/music.png');
    else if (mime.startsWith('application/vnd.ms-excel')
        || mime.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.'))
        return require('../../../img/excel.png');
    else if (mime.startsWith('application/msword') ||
        mime.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml') ||
        mime.startsWith('application/vnd.ms-word'))
        return require('../../../img/word.png');
    else if(mime.startsWith('application/vnd.ms-powerpoint') ||
        mime.startsWith('application/vnd.openxmlformats-officedocument.presentationml'))
        return require('../../../img/ppt.png');
    else if(mime.startsWith('application/pdf'))
        return require('../../../img/pdf.png');
    else if(mime.startsWith('image'))
        return require('../../../img/picture.png');
    else
        return require('../../../img/file.png');
}

class ResourceItem extends React.Component {

    render() {
        let {movieName, size, createAt, mime, downloadPath, percent, cover} = this.props.file;
        let {onRemove, width} = this.props;
        let cardImageStyle = {
            width: width,
            height: width,
            borderStyle: 'none',
        };
        // backgroundImage: `url(${cardImage})`,

        let cardImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6x0qGQamxaiAtVE-O8L5LVkC5wrT8Fe9AmKiJfk8bOpCj5mxZ4Q';
        if (cover) {
            cardImage = cover.startsWith('http') ? cover : StaticFileConfig.BASE_URL + cover;
            cardImageStyle.backgroundImage = `url(${cardImage})`;
        } else {
            cardImageStyle.backgroundColor = 'white';
        }
        //取得文件列表中最大的文件作为主标题
        return (
            <TransCardBody {...this.props} style={{
                width: width,
            }}>
                <CardImage style={cardImageStyle}>
                    {
                        !!cover ?
                            ''
                            :
                            <img src={getIconByMIME(mime)} alt="" style={{
                                width: width / 2,
                                height: width / 2,
                            }}/>
                    }
                </CardImage>

                <CardTitle>{movieName}</CardTitle>
            </TransCardBody>
        )
    }
}

ResourceItem.propTypes = {
    file: PropTypes.shape({
            name: PropTypes.string,
            size: PropTypes.number,
            uid: PropTypes.string,
            type: PropTypes.string,
            percent: PropTypes.number,
            response: PropTypes.object,
        }
    ),
    width: PropTypes.number,
    onRemove: PropTypes.func,
};

ResourceItem.defaultProps = {
    file: PropTypes.shape({
            name: '',
            size: 0,
            uid: '',
            type: '',
            percent: 0.1,
            response: {},
        }
    ),
    width: 200,
    onRemove: () => {

    },

};

export default ResourceItem;