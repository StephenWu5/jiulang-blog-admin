import React, { Component } from "react";
import { Layout } from "antd";
import PropTypes from "prop-types";

import Header1 from "../components/header.js";
import Content1 from "../components/content.js";
import Slider from "../components/Slider.js";
import FooterContent from "../components/footer.js";
import './Index.css'

const { Header, Footer, Sider, Content } = Layout;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menuItem: '0'
    };
    // 监听路由变化
    this.props.history.listen((route) => {
      let routeMap = {
        "/index/Header": "2",
        "/index/Article": "1",
        "/index/Dispatch": "0",
      };
      this.setState({
        menuItem: routeMap[route.pathname]
      })
    });
  }

  // 父组件声明自己支持 context
  static childContextTypes = {
    menuItem: PropTypes.string,
    callback: PropTypes.func,
  };

  // 父组件提供一个函数，用来返回相应的 context 对象
  getChildContext() {
    return {
      menuItem: this.state.menuItem,
      callback: this.callback.bind(this),
    };
  }

  callback(msg) {
    console.log(msg);
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  //

  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Sider
          style={{ color: "white" }}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Slider></Slider>
        </Sider>
        <Layout style={{ color: "white" }}>
          <Header>
            <Header1 history={this.props.history}></Header1>
          </Header>
          <Content>
            <Content1 {...this.props}></Content1>
          </Content>
          <Footer>
            <FooterContent></FooterContent>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}


export default Login;
