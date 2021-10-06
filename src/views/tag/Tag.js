/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import { Table, Divider, Button, message, Modal } from 'antd';
import http from '@/server.js';
import AddTag from './AddTag';
import styles from './Tag.module.css';
class MyTag extends React.Component {
  state = {
    visible: false,
    tag: {},
    AddTagVisible: false,
    columns: [
      {
        title: '标签名',
        dataIndex: 'name',
        key: 'name',
        // eslint-disable-next-line arrow-parens
        render: text => <a>{text}</a>
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button
              type="danger"
              size="small"
              onClick={() => this.deleteOne(record)}
            >
              删除
            </Button>
          </span>
        )
      }
    ],
    tableData: [
      {
        tagName: '121'
      }
    ]
  };
  componentDidMount() {
    this.fetchData();
  }
  async deleteOne(record) {
    this.setState({
      visible: true,
      tag: record
    });
  }
  async handleOk() {
    let { tag } = this.state;
    let url = '/api/tags/delete';
    let returnObj = await http.post(url, { id: tag.id });
    if (returnObj.code === 200) {
      message.success(returnObj.message);
      this.setState({
        visible: false
      });
      this.fetchData();
    } else if (returnObj.code === 400) {
      message.info(returnObj.message);
    } else {
      message.info(returnObj.message);
    }
  }
  handleCancel() {
    this.setState({
      visible: false,
      tag: {} //清空作用
    });
  }
  showAddTag() {
    this.setState({ AddTagVisible: true });
  }
  hideAddTag = (type) => {
    this.setState({ AddTagVisible: false });
    console.log(type, 'type');
    type !== 'addSuccess' && this.fetchData();
    type === 'addSuccess' && this.fetchData();
  }
  // 获取表格数据
  async fetchData() {
    let url = '/api/tags/query';
    let returnObj = await http.post(url);
    if (returnObj.code === 200) {
      this.setState({
        tableData: returnObj.data
      });
    } else if (returnObj.code === 400) {
      message.info(returnObj.message);
    } else {
      message.info(returnObj.message);
    }
  }

  render() {
    let { columns, tableData, visible, AddTagVisible, tag } = this.state;
    return (
      <div>
        <div className={styles.addButtonWrapper}>
          <Button
            type="primary"
            size="default"
            onClick={() => this.showAddTag()}
            className={styles.addButton}
          >
            新增
          </Button>
        </div>
        <Table columns={columns} dataSource={tableData} />
        <AddTag
          visible={AddTagVisible}
          hideAddTag={() => this.hideAddTag()}
        ></AddTag>
        <Modal
          title="删除框"
          visible={visible}
          onOk={() => this.handleOk()}
          onCancel={() => this.handleCancel()}
        >
          <p>
            确定删除【<span>{tag.name}</span>】吗？
          </p>
        </Modal>
      </div>
    );
  }
}
export default MyTag;
// 函数式组件 ，后面重构；
// export default function MyTag1() {
//   const [visible, setVisible] = useState(false); // 表格数据
//   function deleteOne() {
//     setVisible(true);
//   }
//   function handleOk() {}
//   function handleCancel() {
//     setVisible(false);
//   }
//   const [columns, setColumns] = useState([
//     {
//       title: '标签名',
//       dataIndex: 'tagName',
//       key: 'tagName',
//       // eslint-disable-next-line arrow-parens
//       render: text => <a>{text}</a>
//     },
//     {
//       title: '操作',
//       key: 'action',
//       render: (text, record) => (
//         <span>
//           <Button type="danger" size="small" onClick={() => deleteOne(record)}>
//             删除
//           </Button>
//         </span>
//       )
//     }
//   ]); // 列头
//   const [tableData, setTableData] = useState([
//     {
//       tagName: '121'
//     }
//   ]); // 表格数据

//   return (
//     <div>
//       <Table columns={columns} dataSource={tableData} />
//       <Modal
//         title="删除框"
//         visible={visible}
//         onOk={handleOk}
//         onCancel={handleCancel}>
//         <p>确定删除吗？</p>
//       </Modal>
//     </div>
//   );
// }
