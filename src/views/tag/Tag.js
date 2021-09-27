/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import { Table, Divider, Button, message, Modal } from 'antd';
import http from '@/server.js';
class MyTag extends React.Component {
  state = {
    visible: false,
    columns: [
      {
        title: '标签名',
        dataIndex: 'tagName',
        key: 'tagName',
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
  deleteOne() {}
  handleOk() {}
  handleCancel() {}
  render() {
    let { columns, tableData, visible } = this.state;
    return (
      <div>
        <Table columns={columns} dataSource={tableData} />
        <Modal
          title="删除框"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>确定删除吗？</p>
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
