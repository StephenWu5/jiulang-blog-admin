// 发布文章
import React from 'react';
import { Form, Input, Button, Select, message, Card } from 'antd';
import styles from './Dispatch.module.css';
import http from '@/server.js';

import  GroupForm from '../../components/GroupForm';

class Dispatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.location.query === undefined ? 'Add' : 'Edit', // 新增编辑模式
      tagList: [
        {
          name: '前端'
        }
      ] // 标签列表
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getParams = this.getParams.bind(this);
  }

  componentDidMount() {
    // 表单字段初始化
    if (this.state.mode === 'Edit') {
      let { title, content } = this.props.location.query;
      this.props.form.setFieldsValue({
        title,
        content
      });
    }
    this.fetchTagData();
  }

  // 发文提交
  handleSubmit = (type) => {
    let param = this.getParams(type);
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let params =
          this.state.mode === 'Add'
            ? {
              ...param,
              ...values
            }
            : {
              ...this.props.location.query,
              ...param,
              ...values
            };
        let url =
          this.state.mode === 'Add'
            ? '/api/articles/dispatch'
            : '/api/articles/update';
        let returnObj = await http.post(url, params);
        if (returnObj.code === 200) {
          //发文成功
          message.success(returnObj.message);
          this.props.history.push({ pathname: '/index/Article' });
        } else if (returnObj.code === 400) {
          message.info(returnObj.message);
        } else {
          message.info(returnObj.message);
        }
      }
    });
  };

  // 拼接参数
  getParams(type) {
    // 拼接草稿状态字段
    let status = type === 'submit' ? 1 : 0;
    return {
      status
    };
  }

  /**
   * 获取标签数据
   */
  async fetchTagData() {
    let url = '/api/tags/query';
    let returnObj = await http.post(url);
    if (returnObj.code === 200) {
      this.setState({
        tagList: returnObj.data
      });
    } else if (returnObj.code === 400) {
      message.info(returnObj.message);
    } else {
      message.info(returnObj.message);
    }
  }

  getFields(){
    let fields = [{
      groupLabel: '',
      groupName: '基本信息',
      groupSeq: '0',
      groupType: '',
      hasInnerGroup: true,
      rows: [
        {
          feildName: 'title',
          feildLabel: '',
          initValue: '',
          required: '',
          enums: ''
        },
        {
          feildName: 'content',
          feildLabel: '',
          initValue: '',
          required: '',
          enums: ''
        },
        {
          feildName: 'tags',
          feildLabel: '',
          initValue: '',
          required: '',
          enums: ''
        }
      ]
    }];
    return fields;
  }

  render() {
    const { tagList } = this.state;
    const tagDefaultValue = tagList.length !== 0 ? tagList[0].name : ''; // 默认第一个
    return (
      <div className="dispatch-wrapper">
        <Card>
          <GroupForm
            fields={this.getFields()}
          />
        </Card>
      </div>
    );
  }
}

export default Form.create({ name: 'normal_dispatch' })(Dispatch);
