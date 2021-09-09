import React, { Component, useState } from "react";
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
      menuItem: "0", // 初始化menuItem高亮
    };
    this.setMenuItem = this.setMenuItem.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { type } = nextProps;
    // type可能由props驱动，也可能由state驱动，这样判断会导致state驱动的type被回滚
    if (type !== prevState.type) {
      return {
        type,
      };
    }
    // 否则，对于state不进行任何操作
    return null;
  }

  componentDidMount() {
    // 初始化路由menuItem的值
    this.setMenuItem(this.props.location);
    // 监听路由变化改变menuItem的值
    this.props.history.listen((route) => {
      this.setMenuItem(route);
    });
  }

  setMenuItem(item) {
    let { childRoute } = this.context;
    let index = childRoute.findIndex((rItem) => {
      return rItem.path === item.pathname;
    });
    this.setState({
      menuItem: index.toString(),
    });
  }

  // 父组件声明自己支持 context
  static childContextTypes = {
    menuItem: PropTypes.string,
    callback: PropTypes.func,
  };

  // 子组件声明自己需要使用 context
  static contextTypes = {
    childRoute: PropTypes.array,
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
