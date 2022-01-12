import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
// 这两句加在测试文件头部
import axios from 'axios';
import Article from '../../src/views/article/Article';
jest.mock('axios');
// 设置延时
jest.setTimeout(10000);

/* 测试 UI 组件 Article */
describe('Article component', () => {
    test('when componentDidMount and tableData is empty, should query', (done) => {
        const response = {
            status: 200,
            data: {
                code: 200,
                message: 'message',
                data: [{name: 'name'}],
                pageSize: 15,
                current: 1,
                total: 50
            }
        };
        // 模拟第一次接收到的数据
        axios.post.mockResolvedValueOnce(response);
        // 模拟每一次接收到的数据
        axios.post.mockResolvedValue(response);
        sinon.spy(Article.prototype, 'componentDidMount');
        // 对React组件的测试自定义方法
        const wrapper = shallow(<Article />);
        setTimeout(() => {
            // 测试返回数据和react的数据长度是否一致
            expect(wrapper.state().tableData.length).toBe(response.data.data.length);
            Article.prototype.componentDidMount.restore();
            // done写在最后
            done();
        }, 50);
    });
});