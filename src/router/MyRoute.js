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
      {
        path: "/index/Dispatch",
        component: Dispatch,
        typeIcon: "pie-chart",
        desc: "发文",
      },
      {
        path: "/index/Article",
        component: Article,
        typeIcon: "pie-chart",
        desc: "文章管理",
      },
      {
        path: "/index/Header",
        component: Header1,
        typeIcon: "pie-chart",
        desc: "标签管理",
      },
      {
        path: "/index/Header2",
        component: Header1,
        typeIcon: "pie-chart",
        desc: "标签管理2",
      },
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
    // 首页需要重新定向
    let isIndex = path === "/" || path === "/Index" || path === "/Index/" ;
    return (
      <React.Fragment>
        {token ? (
          <Route {...this.props}></Route>
        ) : (
          <Redirect to="/login"></Redirect>
        )}
        {isLogin && <Route {...this.props}></Route>}
        {isIndex && <Redirect to="/index/Dispatch"></Redirect>}
      </React.Fragment>
    );
  }
};

export { routes, MyRoute };
