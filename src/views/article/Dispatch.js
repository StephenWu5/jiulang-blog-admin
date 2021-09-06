// 发布文章
import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import styles from "./Dispatch.module.css";
import http from '@/server.js';
const { TextArea } = Input;

class Dispatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode:  this.props.location.query === undefined ? 'Add' : 'Edit'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getParams = this.getParams.bind(this);
   }

  // 拼接参数
  getParams(type) {
    // 拼接草稿状态字段
    let status = type === 'submit' ? 1 : 0;
    return {
      status
    }
  }

  // 发文提交
  handleSubmit = (type) => {
    let param = this.getParams(type);
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let params = this.state.mode === 'Add' ? {
          ...param,
          ...values,
        } : {
          ...this.props.location.query,
          ...param,
          ...values,
        };
        let url = this.state.mode === 'Add' ?  '/api/articles/dispatch' : '/api/articles/update';
        let returnObj = await http.post(url, params);
        if (returnObj.code === 200) {
          //发文成功
          message.success(returnObj.message);
          this.props.history.push({ pathname: "/index/Article" });
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
      <div className="dispatch-wrapper">
        <Form className="dispatch-form" ref={this.textForm}>
          <div className={styles.title}>标题：</div>
          <Form.Item>
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入标题" }],
            })(<TextArea autoSize={{ minRows: 1, maxRows: 2 }} />)}
          </Form.Item>
          <div className={styles.title}>文章内容：</div>
          <Form.Item>
            {getFieldDecorator("content", {
              rules: [{ required: true, message: "请输入内容" }],
            })(<TextArea autoSize={{ minRows: 8, maxRows: 15 }} />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => this.handleSubmit("submit")}>
              {this.state.mode === "Edit" ? '更新' : '发文'}
            </Button>
            <Button
              type="primary"
              className={styles.saveButton}
              onClick={() => this.handleSubmit("save")}
            >
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  componentDidMount() {
    // 表单字段初始化
    if(this.state.mode === 'Edit') {
      let { title, content } = this.props.location.query;
      this.props.form.setFieldsValue({
        title,
        content,
      })
    }
  }

}

export default Form.create({ name: "normal_dispatch" })(Dispatch);
