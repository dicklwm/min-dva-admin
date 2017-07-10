import request from './request';
import { parseParam } from './func';
// API的前缀
const apiPrefix = '';

const makeService = (url,
  method = 'GET',
  credentials = 'include',
  headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                     ) => {
  return async function (params) {
    if (method === 'GET') {
      return request(params ? `${url}?${parseParam(params)}` : url, {
        method,
        credentials,
        headers,
      });
    } else {
      return request(url, {
        method,
        credentials,
        headers,
        body: parseParam(params),
      });
    }
  };
};

module.exports = {
  apiPrefix,
  makeService,
  index: {
    login: `${apiPrefix}/login`,
    logout: `${apiPrefix}/logout`,
  },
  
};
