import React from 'react';
import "./App.css";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./views/Login";
import Index from "./views/Index";
import { NavLink } from "react-router-dom";
import MyRoute from "./router/MyRoute.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/*
            路由重定向
          */}
          <MyRoute path="/" component={Index} exact />
          <MyRoute path="/index" component={Index}></MyRoute>
          <Route path="/login" component={Login}></Route>
          <Redirect to="/index"></Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
