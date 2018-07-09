import React from 'react';

import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import styled from 'styled-components';
import ToolTip from 'antd/lib/tooltip';
import {
    T1
} from '../base/base-component';
import {
    MovieAPI
} from '../../config/API';

const Dragger = Upload.Dragger;

const UploadPage = styled.div`
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content:center;
    width: 100%;
    flex-direction: column;
    font-family: 'Chela One', cursive;
`;

const UploadBody = styled.div`
    height: 300px;
    width: 500px;
`;

const props = {
    name: 'file',
    multiple: true,
    action: MovieAPI.UPLOAD_FILE.url,
    onPreview: file => {
        console.log(file);
    }
};

class UploadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            fileList: [],
        }
    }

    onChange(info) {
        let fileList = info.fileList;

        // // 1. Limit the number of uploaded files
        // //    Only to show two recent uploaded files, and old ones will be replaced by the new
        // fileList = fileList.slice(-2);

        // 2. read from response and show file link
        fileList = fileList.map((file) => {
            file.url = '#';     //让文件可点击
            return file;
        });

        // // 3. filter successfully uploaded files according to response from server
        // fileList = fileList.filter((file) => {
        //     if (file.response) {
        //         return file.response.status === 'success';
        //     }
        //     return true;
        // });

        this.setState({fileList});
    }

    render() {
        props.onChange = this.onChange;
        props.fileList = this.state.fileList;
        return (
            <UploadPage>
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
            </UploadPage>
        )
    }
}

export default UploadComponent;