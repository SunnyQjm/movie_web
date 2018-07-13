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

class LittleToolItem extends React.Component {

    render() {
        let {title, cover, description, website, } = this.props.resource;
        let {onRemove, width, staticPath} = this.props;
        let cardImageStyle = {
            width: width,
            height: width,
            borderStyle: 'none',
        };
        let transCardBodyStyle = {
            width: width,
        };
        let cardImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6x0qGQamxaiAtVE-O8L5LVkC5wrT8Fe9AmKiJfk8bOpCj5mxZ4Q';
        if (cover) {
            cardImage = cover.startsWith('http') ? cover : staticPath + cover;
            cardImageStyle.backgroundImage = `url(${cardImage})`;
        } else {
            cardImageStyle.backgroundColor = 'white';
        }
        //取得文件列表中最大的文件作为主标题
        return (
            <TransCardBody {...this.props} style={transCardBodyStyle}>
                <CardImage style={cardImageStyle}>
                </CardImage>

                <CardTitle>{title}</CardTitle>
            </TransCardBody>
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
    staticPath: StaticFileConfig.BASE_URL
};

export default LittleToolItem;