import React, { Component } from "react";

import { Breadcrumb } from "antd";
import "./content.css";
import { MyRoute } from "../router/MyRoute.js";
import PropTypes from "prop-types";

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  // 子组件声明自己需要使用 context
  static contextTypes = {
    childRoute: PropTypes.array,
  };

  render() {
    let { childRoute } = this.context;
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
          {childRoute &&
            childRoute.map((route, key) => {
              // console.log(route)
              if (route.exact) {
                return (
                  <MyRoute
                    key={key}
                    exact
                    path={route.path}
                    component={route.component}
                  />
                );
              } else {
                return (
                  <MyRoute
                    key={key}
                    path={route.path}
                    component={route.component}
                  />
                );
              }
            })}
        </div>
      </React.Fragment>
    );
  }
}

export default Content;
