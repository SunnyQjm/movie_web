import React, {Component} from 'react';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import {enquireScreen} from 'enquire-js';       //用于做手机屏幕适配
import './config/axios-config';         //导入axios配置

import {
    Router,
    Route,
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

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
    VideoContainer,
    LittleToolContainer,
    SearchResultContainer,
} from './containers'
import {
    VertifyGitmentComponent,
} from './components';
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

const history = createBrowserHistory();


class App extends Component {


    componentDidMount() {
        // 适配手机屏幕;
        enquireScreen((b) => {
            this.setState({isMobile: !!b});
        });
    }

    render() {
        return (
            <Provider store={store}>
                <Router
                    basename={process.env.PUBLIC_URL}
                    history={history}
                >
                    <AppBody style={{
                        minHeight: '100%',
                    }}>
                        <HeaderContainer isMobile={isMobile} history={history}/>
                        <MyContent>
                            <Route key={'a'} exact path={LocalRouter.HOME} render={withPropsComponent(HomeContainer, {
                                isMobile: isMobile
                            })}/>
                            <Route key={'b'} path={LocalRouter.UPLOAD} render={withPropsComponent(UploadContainer, {
                                isMobile: isMobile
                            })}/>
                            <Route key={'c'} path={LocalRouter.P2P_SHARE} render={withPropsComponent(P2pShareContainer, {
                                isMobile: isMobile,
                            })}/>
                            <Route key={'d'} path={`${LocalRouter.RESOURCE_DETAIL}/:id`} render={withPropsComponent(DetailContainer, {
                                isMobile: isMobile,
                            })}/>
                            <Route key={'e'} path={`${LocalRouter.VERTIFY_GITMENT}`} render={withPropsComponent(VertifyGitmentComponent, {
                                isMobile: isMobile,
                            })}/>
                            <Route key={'f'} path={`${LocalRouter.VIDEO}`} render={withPropsComponent(VideoContainer, {
                                isMobile: isMobile,
                            })}/>
                            <Route key={'g'} path={`${LocalRouter.LITTLE_TOOL}`} render={withPropsComponent(LittleToolContainer, {
                                isMobile: isMobile,
                            })}/>
                            <Route key={'h'} path={`${LocalRouter.SEARCH_RESULT}/:keywords`} render={withPropsComponent(SearchResultContainer, {
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
