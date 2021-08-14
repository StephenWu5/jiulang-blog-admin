import React, { Component } from "react";
import MyRoute from "../router/MyRoute.js";
import Header1 from "../components/header.js";
import Article from "../views/article/Article.js";
import Dispatch from "../views/article/Dispatch.js";
import { Breadcrumb } from "antd";
import './content.css';


class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="contentWrapper">
          {/* 面包霄 */}
          <Breadcrumb className="Breadcrumb">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application Center</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
          <MyRoute
            path={`${this.props.match.path}/`}
            component={Dispatch}
            exact
          />
          <MyRoute
            component={Dispatch}
            path={`${this.props.match.path}/Dispatch`}
          ></MyRoute>
          <MyRoute
            component={Article}
            path={`${this.props.match.path}/Article`}
          ></MyRoute>
          <MyRoute
            path={`${this.props.match.path}/Header`}
            component={Header1}
          ></MyRoute>
        </div>
      </React.Fragment>
    );
  }
}

export default Content;
