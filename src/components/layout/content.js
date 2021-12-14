import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Dispatch from '../../views/article/Dispatch.js';
import { MyRoute } from '../../router/MyRoute.js';
import CreateBreadcrumb from '../sub/CreateBreadcrumb';
import styles from './content.module.css';

/**
 * 内容区组件
 */
class Content extends React.PureComponent {
    // 子组件声明自己需要使用 context
    static contextTypes = {
        children: PropTypes.array
    }
    render() {
        let { children } = this.context;
        return (
            <React.Fragment>
                <div className={styles.contentWrapper}>
                    <CreateBreadcrumb
                        children={children}
                        FatherProps={this.props}
                    ></CreateBreadcrumb>
                    <Switch>
                        {children &&
                            children.map((route, key) => {
                                if (route.exact) {
                                    return (
                                        <MyRoute
                                            key={key}
                                            exact
                                            path={route.path}
                                            component={route.component}
                                        />
                                    );
                                } else {
                                    return (
                                        <MyRoute
                                            key={key}
                                            path={route.path}
                                            component={route.component}
                                        />
                                    );
                                }
                            })}

                        <Route component={Dispatch}></Route>
                    </Switch>
                </div>
            </React.Fragment>
        );
    }
}
export default Content;
