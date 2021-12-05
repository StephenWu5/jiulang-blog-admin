import React from 'react';
import { Form, message, Card } from 'antd';
import { get } from 'lodash';

import { dispatchArticle, updateArticle, queryTags } from '../../utils/urls';
import http from '../../utils/http';
import GroupForm from '../../components/GroupForm';
import { getFields } from './config.js';

// 发布文章
class Dispatch extends React.Component {
    state = {
        tagsEnums: [], // 标签下拉值,
        formData: {} //表单详情值,
    };
    componentDidMount() {
        const mode = get(this.props.location.query, 'mode', undefined);
        this.mode = mode === undefined ? 'Add' : mode;
        this.fetchTagData();
        // 表单字段初始化
        if (this.mode === 'Edit' || this.mode === 'View') {
            let { title, content, tags } = this.props.location.query;
            this.setState({
                formData: {
                    title,
                    content,
                    tags
                }
            });
        }
    }
    // 默认新增编辑模式
    mode = 'Add';
    // 其他配置
    otherConfig = {
        tagsEnums: []
    };
    // 按钮列表
    btns = [
        {
            name: 'submit',
            text: this.mode === 'Edit' ? '更新' : '发文'
        },
        {
            name: 'save',
            text: '草稿'
        }
    ]
    // 发文提交
    handleSubmit = async (action, values) => {
        let param = this.getParams(action);
        let params =
            this.mode === 'Add'
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
            this.mode === 'Add'
                ? dispatchArticle
                : updateArticle;
        const res = await http.post(url, params);
        const { code, message: messageText } = res;
        if (code === 200) {
            //发文成功
            message.success(messageText);
            this.props.history.push({ pathname: '/index/Article' });
        } else if (code === 400) {
            message.info(messageText);
        } else {
            message.info(messageText);
        }
    };
    // 拼接参数 status
    getParams(action) {
        // 拼接草稿状态字段
        let status = action === 'submit' ? 1 : 0;
        return {
            status
        };
    }
    /**
     * 获取标签下拉值
     */
    async fetchTagData() {
        const res = await http.post(queryTags);
        const { code, message: messageText } = res;
        if (code === 200) {
            this.otherConfig.tagsEnums = res.data;
            this.setState({
                tagsEnums: this.otherConfig.tagsEnums
            });
        } else if (code === 400) {
            message.info(messageText);
        } else {
            message.info(messageText);
        }
    }
    /**
     * 渲染函数
     */
    render() {
        const { formData } = this.state;
        return (
            <div className="dispatch-wrapper">
                <Card>
                    <GroupForm
                        fields={getFields(this.otherConfig)}
                        handleSubmit={this.handleSubmit}
                        formData={formData}
                        btns={this.btns}
                        mode={this.mode}
                    />
                </Card>
            </div>
        );
    }
}
export default Form.create({ name: 'normal_dispatch' })(Dispatch);
