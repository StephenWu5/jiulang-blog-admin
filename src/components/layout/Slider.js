import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Slider extends React.Component {
  // 子组件声明自己需要使用 context
  static contextTypes = {
    menuItem: PropTypes.string,
    callback: PropTypes.func,
    children: PropTypes.array
  };
  constructor(props) {
    // 必须在这里通过super调用父类的constructor
    super(props);
    // 给state赋值，可以使用props
    this.state = {};
  }
  render() {
    let { children } = this.context;
    return (
      <React.Fragment>
        <div className="logo" />
        <Menu theme="dark"
          defaultSelectedKeys={this.context.menuItem}
          selectedKeys={this.context.menuItem}
          mode="inline"
        >
          {children &&
            children.map((item, key) => (
              <Menu.Item key={key}>
                <Link to={item.path}>
                  <Icon type={item.typeIcon} />
                  <span>{item.desc}</span>
                </Link>
              </Menu.Item>
            ))}
        </Menu>
      </React.Fragment>
    );
  }
}

export default Slider;
