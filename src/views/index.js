import React, { Component } from "react";
import { Layout } from "antd";
import {
  HashRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Header1 from "../components/header.js";
import Slider from "../components/Slider.js";
import Article from "../components/article.js";
import FooterContent from "../components/footer.js";
import MyRoute from "../router/MyRoute";
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
            <Header1></Header1>
          </Header>
          <Content>
            <MyRoute
              path={`${this.props.match.path}/`}
              component={Header1}
              exact
            />
            <MyRoute
              path={`${this.props.match.path}/header`}
              component={Header1}
            ></MyRoute>
            <MyRoute
              component={Article}
              path={`${this.props.match.path}/Article`}
            ></MyRoute>
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
