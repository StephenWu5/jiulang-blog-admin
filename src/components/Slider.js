import React, { Component } from "react";
import { Menu, Icon, Button } from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

class Slider extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="0">
            <Link to="/index/Dispatch">
              <Icon type="pie-chart" />
              <span>发文</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/index/Article">
              <Icon type="pie-chart" />
              <span>文章管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/index/Header">
              <Icon type="desktop" />
              <span>标签管理</span>
            </Link>
          </Menu.Item>
        </Menu>
      </React.Fragment>
    );
  }
}

export default Slider;
