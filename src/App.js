import React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import PropTypes from 'prop-types';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

import { MyRoute, routes } from './router/MyRoute.js';
import Login from './views/Login';
import './App.css';
import './styles/common.less';
/**
 *
 */
class App extends React.PureComponent {
    // 父组件声明自己支持 context
    static childContextTypes = {
        children: PropTypes.array
    };
    state = {
        routes: []
    };
    // 父组件提供一个函数，用来返回相应的 context 对象
    getChildContext() {
        return {
            children: routes[0].children
        };
    }
    componentDidMount() {
        this.setState({
            routes
        });
    }
    render() {
        return (
            <div className="App">
                {/* 全局国际化配置支持汉字 */}
                <ConfigProvider locale={zhCN}>
                    <Router>
                        <Switch>
                            {/*
                                路由重定向
                            */}
                            <Route path="/login" component={Login}></Route>
                            {routes.map((route, key) => {
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
                </ConfigProvider>
            </div>
        );
    }
}
export default App;
