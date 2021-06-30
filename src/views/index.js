import React, { Component } from "react";
import { Layout } from "antd";

import Header1 from "../components/header.js";
import Content1 from "../components/content.js";
import Slider from "../components/Slider.js";
import FooterContent from "../components/footer.js";
import './index.css'

const { Header, Footer, Sider, Content } = Layout;

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
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
