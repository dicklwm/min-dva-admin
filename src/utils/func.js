// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase();
  });
};

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase();
};

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? o[k]
        : (`00${o[k]}`).substr((`${o[k]}`).length));
    }
  }
  return format;
};

/**
 * 将json转为url格式
 * @param param 要转换的数据
 * @param key 可选，前缀
 * @returns {string}
 */
function parseParam(param, key) {
  let paramStr = '';
  if (typeof param === 'string' || typeof param === 'number' || typeof param === 'boolean') {
    paramStr += `&${key}=${encodeURIComponent(param)}`;
  } else {
    for (const v in param) {
      if ({}.hasOwnProperty.call(param, v)) {
        const k = key == null ? v : key + (param instanceof Array ? `[${v}]` : `.${v}`);
        paramStr += `&${parseParam(param[v], k)}`;
      }
    }
  }
  return paramStr.substr(1);
}


function havePermission(module, controller, action) {
  try {
    // 获取当前用户权限
    const user = JSON.parse(sessionStorage.account);
    if (!user) {
      return false;
    }
    const permission = user.permission;
    if (permission == null) {
      // 如果是超级管理员则所有权限都有
      return true;
    }
    if (module && !permission[`${module}`]) {
      // 判断是否有对应的模块权限 如果有则下一步判断
      return false;
    }
    if (controller && !permission[`${module}`][`${controller}`]) {
      // 判断是否有对应的控制器权限
      return false;
    }
    if (action) {
      action = parseInt(action, 1);
    }
    if (action && (permission[`${module}`][`${controller}`] & action) != action) {
      // 判断是否有对应的事件权限
      return false;
    } else if (!action) {
      return permission[`${module}`][`${controller}`] > 1;
    }
    return true;
  } catch (e) {
    // 异常情况说明绝对无权限
    console.log('catch', e);
    return false;
  }
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
function arrayToTree(array, id = 'id', pid = 'pid', children = 'children') {
  const data = array;
  const result = [];
  const hash = {};
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach((item) => {
    const hashVP = hash[item[pid]];
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = []);
      hashVP[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

module.exports = {
  parseParam,
  havePermission,
  arrayToTree,
};
