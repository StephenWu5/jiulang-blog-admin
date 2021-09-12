import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dispatch from '../../views/article/Dispatch.js';
import styles from './content.module.css';
import { MyRoute } from '../../router/MyRoute.js';
import PropTypes from 'prop-types';
import CreateBreadcrumb from '../sub/CreateBreadcrumb';


// todo 试着把它改为函数式组件？

class Content extends React.Component {
  // 子组件声明自己需要使用 context
  static contextTypes = {
    children: PropTypes.array
  }
  constructor(props) {
    super(props);
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
                // console.log(route)

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
