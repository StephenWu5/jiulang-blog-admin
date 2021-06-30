import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

export default class MyRoute extends Component {
  render() {
    let token = Cookies.get("resc");
    return (
      <React.Fragment>
        {token ? (
          <Route {...this.props}></Route>
        ) : (
          <Redirect to="/login"></Redirect>
        )}
      </React.Fragment>
    );
  }
}
