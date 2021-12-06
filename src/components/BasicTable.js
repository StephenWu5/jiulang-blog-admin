import React from 'react';
import { Table } from 'antd';
/**
 * 通用组件--表格封装
 */
class BasicTable extends React.PureComponent {
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
        const { columns, tableData, scrollY = 650 } = this.props;
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
                    rowKey={(record, index) =>  record.id || index}
                    scroll={{y: scrollY}}
                />
            </div>
        );
    }
}

export default BasicTable;
