import React from 'react';
import { Form, Input, Button, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
/*
 *通用组件--Form封装
 */
// 表单的布局设置
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
// 表单项的布局设置
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};
class GroupForm extends React.Component {
  /**
   * 渲染表格每一项输入
   * @param {*} field
   * @returns
   */
  renderFormItem(field) {
    const { form, formData } = this.props;
    const { getFieldDecorator } = form;
    const { fieldLabel, fieldName, required, initValue, fieldType, placeholder, enums, initStyle } =
      field;
    let element;
    if(fieldType === 'INPUT') {
      // 输入框
      element = <Input placeholder={placeholder}/>;
    }else if(fieldType === 'TEXTAREA') {
      // 文本域
      element = <TextArea placeholder={placeholder}  rows={initStyle.rows}/>;
    }else if(fieldType === 'SELECT') {
      // 下拉框
      console.log(enums, 'enums');
      element =  <Select placeholder={placeholder}>
        {enums.map((item) => (
          <Option value={item.name} key={item.id}>
            {item.name}
          </Option>))
        }
      </Select>;
    }else {
      // 其他
      element = <Input disabled placeholder={'暂时不支持开发'}/>;
    }
    return (
      <Form.Item label={fieldLabel}>
        {getFieldDecorator(fieldName, {
          rules: [{ required: required, message: '必填项' }],
          // 默认值依次取 详情中的数据 || 配置中的数据 || 空
          initialValue: formData[fieldName] || initValue || ''
        })(element)}
      </Form.Item>
    );
  }
  /**
   * 表格提交获取值
   * @param {*} action
   */
  handleSubmit(action) {
    const { form, handleSubmit } = this.props;
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log(values, 'values');
        handleSubmit(action, values);
      }
    });
  }
  render() {
    const { fields, btns } = this.props;
    return (
      <Form className="dispatch-form" {...formItemLayout}>
        {fields.map((group, index) => (
          <React.Fragment key={group.groupName}>
            <div>{group.groupName}</div>
            {group.hasInnerGroup &&
              group.rows.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <div>{row.groupName}</div>
                  {this.renderFormItem(row, rowIndex)}
                </React.Fragment>
              ))}
          </React.Fragment>
        ))}
        <Form.Item {...tailFormItemLayout}>
          {btns.map((btn) => {
            let element;
            if(btn.name === 'submit'){
              element = <Button type="primary" onClick={() => this.handleSubmit('submit')}>
                {btn.text}
              </Button>;
            }else if(btn.name === 'save'){
              element =  <Button
                type="primary"
                style={{ marginLeft: '20px' }}
                onClick={() => this.handleSubmit('save')}
              >草稿
              </Button>;
            }else if(btn.name === 'close'){
              element =  <Button
                type="primary"
                style={{ marginLeft: '20px' }}
                onClick={btn.onClick}
              >关闭
              </Button>;
            }
            return element;
          })}
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create({ name: 'GroupForm' })(GroupForm);
