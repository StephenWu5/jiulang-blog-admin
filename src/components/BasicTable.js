import React from 'react';
import { Table } from 'antd';
/**
 * 通用组件--表格
 */
class BasicTable extends React.Component {
    changePage(current) {
        const { query } = this.props;
        const { pageSize } = this.props.pagination;
        const pagination = {
            pageSize: pageSize,
            current: current
        };
        query(pagination); //向后端发送请求
    }
    onSizeChange(current, size) {
        const { query } = this.props;
        const pagination = {
            pageSize: size,
            current: current
        };
        query(pagination); //向后端发送请求
    }

    render() {
        const { columns, tableData } = this.props;
        const { pageSize, current, total } = this.props.pagination;
        const pagination = {
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '40'],
            onShowSizeChange: (current, size) => this.onSizeChange(current, size),
            pageSize: pageSize,
            current: current,
            total: total,
            showTotal: (total) => `共 ${total} 篇`,
            onChange: (current) => this.changePage(current)
        };
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={pagination}
                    rowKey={(record, index) => index}
                />
            </div>
        );
    }
}

export default BasicTable;
