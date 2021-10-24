import React from 'react';
import { Button, message, Modal } from 'antd';
import http from '../../utils/http';
import AddTag from './AddTag';
import styles from './Tag.module.css';
import BasicTable from '../../components/BasicTable';
import { queryTags, deleteTags } from '../../utils/urls';
class MyTag extends React.Component {
  state = {
    visible: false,
    tag: {},
    AddTagVisible: false,
    pagination: { // 分页信息
      pageSize: 10,
      current: 1,
      total: 0
    },
    tableData: []
  };
  componentDidMount() {
    this.fetchData();
  }
  columns = [
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
  ];
  async deleteOne(record) {
    this.setState({
      visible: true,
      tag: record
    });
  }
  async handleOk() {
    let { tag } = this.state;
    let returnObj = await http.post(deleteTags, { id: tag.id });
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
  };
  /**
   * 获取表格数据
   */
  async fetchData() {
    let returnObj = await http.post(queryTags);
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
    let { tableData, visible, AddTagVisible, tag, pagination } = this.state;
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
        <BasicTable
          columns={this.columns}
          tableData={tableData}
          query={this.fetchData}
          pagination={pagination}
        ></BasicTable>
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
