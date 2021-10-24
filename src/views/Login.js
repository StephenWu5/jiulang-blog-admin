import React from 'react';
import { Icon, message, Card } from 'antd';
import './Login.css';
import http from '../utils/http';
import GroupForm from '../components/GroupForm';
import { login, register } from '../utils/urls';
class Login extends React.Component {
  // 按钮列表
  btns = [
    {
      name: 'submit',
      text: '登录'
    },
    {
      name: 'register',
      text: '注册'
    }
  ];
  getFields(otherConfig = {}) {
    let fields = [
      {
        groupLabel: '',
        groupName: '',
        groupSeq: '0',
        groupType: '',
        hasInnerGroup: true,
        rows: [
          {
            fieldName: 'name',
            fieldLabel: '账号',
            fieldType: 'INPUT',
            initValue: '',
            required: '1',
            placeholder: '请输入账号',
            prefix: <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
          },
          {
            fieldName: 'password',
            fieldLabel: '密码',
            fieldType: 'INPUT',
            initValue: '',
            required: '1',
            placeholder: '请输入密码',
            prefix: <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
          }
        ]
      }
    ];
    return fields;
  }
  submit = async (values) => {
    let returnObj = await http.post(login, values);
    if (returnObj.code === 200) {
      message.success(returnObj.message);
      console.log(this.props.history, 'this.props.history');
      this.props.history.push({ pathname: '/index/Dispatch' });
    } else if (returnObj.code === 400) {
      message.info(returnObj.message);
    } else {
      message.info(returnObj.message);
    }
  };

  //注册用户
  register = async (values) => {
    let returnObj = await http.post(register, values);
    if (returnObj.code === 200) {
      //注册成功
      message.success(returnObj.message);
    } else if (returnObj.code === 400) {
      message.info(returnObj.message);
    } else {
      message.info(returnObj.message);
    }
  };

  handleSubmit(action, values){
    if(action === 'submit') {
      this.submit(values);
    }else {
      this.register(values);
    }
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-form">
          <Card>
            <GroupForm
              fields={this.getFields()}
              handleSubmit={(action, values) => this.handleSubmit(action, values)}
              btns={this.btns}
            />
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
