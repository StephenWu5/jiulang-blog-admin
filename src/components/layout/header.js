import React from 'react';
import { Avatar, Dropdown, Icon, Menu, message } from 'antd';
import Cookies from 'js-cookie';

import './header.css';

class Header extends React.PureComponent {
    state = {
        personInfo: { name: '' }
    };
    /**
     * 个人信息初始化
     */
    personInfoInit() {
        if (Cookies.getJSON('resc')) {
            let resc = Cookies.getJSON('resc').slice(2);
            resc = JSON.parse(resc);
            this.setState({
                // 增加条件ismount为true时
                personInfo: resc
            });
        }
    }
    logOut() {
        Cookies.remove('resc');
        message.success('退出成功');
        this.props.history.push({ pathname: '/login' });
    }
    getMenu = (
        <Menu onClick={this.logOut.bind(this)}>
            <Menu.Item key="1">
                <Icon type="user" />
                退出登录
            </Menu.Item>
        </Menu>
    );
    componentDidMount() {
        this.personInfoInit();
    }
    render() {
        const {  name } =  this.state.personInfo || '';
        return (
            <div className="content">
                <span className="header-name">{name}</span>
                <Dropdown overlay={this.getMenu}>
                    <Avatar size={32} icon="user">
                        <Icon type="down" />
                    </Avatar>
                </Dropdown>
            </div>
        );
    }
}

export default Header;
