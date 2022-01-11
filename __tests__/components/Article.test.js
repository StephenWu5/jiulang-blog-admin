import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import nock from 'nock';
import * as defaultSettingsUtil from '../../src/utils/defaultSettingsUtil';
import Article from '../../src/views/article/Article';
import http from '../../src/utils/http';

import fetch from 'isomorphic-fetch';
import qs from 'querystring';

function FetchError(message, detail) {
    this.name = 'FetchError';
    this.message = message;
    this.detail = detail;
    this.stack = (new Error()).stack;
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;

function resHandlerForJSON(res) {
    if (res.status >= 400) {
        throw new FetchError(
            `fetch error. ${res.status} ${res.statusText}`,
            { status: res.status, statusText: res.statusText }
        );
    } else {
        return res.json();
    }
}

function defaultJSONHandler(json) {
    if (json.success) {
        return json.result;
    } else {
        throw new FetchError(
            `json result status error. ${json.error.message}`,
            {
                code: json.error.code,
                message: json.error.message,
                details: json.error.details
            }
        );
    }
}

const fetcher = {
    getJSON(url, params, customHeaders = undefined, credentials = 'include') {
        const headers = customHeaders ? new Headers(customHeaders) : new Headers();
        headers.append('Accept', 'application/json');
        const reqOpts = { method: 'GET', credentials, headers };
        const req = new Request(params ? `${url}?${qs.stringify(params)}` : url, reqOpts);
        return fetch(req).then(resHandlerForJSON).then(defaultJSONHandler);
    },

    postJSON(url, json = {}, customHeaders = undefined, credentials = 'include') {
        const headers = customHeaders ? new Headers(customHeaders) : new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json;charset=utf-8');
        const reqOpts = { method: 'POST', credentials, headers, body: JSON.stringify(json) };
        const req = new Request(url, reqOpts);
        return fetch(req).then(resHandlerForJSON).then(defaultJSONHandler);
    }
};

/* 测试 getJSON 获得正常数据 */
// test('should get success result', () => {
//     nock('http://some:5000')
//         .get('/test')
//         .reply(200, { success: true, result: 'hello, world' });

//     const result = fetcher.getJSON('http://some:5000/test');
//     console.log(result, 'result');
//     return expect(result).resolves.toMatch(/^hello.+$/);
// });

/* 测试 UI 组件 Article */
describe('Article component', () => {
    test('when componentDidMount and tableData is empty, should query', async () => {
        nock('http://127.0.0.1:5000')
            .get('/mock')
            .reply(200, {
                status: 200, data: {
                    name: 'name'
                }
            });
        const result = await http.get('http://127.0.0.1:5000/mock');
        console.log(result, 'result');
        return expect('result').resolves.toMatch(/^hello.+$/);

        // sinon.spy(Article.prototype, 'componentDidMount');
        // // 对React组件的测试自定义方法
        // const wrapper = mount(<Article />);
        // // wrapper.instance().calcRect(12);
        // Article.prototype.componentDidMount.restore();
    });
});