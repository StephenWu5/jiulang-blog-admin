import React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Slider extends React.Component {
  constructor(props) {
    // 必须在这里通过super调用父类的constructor
    super(props);
    // 给state赋值，可以使用props
    this.state = {
    };
  }

  // 子组件声明自己需要使用 context
  static contextTypes = {
    menuItem: PropTypes.string,
    callback: PropTypes.func,
  };

  render() {
    return (
      <React.Fragment>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={this.context.menuItem}
          selectedKeys={this.context.menuItem}
          mode="inline"
        >
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
