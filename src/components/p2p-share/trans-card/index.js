import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import {
    BaseColor
} from '../../base/base-component';

import Icon from 'antd/lib/icon';
import Tag from 'antd/lib/tag';
import Progress from 'antd/lib/progress';
import prettyBytes from "pretty-bytes";
import ClipBoard from 'clipboard';
import message from 'antd/lib/message';
import Tooltip from 'antd/lib/tooltip'

const radius = '8px';

const TransCardBody = styled.div`
    background-color: white;
    border-radius: ${radius};
    display: flex;
    flex-direction: row;
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 7px 14px rgba(50, 50, 93, .1), 0 3px 6px rgba(0, 0, 0, .08);
    };
    margin: 8px 50px;
    justify-content: center;
    
`;

const MyTag = styled.span`
    color: white;
    text-align: center;
    font-size: 1.8em;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: ${radius};
    border-bottom-left-radius: ${radius};
    flex-grow: 0;
`;

const TransCardContent = styled.div`
    margin-left: 10px;
    padding: 8px;
    flex-grow: 1;
`;

const Title = styled.span`
    font-size: 1.2em;
    margin-right: 20px;
`;

const ItemTags = styled.div`
    margin-top: 10px;
`;

const RemoveIcon = styled(Icon)`
    position: absolute;
    right: 0px;
    top: 0px
    padding: 5px;
    &:hover {
        cursor: pointer;
    }
`;

const ProgressBody = styled.div`
    flex-grow: 0;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;    
`;

function getFormatSpeed(rawBytes) {
    return prettyBytes(rawBytes) + " / s";
}

class TransCard extends React.Component {

    static handleClip(e){
            message.info('成功复制到剪切板');
            e.clearSelection();
    }

    componentDidMount(){
        let torrent = this.props.torrent;
        this.clipBoardMagnet = new ClipBoard(`.clip-magnet${torrent.infoHash}`);
        this.clipBoardMagnet.on('success', TransCard.handleClip);
        this.clipBoardDownloadLink = new ClipBoard(`.clip-download-link${torrent.infoHash}`);
        this.clipBoardDownloadLink.on('success', TransCard.handleClip);
    }

    componentWillUnmount(){
        this.clipBoardMagnet.destroy();
        this.clipBoardDownloadLink.destroy();
    }

    render() {
        let torrent = this.props.torrent;
        let {uploadSpeed, downloadSpeed, numPeers, uploaded, downloaded, progress} = torrent;
        let {type, onRemove} = this.props;

        //取得文件列表中最大的文件作为主标题
        let title = "";
        let maxLength = 0;
        let totalLength = 0;
        torrent.files.forEach(file => {
            totalLength += file.length;
            if (file.length > maxLength) {
                maxLength = file.length;
                title = file.name;
            }
        });

        if (torrent.files.length > 0)
            title = torrent.files[0].name;
        let myTagBg;
        if (type === 'download') {
            myTagBg = {
                backgroundColor: BaseColor.tag_color_3,
            }
        } else {
            myTagBg = {
                backgroundColor: BaseColor.tag_color_2,
            }
        }

        return (
            <TransCardBody {...this.props}>
                <MyTag style={myTagBg}>
                    {
                        type === 'download' ?
                            <Icon type="cloud-download-o"/>
                            :
                            <Icon type="cloud-upload-o"/>
                    }
                </MyTag>
                <TransCardContent>
                    <Title>
                        {`${title} 等共${torrent.files.length}个文件,总大小为${prettyBytes(totalLength)}`}
                    </Title>
                    <p>
                        <a href="javascript:void(0);" className={`clip-magnet${torrent.infoHash}`} data-clipboard-text={torrent.magnetURI}>[复制磁力链接]</a>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <a href="javascript:void(0);" className={`clip-download-link${torrent.infoHash}`} data-clipboard-text={document.location.origin + document.location.pathname + '#' + torrent.infoHash}>[复制下载链接]</a>
                    </p>
                    <ItemTags>
                        <Tag color={BaseColor.tag_color_2}>上传速度：{getFormatSpeed(uploadSpeed)}</Tag>
                        <Tag color={BaseColor.tag_color_3}>下载速度：{getFormatSpeed(downloadSpeed)}</Tag>
                        <Tag color={BaseColor.tag_color_1}>总上传：{prettyBytes(uploaded)}</Tag>
                        <Tag color={BaseColor.tag_color_4}>总下载：{prettyBytes(downloaded)}</Tag>
                        <Tag color={BaseColor.tag_color_2}>连接节点数：{numPeers}</Tag>
                    </ItemTags>

                </TransCardContent>
                <ProgressBody>
                    {
                        type === 'download' ?
                            <Progress type="circle" percent={(+progress * 100).toFixed(1)} width={40}/>
                            :
                            ''
                    }
                </ProgressBody>
                <Tooltip placement="topLeft" title="移除将会终止传输" arrowPointAtCenter>
                    <RemoveIcon type={'close'} onClick={() => {
                        onRemove(this.props.torrent);
                    }}/>
                </Tooltip>
            </TransCardBody>
        )
    }
}

TransCard.propTypes = {
    torrent: PropTypes.shape({
            uploadSpeed: PropTypes.number,
            downloadSpeed: PropTypes.number,
            downloaded: PropTypes.number,
            uploaded: PropTypes.number,
            numPeers: PropTypes.number,
            files: PropTypes.array,
            progress: PropTypes.number,
        }
    ),
    type: PropTypes.oneOf(['download', 'upload']),
    onRemove: PropTypes.func,
};

TransCard.defaultProps = {
    type: 'download',
    torrent: {
        uploadSpeed: 0,
        downloadSpeed: 0,
        downloaded: 0,
        uploaded: 0,
        numPeers: 0,
        progress: 0,
        files: [{
            name: 'title',
            length: 5,
        }]
    },
    onRemove: () => {

    },

};

export default TransCard;