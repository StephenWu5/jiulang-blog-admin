import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import './Login.css';
import http from '../utils/http';
import GroupForm from '../components/GroupForm';
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
            fieldLabel: '',
            fieldType: 'INPUT',
            initValue: '',
            required: '1',
            placeholder: '请输入'
          },
          {
            fieldName: 'password',
            fieldLabel: '',
            fieldType: 'INPUT',
            initValue: '',
            required: '1',
            placeholder: '请输入',
            initStyle: { rows: '22' }
          }
        ]
      }
    ];
    return fields;
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        //let returnObj = await http.post("http://localhost:8081/login", values);
        let returnObj = await http.post('/api/login', values);
        if (returnObj.code === 200) {
          message.success(returnObj.message);
          this.props.history.push({ pathname: '/index/Dispatch' });
        } else if (returnObj.code === 400) {
          message.info(returnObj.message);
        } else {
          message.info(returnObj.message);
        }
      }
    });
  };

  //注册用户
  register = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let returnObj = await http.post('/api/register', values);
        if (returnObj.code === 200) {
          //注册成功
          message.success(returnObj.message);
        } else if (returnObj.code === 400) {
          message.info(returnObj.message);
        } else {
          message.info(returnObj.message);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-wrapper">
        <GroupForm
          fields={this.getFields()}
          handleSubmit={this.handleSubmit}
          btns={this.btns}
        />
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入名称！' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="请输入名称"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="请输入密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
            <span style={{ color: 'white' }}>或者</span>
            <Button
              type="primary"
              onClick={this.register.bind(this)}
              className="login-form-button"
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'normal_login' })(Login);
