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
    const { form, formData = {}, mode } = this.props;
    const { getFieldDecorator } = form;
    const readOnly = mode === 'View';
    const {
      fieldLabel,
      fieldName,
      required,
      initValue,
      fieldType,
      placeholder,
      enums,
      initStyle,
      prefix
    } = field;
    let element;
    if (fieldType === 'INPUT') {
      // 输入框
      element = <Input placeholder={placeholder} prefix={prefix} readOnly={readOnly}/>;
    } else if (fieldType === 'TEXTAREA') {
      // 文本域
      element = <TextArea placeholder={placeholder} rows={initStyle.rows}  readOnly={readOnly}/>;
    } else if (fieldType === 'SELECT') {
      // 下拉框
      element = (
        <Select placeholder={placeholder} disabled={readOnly}>
          {enums.map((item) => (
            <Option value={item.name} key={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      );
    } else {
      // 其他
      element = <Input disabled placeholder={'暂时不支持开发'} />;
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
        handleSubmit(action, values);
      }
    });
  }
  render() {
    const { fields, btns, mode } = this.props;
    const readOnly = mode === 'View';
    return (
      <Form className="dispatch-form" {...formItemLayout}>
        {fields.map((group, index) => (
          <React.Fragment key={index}>
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
          {btns.map((btn, index) => {
            let element;
            // form表单提交函数
            let fn = (event) => {
              console.log(event, 'ev');
              event.preventDefault();
              event.stopPropagation();
              this.handleSubmit(btn.name);
            };
            element = (
              <Button
                type="primary"
                key={index}
                onClick={btn.onClick || fn}
                style={{ marginLeft: index === 0 ? 0 : 20 }}
                disabled={readOnly}
              >
                {btn.text}
              </Button>
            );
            return element;
          })}
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create({ name: 'GroupForm' })(GroupForm);
