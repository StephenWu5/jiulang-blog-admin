import React from 'react';
import { Pagination, Table } from 'antd';
import { debounce } from 'lodash';
/**
 * 通用组件--表格封装
 */
class BasicTable extends React.PureComponent {
    state = {
        height: 0,
        tableData: null
    };
    divCon = React.createRef();
    static getDerivedStateFromProps = (props, state) => {
        if (props.tableData !== state.tableData) {
            let { tableData } = props;
            return {
                tableData //把父组件最新的props.type重新赋值到 子组件state.type
            };
        }
        // 父组件的值没有变化，这里不做任何操作。
        return null;
    }
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
    // table高度自适配的开始
    calcRect = () => {
        const current = this.divCon.current;
        if (current) {
            const rects = current.getBoundingClientRect();
            this.setState({
                height: window.innerHeight - 44 - rects.top
            });
        }
    }
    calcRectDebounce = debounce(this.calcRect, 300);
    componentDidMount() {
        this.calcRect();
        window.addEventListener('resize', this.calcRectDebounce, false);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.calcRectDebounce);
    }
    componentDidUpdate() {
        this.calcRect();
    }
    // table高度自适配的结束
    render() {
        const { columns, tableData } = this.props;
        const { height } = this.state;
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
            <div className="main-table">
                <div className="main-table-div">
                    <div className="scroll-table-wrap table-nowrap" ref={this.divCon} style={{ height: height }}>
                        <Table
                            columns={columns}
                            dataSource={tableData}
                            pagination={false}
                            rowKey={(record, index) => record.id || index}
                        />
                        <Pagination
                            {...pagination}
                            size="small"
                            className="scroll-table-page"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default BasicTable;
