import React from 'react';
import { Form, Input, Button, Select, message, Card } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
/*
 *通用组件--Form封装
 */
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};
class GroupForm extends React.Component {
  renderFormItem(item) {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form.Item label="Price">
        {getFieldDecorator('title', {
          rules: [{ required: true, message: '请输入标题' }],
          initialValue: '标题'
        })(<TextArea/>)}
      </Form.Item>
    );
  }
  render() {
    const { fields } = this.props;
    return ( <Form className="dispatch-form" {...formItemLayout}>
      {fields.map((group, index ) =>
        (
          <React.Fragment key={group.groupName}>
            <div>{group.groupName}</div>
            {group.hasInnerGroup && group.rows.map((row, rowIndex ) =>
              (
                <React.Fragment key={group.groupName}>
                  <div key={row.groupName}>{row.groupName}</div>
                  {this.renderFormItem(row)}
                </React.Fragment>
              )
            )}
          </React.Fragment>
        )
      )}
      {/* <Form.Item>
        <Button type="primary" onClick={() => this.handleSubmit('submit')}>
          {this.state.mode === 'Edit' ? '更新' : '发文'}
        </Button>
        <Button
          type="primary"
          onClick={() => this.handleSubmit('save')}
        >
        草稿
        </Button>
      </Form.Item> */}
    </Form>);
  }
}

export default Form.create({ name: 'GroupForm' })(GroupForm);
