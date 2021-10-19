//let serverName  = 'dev'; // 本地环境
let serverName  = 'testing'; // 测试环境
//let serverName  = 'prod'; // 开发环境

// 动态改变URL前边部分
export function getUrlPrev(serverName) {
  if(serverName === 'dev'){
    return '/mock';
  }else {
    return '';
  }

}

// 查询文章
export let queryArticle = getUrlPrev(serverName) + '/api/articles/query';