// 发布文章
import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import styles from "./Dispatch.module.css";
import http from '@/server.js';
import moment from "moment";
const { TextArea } = Input;

class Dispatch extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getParams = this.getParams.bind(this);
   }

  // 拼接参数
  getParams() {
    var now = moment().format("YYYY-MM-DD, h:mm:ss");
    return {
      now
    }
  }

  // 发文提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let param = this.getParams();
        let params = {
          ...values,
          ...param,
        };
        let returnObj = await http.post("/api/articles/dispatch", params);
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
        <Form onSubmit={this.handleSubmit} className="dispatch-form">
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
            <Button type="primary" htmlType="submit">
              发文
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: "normal_dispatch" })(Dispatch);
