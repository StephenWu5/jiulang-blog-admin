import React from 'react';
import { Divider, Button, message, Modal } from 'antd';

import http from '../../utils/http';
import { queryArticle, deleteArticle } from '../../utils/urls';
import BasicTable from '../../components/BasicTable';

// 文章组件
class Article extends React.PureComponent {
    state = {
        tableData: [],
        visible: false,
        deleteId: null, // 待删除项Id
        deleteTitle: '', // 删除名称
        pagination: {
            // 分页信息
            pageSize: 10,
            current: 1,
            total: 0
        }
    };
    // 表格列头的配置
    columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author'
        },
        {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags'
        },
        {
            title: '阅读数',
            dataIndex: 'readingNumber',
            key: 'readingNumber'
        },
        {
            title: '评论数',
            dataIndex: 'commentsNumber',
            key: 'commentsNumber'
        },
        {
            title: '发表时间',
            dataIndex: 'create_time',
            key: 'create_time'
        },
        {
            title: '发布状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <a>{text === '1' ? '已发布' : '草稿'}</a>
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => this.handleEditPage(record, 'Edit')}
                    >
                        编辑
                    </Button>
                    <Divider type="vertical" />
                    <Button
                        type="danger"
                        size="small"
                        onClick={() => this.handleDelete(record)}
                    >
                        删除
                    </Button>
                    <Divider type="vertical" />
                    <Button
                        type="dashed"
                        size="small"
                        onClick={() => this.handleEditPage(record, 'View')}
                    >
                        查看
                    </Button>
                </span>
            )
        }
    ];

    componentDidMount() {
        const { pagination } = this.state;
        this.queryArticle(pagination);
    }

    // 查询列表
    queryArticle = async (params) => {
        const { code, message: messageText, data, pageSize, current, total } = await http.post(queryArticle, params);
        if (code === 200) {
            const pagination = {
                // 分页信息
                pageSize,
                current,
                total
            };
            // 查询文章成功
            this.setState({
                tableData: data,
                pagination
            });
        } else if (code === 400) {
            message.info(messageText);
        } else {
            message.info(messageText);
        }
    };

    handleEditPage(record, mode) {
        this.props.history.push({ pathname: '/index/Dispatch', query: { ...record, mode } });
    }

    handleDelete(record) {
        this.setState({
            visible: true,
            deleteId: record.id,
            deleteTitle: record.title
        });
    }

    handleOk = async () => {
        const { pagination } = this.state;
        const param = { id: this.state.deleteId };
        const res = await http.post(deleteArticle, param);
        const { code, message: messageText } = res;
        if (code === 200) {
            // 删除文章成功
            message.success(messageText);
            this.queryArticle(pagination);
            this.handleCancel();
        } else if (code === 400) {
            message.info(messageText);
        } else {
            message.info(messageText);
        }
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            deleteTitle: ''
        });
    }

    render() {
        const { deleteTitle, tableData, pagination, visible } = this.state;
        return (
            <div>
                <BasicTable
                    columns={this.columns}
                    tableData={tableData}
                    query={this.queryArticle}
                    pagination={pagination}
                ></BasicTable>
                <Modal
                    title="删除框"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>确定删除【{deleteTitle}】吗？</p>
                </Modal>
            </div>
        );
    }
}

export default Article;
