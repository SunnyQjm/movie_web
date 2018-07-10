import React from 'react';

import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import styled from 'styled-components';
import ToolTip from 'antd/lib/tooltip';
import {
    T1
} from '../base/base-component';
import {
    MovieAPI,
    getMovieAxios
} from '../../config/API';
import {
    getMD5
} from '../../tool/md5';
import UploadCard from './upload-card';
import QueueAnim from 'rc-queue-anim';
import BackTop from 'antd/lib/back-top';


const Dragger = Upload.Dragger;

const UploadPage = styled.div`
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content:center;
    width: 100%;
    flex-direction: column;
`;

const UploadBody = styled.div`
    height: 300px;
    width: 500px;
`;

const props = {
    name: 'file',
    multiple: true,
    action: MovieAPI.UPLOAD_FILE.url,
    showUploadList: false,
};

const UploadListBody = styled(QueueAnim)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 80%;
`;

class UploadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
    }

    beforeUpload(file, fileList) {
        let {addFile} = this.props;
        file.percent = 0;
        addFile(file);
        return new Promise((resolve, reject) => {
            getMD5(file)
                .then(md5 => {
                    getMovieAxios(axios => {
                        axios.get(`${MovieAPI.JUDGE_MD5.api}?${MovieAPI.JUDGE_MD5.PARAM_MD5}=${md5}`)
                            .then(res => {
                                if (res.data.data.exist) {
                                    let {addFile} = this.props;
                                    file.response = res;
                                    file.percent = 100;
                                    addFile(file);
                                    reject();
                                } else {
                                    resolve();
                                }
                            })
                            .catch(err => {
                                reject(err);
                            })
                    });
                })
                .catch(err => {
                    reject(err)
                });
        });
    }

    onChange(info) {
        let {file} = info;
        let {addFile} = this.props;
        addFile(file);
    }

    onRemove(file){
        let {removeFile} = this.props;
        removeFile(file);
    }

    render() {
        props.onChange = this.onChange;
        props.beforeUpload = this.beforeUpload;
        let {
            fileList
        } = this.props;

        let uploadItems = fileList.map(file => {
            return <UploadCard key={file.uid} file={file} onRemove={this.onRemove}/>
        });
        return (
            <UploadPage>
                <BackTop/>
                <T1>SHARE FIRST</T1>
                <ToolTip placement={'left'} title={'上传成功之后便可以在站内资源检索到您分享的资源'}>
                    <ToolTip placement={'right'} title={'声明：分享的文件会被上传到资源社区，所有用户都能获取~'}>
                        <UploadBody>
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox"/>
                                </p>
                                <p className="ant-upload-text">点击此处或拖拽上传</p>
                            </Dragger>
                        </UploadBody>
                    </ToolTip>
                </ToolTip>
                <UploadListBody>
                    {uploadItems}
                </UploadListBody>
            </UploadPage>
        )
    }
}

export default UploadComponent;