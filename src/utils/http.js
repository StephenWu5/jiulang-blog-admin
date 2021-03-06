import axios from 'axios';
import { message } from 'antd';
import { Spin } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
// 获取缓存中的用户信息, 这是接口返回的信息。
var user;
function getUser() {
    if (localStorage.getItem('userInfo')) {
        user = JSON.parse(localStorage.getItem('userInfo'));
    }
}
// 显示加载动画
function showLoading() {
    let dom = document.createElement('div');
    dom.setAttribute('id', 'loading');
    document.body.appendChild(dom);
    ReactDOM.render(<Spin tip="加载中..." size="large" />, dom);
}
// 隐藏加载动画
function hideLoading() {
    document.body.removeChild(document.getElementById('loading'));
}
// 默认域名
// axios.defaults.baseURL = "http://10.26.4.123:8080/api/";
// 配置请求头
axios.defaults.headers['Content-Type'] = 'application/json';
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 响应时间
axios.defaults.timeout = 15000;
//请求拦截器
axios.interceptors.request.use(
    (config) => {
        getUser(); //获取用户信息
        showLoading(); //显示加载动画
        if (user) {
            // 设置统一的请求header
            config.headers.authorization = user.token; //授权(每次请求把token带给后台)
        }
        config.headers.platform = user ? user.platform : 8; //后台需要的参数
        return config;
    },
    (error) => {
        hideLoading(); //关闭加载动画
        return Promise.reject(error);
    }
);

//响应拦截器
axios.interceptors.response.use(
    (response) => {
        hideLoading(); //关闭加载动画
        if (response.data.returnCode === '0014') {
            // 登录失效
            localStorage.clear(); // 清除缓存
            message.success({
                content: '您的登录已经失效，请重新登录',
                duration: 2
            });
            setTimeout(() => {
                //让用户从新回到登录页面
                window._ROUTER_.push('/login'); //router是在顶级入口app.js文件定义了window._ROUTER_ = this.props.history;
            }, 2000);
        }
        return response;
    },
    (error) => {
        hideLoading(); //关闭加载动画
        return Promise.resolve(error.response);
    }
);

// 处理请求返回的数据
function checkStatus(response) {
    return new Promise((resolve, reject) => {
        if (
            response &&
            (response.status === 200 ||
                response.status === 304 ||
                response.status === 400)
        ) {
            resolve(response.data);
        } else if (response && response.status === 404) {
            message.success({
                content: '服务器没有该接口',
                duration: 2
            });
        } else {
            message.success({
                content: '网络异常，请检查网络连接是否正常！',
                duration: 2
            });
        }
    });
}

import qs from 'qs'


const self = this;
export default {
    post(url, params) {
        // 这里需要做动态改变
        return axios({
            method: 'post',
            url,
            data: params
        }).then(response => checkStatus(response));
        // 单元测试
        return axios.post(url, qs.stringify(params)).then(response => checkStatus(response));
    },
    get(url, params) {
        return axios({
            method: 'get',
            url,
            params
        }).then((response) => checkStatus(response));
    }
};

