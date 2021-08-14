import React, { Component } from "react";
import { Table, Divider, Tag, Button, message } from "antd";
import http from '@/server.js';

// 表格列头的配置
const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "阅读数",
    dataIndex: "readingNumber",
    key: "readingNumber",
  },
  {
    title: "评论数",
    dataIndex: "commentsNumber",
    key: "commentsNumber",
  },
  {
    title: "发表时间",
    dataIndex: "create_time",
    key: "create_time",
  },
  {
    title: "发布状态",
    dataIndex: "status",
    key: "status",
    render: (text) => <a>{text === '1' ? '已发布' : '草稿'}</a>,
  },
  {
    title: "操作",
    key: "action",
    render: (text, record) => (
      <span>
        <Button type="primary">编辑</Button>
        <Divider type="vertical" />
        <Button type="primary">删除</Button>
        <Divider type="vertical" />
        <Button type="primary">查看</Button>
      </span>
    ),
  },
];

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    }
    this.queryArticle = this.queryArticle.bind(this);
  }

  componentDidMount() {
    this.queryArticle();
  }

  queryArticle = async () => {
    let returnObj = await http.post("/api/articles/query");
    if (returnObj.code === 200) {
      // 查询文章成功
      message.success(returnObj.message);
      this.setState({
        tableData: returnObj.data,
      });
    } else if (returnObj.code === 400) {
      message.info(returnObj.message);
    } else {
      message.info(returnObj.message);
    }
  };

  render() {
    return (
      <div>
        <Table columns={columns} dataSource={this.state.tableData} />
      </div>
    );
  }
}

export default Article;
