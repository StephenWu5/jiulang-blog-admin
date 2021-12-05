import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
const { Header, Footer, Sider, Content } = Layout;

import SelfHeader from '../components/layout/header.js';
import SelfContent from '../components/layout/content.js';
import Slider from '../components/layout/Slider.js';
import FooterContent from '../components/layout/footer.js';
import './Index.css';


class Login extends React.Component {
    // 子组件声明自己需要使用 context
    static contextTypes = {
        children: PropTypes.array
    };
    // 父组件声明自己支持 context
    static childContextTypes = {
        menuItem: PropTypes.string,
        callback: PropTypes.func
    };
    // 定义liangliangnihonihoa niahonihao nhoa
    state = {
        collapsed: false,
        menuItem: '0' // 初始化menuItem高亮
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const { type } = nextProps;
        // type可能由props驱动，也可能由state驱动，这样判断会导致state驱动的type被回滚
        if (type !== prevState.type) {
            return {
                type
            };
        }
        // 否则，对于state不进行任何操作
        return null;
    }

    // 父组件提供一个函数，用来返回相应的 context 对象
    getChildContext() {
        return {
            menuItem: this.state.menuItem,
            callback: () => {}
        };
    }
    componentDidMount() {
        // 初始化路由menuItem的值
        this.setMenuItem(this.props.location);
        // 监听路由变化改变menuItem的值
        this.props.history.listen((route) => {
            this.setMenuItem(route);
        });
    }
    setMenuItem = (item) => {
        let index = this.context.children.findIndex((rItem) => rItem.path === item.pathname);
        this.setState({
            menuItem: index === -1 ? 0 : index.toString()
        });
    }
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    };
    render() {
        const { collapsed } = this.state;
        const { history } = this.props;
        return (
            <Layout style={{ height: '100%' }}>
                <Sider
                    style={{ color: 'white' }}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={this.onCollapse}
                >
                    <Slider></Slider>
                </Sider>
                <Layout style={{ color: 'white' }}>
                    <Header>
                        <SelfHeader history={history}></SelfHeader>
                    </Header>
                    <Content>
                        <SelfContent {...this.props}></SelfContent>
                    </Content>
                    <Footer>
                        <FooterContent></FooterContent>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
export default Login;
