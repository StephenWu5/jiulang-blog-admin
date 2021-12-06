import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

class Slider extends React.PureComponent {
    // 子组件声明自己需要使用 context
    static contextTypes = {
        menuItem: PropTypes.string,
        callback: PropTypes.func,
        children: PropTypes.array
    };
    onClick = ({ item, key, keyPath, domEvent }) => {
        this.context.callback(key);
        // react 更新的 精华或者使用 antd的 setItem , 严禁使用 updateForce。
        this.setState({
            freshFlag: new Date().getTime()
        });
    }
    render() {
        const { children } = this.context;
        return (
            <React.Fragment>
                <div className="logo" />
                <Menu theme="dark"
                    defaultSelectedKeys={this.context.menuItem}
                    selectedKeys={this.context.menuItem}
                    mode="inline"
                    onClick={this.onClick}
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
