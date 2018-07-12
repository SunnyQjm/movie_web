import React from 'react'

import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Dropdown from 'antd/lib/dropdown';
import message from 'antd/lib/message';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
    Link
} from 'react-router-dom'
import LocalRouter from '../../LocalRouter'

const {Item} = Menu;

const Logo = styled.div`
    height: 63px;
    padding: 0;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center; 
    flex-grow: 0;
`;

const Header = styled.div`
    padding: 0 34px;
    flex-grow: 0;
    display: flex;
    height: 72px;
    align-items: center;
`;

const MyMenu = styled(Menu)`
    line-height: 64px;
    background-color: transparent;
    display: flex;
`;

const MyItem = styled(Item)`

`;

const MyDropDown = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
`;



const menuItems = [
    <MyItem key={LocalRouter.HOME}><Link to={LocalRouter.HOME}>首页</Link></MyItem>,
    <MyItem key={LocalRouter.VIDEO}><Link to={LocalRouter.VIDEO}>影视</Link></MyItem>,
    <MyItem key={LocalRouter.UPLOAD}><Link to={LocalRouter.UPLOAD}>上传</Link></MyItem>,
    <MyItem key={LocalRouter.P2P_SHARE}><Link to={LocalRouter.P2P_SHARE}>P2P</Link></MyItem>
];

class Nav extends React.Component {

    constructor(props){
        super(props);
        this.handleMobileMenuClick = this.handleMobileMenuClick.bind(this);
    }

    handleMobileMenuClick(e){
        const {onSelect} = this.props;
        onSelect && onSelect(e);
    }

    render() {
        const {isMobile, onSelect} = this.props;
        // 根据当前地址栏的URL，判断当前应该是哪个菜单项被选中
        let selectedKey = '/' + document.location.pathname.split('/').pop();
        let dropDownMenu = (
            <Menu
                theme={'light'}
                selectedKeys={[selectedKey]}
                onClick={this.handleMobileMenuClick}
            >
                {menuItems}
            </Menu>
        );
        let menu = isMobile ?
            <MyDropDown>
                <Dropdown overlay={dropDownMenu} trigger={['click']} style={{
                    color: 'white',
                }}>
                <span style={{
                    color: 'white',
                    fontSize: '1.8em'
                }}>
                    <Icon type="bars"/>
                </span>
                </Dropdown>
            </MyDropDown>
            :
            <MyMenu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={[selectedKey]}
                onSelect={onSelect}
            >
                {menuItems}
            </MyMenu>;
        return (
            <Header>
                <Logo>
                    <img src={require('../../img/icon.png')} style={{
                        width: '30px',
                        height: '30px',
                        marginRight: '20px'
                    }}/>
                </Logo>
                {menu}
            </Header>
        );
    }
}

Nav.propTypes = {
    isMobile: PropTypes.bool,
    defaultSelectedKey: PropTypes.string,
    onSelect: PropTypes.func,
};

Nav.defaultProps = {
    isMobile: false,
    defaultSelectedKey: LocalRouter.HOME,
    onSelect: (item, key, selectedKeys ) => {}
};


export default Nav;