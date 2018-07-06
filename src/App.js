import React, {Component} from 'react';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import {
    BrowserRouter as Router,
    Route,
    Switch
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

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router
                    basename={'/movie_253'}
                >
                    <AppBody style={{
                        // backgroundColor: '#13171a',
                        minHeight: '100%',
                    }}>
                        <HeaderContainer/>
                        <MyContent>
                            <Switch>
                                <Route key={'a'} exact path={LocalRouter.HOME} component={HomeContainer}/>
                                <Route key={'b'} path={LocalRouter.UPLOAD} component={UploadContainer}/>
                                <Route key={'b'} path={LocalRouter.P2P_SHARE} component={P2pShareContainer}/>
                            </Switch>
                        </MyContent>
                        <FooterContainer/>
                    </AppBody>
                </Router>
            </Provider>
        );
    }
}

export default App;
