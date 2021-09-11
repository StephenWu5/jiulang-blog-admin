import React, { Component } from "react";
import { Table, Divider, Tag, Button, message, Modal } from "antd";
import http from "@/server.js";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      visible: false,
      deleteId: null,
      // 表格列头的配置
      columns: [
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
          render: (text) => <a>{text === "1" ? "已发布" : "草稿"}</a>,
        },
        {
          title: "操作",
          key: "action",
          render: (text, record) => (
            <span>
              <Button
                type="primary"
                size="small"
                onClick={() => this.editOne(record)}
              >
                编辑
              </Button>
              <Divider type="vertical" />
              <Button
                type="danger"
                size="small"
                onClick={() => this.deleteOne(record)}
              >
                删除
              </Button>
              <Divider type="vertical" />
              <Button type="dashed" size="small">
                查看
              </Button>
            </span>
          ),
        },
      ],
    };
    this.queryArticle = this.queryArticle.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.queryArticle();
  }

  queryArticle = async () => {
    let returnObj = await http.post("/api/articles/query");
    if (returnObj.code === 200) {
      // 查询文章成功
      //message.success(returnObj.message);
      this.setState({
        tableData: returnObj.data,
      });
    } else if (returnObj.code === 400) {
      message.info(returnObj.message);
    } else {
      message.info(returnObj.message);
    }
  };

  editOne(record) {
    this.props.history.push({ pathname: "/index/Dispatch", query: record });
  }

  deleteOne(record) {
    this.setState({
      visible: true,
      deleteId: record.id,
    });
  }

  async handleOk() {
    let param = { id: this.state.deleteId };
    let returnObj = await http.post("/api/articles/delete", param);
    if (returnObj.code === 200) {
      // 删除文章成功
      message.success(returnObj.message);
      this.queryArticle();
      this.handleCancel();
    } else if (returnObj.code === 400) {
      message.info(returnObj.message);
    } else {
      message.info(returnObj.message);
    }
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Table columns={this.state.columns} dataSource={this.state.tableData} />
        <Modal
          title="删除框"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>确定删除吗？</p>
        </Modal>
      </div>
    );
  }
}

export default Article;
