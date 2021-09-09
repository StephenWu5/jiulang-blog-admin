import React from "react";
import "./App.css";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PropTypes from "prop-types";

import { MyRoute, routes } from "./router/MyRoute.js";


class App extends React.Component {
  // 父组件声明自己支持 context
  static childContextTypes = {
    childRoute: PropTypes.array,
  };

  // 父组件提供一个函数，用来返回相应的 context 对象
  getChildContext() {
    return {
      childRoute: routes[1].childRoute,
    };
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            {/*
            路由重定向
          */}
            {routes.map((route, key) => {
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
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
