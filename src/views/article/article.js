import React, { Component } from "react";
import { Table, Divider, Tag, Button } from "antd";

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
    dataIndex: "time",
    key: "time",
  },
  {
    title: "发布状态",
    dataIndex: "status",
    key: "status",
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

const data = [
  {
    title: "标题",
    status: "发布状态",
    time: "发表时间",
    commentsNumber: "评论数",
    readingNumber: "阅读数",
    author: "作者",
    action:"操作",
  },
];


class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default Article;
