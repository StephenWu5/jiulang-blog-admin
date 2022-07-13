import React, { Component, PureComponent, createElement } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import asyncComponent from './asyncComponent';

const Dispatch = asyncComponent(() => import(/* webpackChunkName: 'article-Dispatch121' */ '../views/article/Dispatch.js'));
import Index from '../views/Index';
import Article from '../views/article/Article.js';
import(/* webpackChunkName: 'article-Dispatch121' */ '../views/article/Dispatch.js');
import Tag from '../views/tag/Tag.js';

/**
 * 异步加载组件
 * @param load 组件加载函数，load 函数会返回一个 Promise，在文件加载完成时 resolve
 * @returns {AsyncComponent} 返回一个高阶组件用于封装需要异步加载的组件
 */
function getAsyncComponent(load) {
    return class AsyncComponent extends PureComponent {

        componentDidMount() {
            // 在高阶组件 DidMount 时才去执行网络加载步骤
            load().then(({ default: component }) => {
                // 代码加载成功，获取到了代码导出的值，调用 setState 通知高阶组件重新渲染子组件
                this.setState({
                    component
                });
            });
        }

        render() {
            console.log(this.props, 'props');
            const { component } = this.state || {};
            // component 是 React.Component 类型，需要通过 React.createElement 生产一个组件实例
            return component ? createElement(component, this.props) : null;
        }
    }
}



// 动态路由 -- 后面需要改为后台编辑保存的
let routes = [
    {
        path: '/index',
        component: Index,
        children: [
            {
                path: '/index/Dispatch',
                // 组件的按需加载
                // component: getAsyncComponent(
                //     // 异步加载函数，异步地加载 PageAbout 组件
                //     () => import(/* webpackChunkName: 'article-Dispatch' */ '../views/article/Dispatch.js')
                // ),
                component: Dispatch,
                typeIcon: 'weibo-circle',
                desc: '发文'
            },
            {
                path: '/index/Article',
                component: Article,
                typeIcon: 'book',
                desc: '文章管理'
            },
            {
                path: '/index/Tag',
                component: Tag,
                typeIcon: 'tags',
                desc: '标签管理'
            }
        ]
    },
    // * 对应的路由必须放在最后面。
    { path: '*', component: Index }
];

// 自定义路由 是为了检验是否登录和区分登录页面
// eslint-disable-next-line react/no-multi-comp
let MyRoute = class MyRoute extends Component {
    render() {
        let token = Cookies.get('resc');
        return (
            <React.Fragment>
                {/* 校验登录 */}
                {token ? (
                    <Route {...this.props}></Route>
                ) : (
                    <Redirect to="/login"></Redirect>
                )}
            </React.Fragment>
        );
    }
};

export { routes, MyRoute };
