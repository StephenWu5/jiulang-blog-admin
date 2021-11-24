let serverName = 'dev'; // 本地环境
//let serverName = 'testing'; // 测试环境
//let serverName  = 'prod'; // 开发环境

// 动态改变URL前边部分
export function getUrlPrev(serverName) {
    if (serverName === 'dev') {
        return '/mock';
    } else {
        return '';
    }
}

// 登录模块
export let login = getUrlPrev(serverName) + '/api/login';
export let register = getUrlPrev(serverName) + '/api/register';

// 查询文章
export let queryArticle = getUrlPrev(serverName) + '/api/articles/query';
export let deleteArticle = getUrlPrev(serverName) + '/api/articles/delete';
export let dispatchArticle = getUrlPrev(serverName) + '/api/articles/dispatch';
export let updateArticle = getUrlPrev(serverName) + '/api/articles/update';

// 查询文章
export let queryTags = getUrlPrev(serverName) + '/api/tags/query';
export let createTags = getUrlPrev(serverName) + '/api/tags/create';
export let deleteTags = getUrlPrev(serverName) + '/api/tags/delete';
