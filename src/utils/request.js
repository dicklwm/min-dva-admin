import fetch from 'dva/fetch';
import { hashHistory } from 'dva/router';
import { notification } from 'antd';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 500) {
    console.error('服务端接口报错', response.url, `报错说明：${response.statusText}`);
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * 检查errorCode错误码的中间件
 * 1.如果接口报错代码为9000，则跳转到login，跳转到login后，监听路由的App的model会处理logout的状态
 * 2.如果接口报错代码不是0，则弹出请求失败窗口
 * @param data 请求的数据
 * @returns {*}
 */

function checkErrorCode(data) {
  if (data.errorCode === 9000 || data.errorCode === 999) {
    hashHistory.push('/login');
    throw new Error(`${data.msg}`);
  } else if (data.errorCode !== 0) {
    notification.error({ message: '请求失败', description: `报错信息：${data.msg}`, duration: 5.5 });
    throw new Error(`请求失败：${data.msg}`);
  }

  return data;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => checkErrorCode(data))
    .catch(err => ({ err }));
}
