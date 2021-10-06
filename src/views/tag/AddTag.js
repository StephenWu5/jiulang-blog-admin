import React from 'react';
import { Modal, Button } from 'antd';
import { Form, Icon, Input, Checkbox, message } from 'antd';
import styles from './AddTag.module.css';
import http from '@/server.js';
/*
 *标签页新增/编辑弹框
 */
class AddTagModal extends React.Component {
  static getDerivedStateFromProps(props, state) {
    return {
      visible: props.visible
    };
  }
  state = {
    ModalText: 'Content of the modal',
    visible: true, //控制显示隐藏
    confirmLoading: false,
    formData: {
      //formData数据
      name: '2121'
    }
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    const { hideAddTag } = this.props;
    // 清空form表单字段
    this.setState(
      {
        formData: { name: '' }
      }
    );
    hideAddTag();
  };

  handleSubmit = (e) => {
    const { hideAddTag } = this.props;
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          confirmLoading: true
        });
        let url = '/api/tags/create';
        let returnObj = await http.post(url, values);
        this.setState({
          confirmLoading: false
        });
        if (returnObj.code === 200) {
          //发布成功
          message.success(returnObj.message);
          this.handleCancel();
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
    const { visible, confirmLoading, formData } = this.state;
    return (
      visible && <Modal
        title="新增标签"
        visible={visible}
        onOk={this.handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div className={styles.title}>标签名：</div>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入标签名！' }],
              initialValue: formData.name
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="请输入标签名称"
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'AddTagModal' })(AddTagModal);
