import React from 'react';
import { Modal, Button } from 'antd';
import { Form, Icon, Input, Checkbox } from 'antd';
import styles from './AddTag.module.css';
/*
 *标签页新增/编辑弹框
 */
class AddTagModal extends React.Component {
  static getDerivedStateFromProps(props, state) {
    return { visible: props.visible };
  }
  state = {
    ModalText: 'Content of the modal',
    visible: true, //控制显示隐藏
    confirmLoading: false,
    formData: {
      //formData数据
      tag: '666'
    }
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    setTimeout(() => {
      this.setState({
        confirmLoading: false
      });
      this.handleCancel();
    }, 2000);
  };

  handleCancel = () => {
    const { hideAddTag } = this.props;
    hideAddTag();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          confirmLoading: true
        });
        setTimeout(() => {
          this.setState({
            confirmLoading: false
          });
          this.handleCancel();
        }, 2000);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, confirmLoading, formData } = this.state;
    return (
      <Modal
        title="新增/编辑标签"
        visible={visible}
        onOk={this.handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div className={styles.title}>标签名：</div>
          <Form.Item>
            {getFieldDecorator('tag', {
              rules: [{ required: true, message: '请输入标签名！' }],
              initialValue: formData.tag
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
