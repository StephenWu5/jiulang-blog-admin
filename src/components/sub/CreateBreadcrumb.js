
import React, { useState } from 'react';
import { Breadcrumb } from 'antd';
import styles from '../layout/content.module.css';
import { Link } from 'react-router-dom';

function CreateBreadcrumb(props) {
  let { children, FatherProps } = props;
  const [routes, setRoutes] = useState([
    { path: '/index', breadcrumbName: '首页' }
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
      setRoutes([{ path: '/index/Dispatch', breadcrumbName: '首页' }, newOne]);
    }
  });

  function itemRender(route, params, routes) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    );
  }

  // 生成面包逍

  return (
    <Breadcrumb
      className={styles.BreadcrumbWrapper}
      itemRender={itemRender}
      routes={routes}
    />
  );
}

export default CreateBreadcrumb;
