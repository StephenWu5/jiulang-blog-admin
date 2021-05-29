import React from 'react';
import "./App.css";
import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./views/login";
import Index from "./views/index";
import { NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/*
            路由重定向
          */}
          <Route path="/" component={Index} exact />
          <Route path="/index" component={Index}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
