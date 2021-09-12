import React from 'react';
import { Avatar, Dropdown, Icon, Menu, message } from 'antd';
import './header.css';
import Cookies from 'js-cookie';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personInfo: { name: '' }
    };
  }

  UNSAFE_componentWillMount() {
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

  menu = (
    <Menu onClick={this.logOut.bind(this)}>
      <Menu.Item key="1">
        <Icon type="user" />
        退出登录
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <div className="content">
        <span className="header-name">{this.state.personInfo.name}</span>
        <Dropdown overlay={this.menu}>
          <Avatar size={32} icon="user">
            <Icon type="down" />
          </Avatar>
        </Dropdown>
      </div>
    );
  }
}

export default Header;
