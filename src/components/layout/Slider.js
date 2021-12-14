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
    handleClick = ({ item, key, keyPath, domEvent }) => {
        this.context.callback(key);
        // react 更新的 精华或者使用 antd的 setItem , 严禁使用 updateForce。
        this.setState({
            freshFlag: new Date().getTime()
        });
    }
    render() {
        const { children, menuItem } = this.context;
        return (
            <React.Fragment>
                <div className="logo" />
                <Menu theme="dark"
                    defaultSelectedKeys={menuItem}
                    selectedKeys={menuItem}
                    mode="inline"
                    onClick={this.handleClick}
                >
                    {children &&
                        children.map((item, key) => {
                            const { path, typeIcon, desc } = item;
                            return (
                                <Menu.Item key={key}>
                                    <Link to={path}>
                                        <Icon type={typeIcon} />
                                        <span>{desc}</span>
                                    </Link>
                                </Menu.Item>
                            )
                        })}
                </Menu>
            </React.Fragment>
        );
    }
}
export default Slider;
