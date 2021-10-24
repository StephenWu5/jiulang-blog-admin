import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import Index from '../views/Index';
import Article from '../views/article/Article.js';
import Dispatch from '../views/article/Dispatch.js';
import Tag from '../views/tag/Tag.js';

// 动态路由 -- 后面需要改为后台编辑保存的
let routes = [
  {
    path: '/index',
    component: Index,
    children: [
      {
        path: '/index/Dispatch',
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
