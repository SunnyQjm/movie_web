import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import {
    StaticFileConfig
} from '../../config/server-info-config';
import {
    getIconByMIME
} from '../../tool/icon-tool';
import TweenOne from 'rc-tween-one';
import {BaseColor} from "../base/base-component";


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

const CardDescription = styled.div`
    color: white;
    width: 100%;
    max-height: 100%;
    position: absolute;
    bottom: 0px;
    padding: 5px;
    word-break: break-all;
    background: ${BaseColor.gray}
    text-align: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
`;

class ResourceItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter() {
        this.setState({
            hover: true
        });
    }

    handleMouseLeave() {
        this.setState({
            hover: false
        });
    }
    render() {
        let {movieName, size, createAt, mime, downloadPath, percent, cover, isMobile, introduction, staticPath} = this.props.resource;
        let {onRemove, width} = this.props;
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
            <TransCardBody {...this.props} style={transCardBodyStyle} onMouseEnter={this.handleMouseEnter}
                           onMouseLeave={this.handleMouseLeave}>
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
                    {
                        this.state.hover ?
                            <TweenOne animation={{
                                height: '100%',
                                opacity: 0.8,
                            }} style={{
                                position: 'relative',
                                width: '100%',
                                height: 0,
                            }}>
                                <CardDescription>{introduction}</CardDescription>
                            </TweenOne>
                            :
                            ''
                    }
                </CardImage>

                <CardTitle>{movieName}</CardTitle>
            </TransCardBody>
        )
    }
}

ResourceItem.propTypes = {
    resource: PropTypes.shape({
        movieName: PropTypes.string,
            size: PropTypes.number,
        }
    ),
    width: PropTypes.number,
    onRemove: PropTypes.func,
    staticPath: PropTypes.string,
};

ResourceItem.defaultProps = {
    resource: PropTypes.shape({
            movieName: '',
            size: 0,
        }
    ),
    width: 200,
    onRemove: () => {

    },
    staticPath: StaticFileConfig.BASE_URL
};

export default ResourceItem;