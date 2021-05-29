import React, { Component } from "react";
import { Layout } from "antd";
import {
  HashRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Header1 from "../components/header.js";
import Article from "../components/article.js";
import FooterContent from "../components/footer.js";
import './index.css'

const { Header, Footer, Sider, Content } = Layout;

class Login extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Sider style={{ color: "white" }}>Sider</Sider>
        <Layout style={{ color: "white" }}>
          <Header>
            <Header1></Header1>
          </Header>
          <Content>
            <Route
              path={`${this.props.match.path}/`}
              component={Header1}
              exact
            />
            <Route
              path={`${this.props.match.path}/header`}
              component={Header1}
            ></Route>
            <Route
              component={Article}
              path={`${this.props.match.path}/Article`}
            ></Route>
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
