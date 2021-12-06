import React from 'react';
import { Form, message, Modal } from 'antd';

import GroupForm from '../../components/GroupForm';
import http from '../../utils/http';
import { getFields } from './config.js';
import { createTags } from '../../utils/urls';

/*
 *标签页--新增/编辑弹框
 */
class AddTagModal extends React.PureComponent {
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
    otherConfig = {};
    mode = 'Add';
    /*
     *显示弹框
     */
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    /*
     *隐藏弹框
     */
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
    ];
    /**
     * 提交
     * @param {*} action
     * @param {*} values
     */
    handleSubmit = async (action, values) => {
        this.setState({
            confirmLoading: true
        });
        const { code, message: messageText } = await http.post(createTags, values);
        this.setState({
            confirmLoading: false
        });
        if (code === 200) {
            //发布成功
            message.success(messageText);
            this.handleCancel();
        } else if (code === 400) {
            message.info(messageText);
        } else {
            message.info(messageText);
        }
    };
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
