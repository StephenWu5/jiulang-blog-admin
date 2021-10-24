import React from 'react';
import { Modal } from 'antd';
import { Form, message } from 'antd';
import  GroupForm from '../../components/GroupForm';
import http from '../../utils/http';
import { getFields } from './config.js';
import { createTags } from '../../utils/urls';
/*
 *标签页--新增/编辑弹框
 */
class AddTagModal extends React.Component {
  static getDerivedStateFromProps(props) {
    return {
      visible: props.visible
    };
  }
  state = {
    //控制显示隐藏
    visible: true,
    confirmLoading: false,
    // 表格数据
    formData: {
      name: ''
    }
  };
  otherConfig= {};
  mode= 'Add';

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
    // 隐藏弹框
    hideAddTag();
  };

  /**
   * 提交
   * @param {*} action
   * @param {*} values
   */
  handleSubmit = async (action, values) => {
    this.setState({
      confirmLoading: true
    });
    let returnObj = await http.post(createTags, values);
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
  };
  // 按钮列表
  btns = [
    {
      name: 'submit',
      text: '新增'
    },
    {
      name: 'close',
      text: '关闭',
      onClick: this.handleCancel
    }
  ]
  render() {
    const { visible, confirmLoading, formData } = this.state;
    return (
      visible && <Modal
        title="新增标签"
        visible={visible}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={this.handleCancel}
        width={'1000px'}
      >
        <GroupForm
          fields={getFields(this.otherConfig)}
          handleSubmit={this.handleSubmit}
          formData={formData}
          btns={this.btns}
        />
      </Modal>
    );
  }
}
export default Form.create({ name: 'AddTagModal' })(AddTagModal);
