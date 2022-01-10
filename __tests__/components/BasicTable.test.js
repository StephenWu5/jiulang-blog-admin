import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { Table, Pagination } from 'antd';
import * as defaultSettingsUtil from '../../src/utils/defaultSettingsUtil';
import BasicTable from '../../src/components/BasicTable';

/* 测试 UI 组件 BasicTable */
describe('BasicTable component', () => {

    const defaultProps = {
        loading: false,
        pagination: Object.assign({}, {
            current: 1,
            pageSize: 15,
            total: 20
        }, defaultSettingsUtil.pagination),
        query: sinon.fake(),

        columns: [{
            title: '作者',
            dataIndex: 'author',
            key: 'author'
        }],
        tableData: [{ id: 1 }, { id: 2 }]
    };
    let defaultWrapper;

    beforeEach(() => {
        defaultWrapper = mount(<BasicTable {...defaultProps} />);
    });

    afterEach(() => {
        defaultProps.query.resetHistory();
    });

    /* 测试是否渲染了正确的功能子组件 */
    test('should render table and pagination', () => {
        /* 是否渲染了 Table 组件 */
        expect(defaultWrapper.find(Table).exists()).toBe(true);
        /* 是否渲染了 分页器 组件，样式是否正确（mini） */
        expect(defaultWrapper.find('.ant-pagination.mini').exists()).toBe(true);
    });

    /* 测试首次加载时数据列表为空是否发起加载数据请求 */
    test('when componentDidMount and tableData is empty, should query', () => {
        sinon.spy(BasicTable.prototype, 'componentDidMount');
        // 这里还有问题
        // sinon.stub(BasicTable.prototype, 'calcRect');
        const props = Object.assign({}, defaultProps, {
            pagination: Object.assign({}, {
                current: 1,
                pageSize: 15,
                total: 0
            }, defaultSettingsUtil.pagination),
            tableData: []
        });
        const wrapper = mount(<BasicTable {...props} />);

        expect(BasicTable.prototype.componentDidMount.calledOnce).toBe(true);
        expect(BasicTable.prototype.calcRect.calledOnce).toBe(true);
        BasicTable.prototype.componentDidMount.restore();
    });

    /* 测试 table 翻页后是否正确触发 */
    test('when change pagination of table, should updateParams', () => {
        const pagination = defaultWrapper.find(Pagination);
        pagination.props().onChange(2);
        expect(defaultProps.query.lastCall.args[0])
            .toEqual({ current: 2, pageSize: 15 });
    });
});