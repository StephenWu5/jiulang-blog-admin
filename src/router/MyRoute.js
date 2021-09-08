import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "../views/Login";
import Index from "../views/Index";
import Header1 from "../components/header.js";
import Article from "../views/article/Article.js";
import Dispatch from "../views/article/Dispatch.js";

// 动态路由
let routes = [
  { path: "/", component: Index, exact: true },
  {
    path: "/index",
    component: Index,
    childRoute: [
      { path: "/index/", component: Dispatch, exact: true },
      { path: "/index/Dispatch", component: Dispatch },
      { path: "/index/Article", component: Article },
      { path: "/index/Header", component: Header1 },
    ],
  },
  { path: "/login", component: Login },
];

// 自定义路由 是为了检验是否登录和区分登录页面
let MyRoute = class MyRoute extends Component {
  render() {
    let token = Cookies.get("resc");
    let { path } = this.props;
    let isLogin = path === "/login";
    return (
      <React.Fragment>
        {token || isLogin ? (
          <Route {...this.props}></Route>
        ) : (
          <Redirect to="/login"></Redirect>
        )}
      </React.Fragment>
    );
  }
};

export { routes, MyRoute };
