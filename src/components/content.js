import React, { useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { Breadcrumb } from "antd";
import Dispatch from "../views/article/Dispatch.js";
import "./content.css";
import { MyRoute } from "../router/MyRoute.js";
import PropTypes from "prop-types";

function CreateBreadcrumb(props) {
  let { children, FatherProps } = props;
  const [routes, setRoutes] = useState([
    { path: "/index", breadcrumbName: "首页" },
  ]);
  // 监听路由变化改变menuItem的值
  FatherProps.history.listen((route) => {
    let one = children.find(function (item) {
      return item.path === route.pathname;
    });
    let newOne = {};
    if (one) {
      newOne.breadcrumbName = one.desc;
      newOne.path = one.path;
      setRoutes([{ path: "/index/Dispatch", breadcrumbName: "首页" }, newOne]);
    }
  });

  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    );
  }
  // 生成面包逍
  return <Breadcrumb itemRender={itemRender} routes={routes} />;
}

// todo 试着把它改为函数式组件？
class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  // 子组件声明自己需要使用 context
  static contextTypes = {
    children: PropTypes.array,
  };

  render() {
    let { children } = this.context;
    return (
      <React.Fragment>
        <div className="contentWrapper">
          <CreateBreadcrumb
            children={children}
            FatherProps={this.props}
          ></CreateBreadcrumb>
          <Switch>
            {children &&
              children.map((route, key) => {
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
            <Route component={Dispatch}></Route>
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default Content;
