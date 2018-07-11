import React, {Component} from 'react';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import {enquireScreen} from 'enquire-js';       //用于做手机屏幕适配
import './config/axios-config';         //导入axios配置

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import {
    Provider
} from 'react-redux';
import {
    HeaderContainer,
    FooterContainer,
    HomeContainer,
    P2pShareContainer,
    UploadContainer,
    DetailContainer,
} from './containers'
import store from './store';
import styled from 'styled-components';
import LocalRouter from './LocalRouter'

import Layout from 'antd/lib/layout'


const {Content} = Layout;
const AppBody = styled(Layout)`
`;

const MyContent = styled(Content)`
`;

let isMobile = false;
enquireScreen((b) => {
    isMobile = !!b;
});

function withPropsComponent(Component, setProps) {
    return props => {
        return <Component {...props} {...setProps}/>
    }
}
class App extends Component {


    componentDidMount() {
        // 适配手机屏幕;
        enquireScreen((b) => {
            console.log('do it: ' + b);
            this.setState({isMobile: !!b});
        });
    }

    render() {
        return (
            <Provider store={store}>
                <Router
                    basename={process.env.PUBLIC_URL}
                >
                    <AppBody style={{
                        minHeight: '100%',
                    }}>
                        <HeaderContainer/>
                        <MyContent>
                            <Route key={'a'} exact path={LocalRouter.HOME} render={withPropsComponent(HomeContainer, {
                                isMobile: isMobile
                            })}/>
                            <Route key={'b'} path={LocalRouter.UPLOAD} component={withPropsComponent(UploadContainer, {
                                isMobile: isMobile
                            })}/>
                            <Route key={'c'} path={LocalRouter.P2P_SHARE} component={withPropsComponent(P2pShareContainer, {
                                isMobile: isMobile,
                            })}/>
                            <Route key={'d'} path={`${LocalRouter.RESOURCE_DETAIL}/:id`} component={withPropsComponent(DetailContainer, {
                                isMobile: isMobile,
                            })}/>
                        </MyContent>
                        <FooterContainer/>
                    </AppBody>
                </Router>
            </Provider>
        );
    }
}

export default App;
