// 发布文章
import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import styles from "./Dispatch.module.css";

const { TextArea } = Input;

class Dispatch extends React.Component {
  handleSubmit = (e) => ,
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
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
