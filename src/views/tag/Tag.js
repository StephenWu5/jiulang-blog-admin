/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import { Table, Divider, Button, message, Modal } from 'antd';
export default function MyTag() {
  const [visible, setVisible] = useState(false); // 表格数据
  function deleteOne() {
    setVisible(true);
    console.log(1211);
  }
  function handleOk() {
    console.log(1211);
  }
  function handleCancel() {
    setVisible(false);
    console.log(1211);
  }
  const [columns, setColumns] = useState([
    {
      title: '标签名',
      dataIndex: 'tagName',
      key: 'tagName',
      // eslint-disable-next-line react/no-multi-comp
      render: (text) => <a>{text}</a>
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="danger" size="small" onClick={() => deleteOne(record)}>
            删除
          </Button>
        </span>
      )
    }
  ]); // 列头
  const [tableData, setTableData] = useState([
    {
      tagName: '121'
    }
  ]); // 表格数据

  return (
    <div>
      <Table columns={columns} dataSource={tableData} />
      <Modal
        title="删除框"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>确定删除吗？</p>
      </Modal>
    </div>
  );
}
