import React from 'react';

import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import styled from 'styled-components';

const Dragger = Upload.Dragger;

const UploadPage = styled.div`
    display: flex;
    align-items: center;
    justify-content:center;
    width: 100%;
`;

const UploadBody = styled.div`
    height: 300px;
    width: 500px;
`;

const props = {
    name: 'file',
    multiple: true,
    action: 'http://localhost:4897/upload',
    onPreview: file => {
        console.log(file);
    }
};

class UploadComponent extends React.Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            fileList: [],
        }
    }

    onChange(info){
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

        this.setState({ fileList });
    }
    render(){
        props.onChange = this.onChange;
        props.fileList = this.state.fileList;
        return (
            <UploadPage>
                <UploadBody>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击此处或拖拽上传</p>
                    </Dragger>
                </UploadBody>
            </UploadPage>
        )
    }
}

export default UploadComponent;