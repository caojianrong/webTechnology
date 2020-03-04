import {message} from '@wocloud/design';
import axios from "axios";
// import cloneDeep from 'clone-deep';

export const success = (msg) => {
  message.success({content: msg, duration: 3});
};

export const Error = (msg) => {
  message.error({content: msg, duration: 3});
};

export const Warning = (msg) => {
  message.warning({content: msg, duration: 3});
};

export const Info = (msg) => {
  // message.info({content: msg, duration: 3});
}
/**
 * 数据返回统一处理函数
 * @param {*} response
 * @param {*} successMsg 成功提示
 */
export const processData = (response, successMsg) => {
  let result={};
  try {
    // if (typeof response != 'object') {
    //     Error('数据返回出错：1、请确保服务运行正常；2、请确保您的前端工程代理服务正常；3、请确认您已在本地登录过应用平台');
    //     // throw new Error('数据返回出错：1、请确保服务运行正常；2、请确保您的前端工程代理服务正常；3、请确认您已在本地登录过应用平台')
    //     return {result:null};
    // }
    if (response.status == '401') {
      Error(`错误:${(response.data.msg)}`);
      // throw new Error(`错误:${(response.data.msg)}`);
      return {result:null};
    }
    if (response.status == '200') {
      let data = response.data;
      let repMsg = data.success;
      if (repMsg) {
        if (successMsg) {
          success(successMsg);
        }else if(data.message){
          success(data.message);
        }
        result.status = repMsg;
        // 删除成功没有 data 值
        result.data = data.detailMsg.data || {};
        return {result};
      } else if (repMsg == 'fail_field') {
        Error(`错误:${(data && data.detailMsg && convert(data.detailMsg.msg)) || '数据返回出错'}`);
        // throw new Error(`错误:${(data && data.detailMsg && convert(data.detailMsg.msg)) || '数据返回出错'}`)
        return {result:null};
      } else {
        Error(`错误:${convert(data.errorMessage)}`);
        // throw new Error(`错误:${convert(data.message)}`);
        return {result:null};
      }
    } else {
      Error('请求错误');
      return {result:null};
      // throw new Error(`错误:${(response.status)}`);
    }
  } catch (e) {
    return {result};
  }
}

/**
 * param拼接到url地址上
 * @param {*} url
 * @param {*} params
 * @param {*} prefix
 */
export const paramToUrl = (url, params, prefix) => {
  if (!prefix) prefix = '';
  if (url.indexOf('?') == -1) {
    url += '?r=' + Math.random();
  }
  for (let attr in params) {
    if ((attr == 'pageIndex') || (attr == 'pageSize')) {
      url += '&' + attr + '=' + params[attr];
    } else {
      url += '&' + prefix + attr + '=' + params[attr];
    }
  }
  return url;
}

/**
 * json转换指定的前缀
 * @param {JSON} json
 * @param {JSON} prefix
 */
export const jsonToUrl = (json, prefix = "search_") => {
  let obj = {};
  for (let attr in json) {
    if ((attr == 'pageIndex') || (attr == 'pageSize')) {
      obj[`${attr}`] = json[attr];
    } else {
      obj[`${prefix}${attr}`] = json[attr];
    }
  }
  return obj;
}

// 后台乱码转换
export const convert = (text) => {
  let element = document.createElement("p");
  element.innerHTML = text;
  let output = element.innerText || element.textContent;
  element = null;
  return output;
}

export const setCookie = (name, value, options) => {

  options = options || {};
  if (value === null) {
    value = '';
    options.expires = -1;
  }
  let expires = '';
  if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
    let date;
    if (typeof options.expires == 'number') {
      date = new Date();
      date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
    } else {
      date = options.expires;
    }
    expires = '; expires=' + date.toUTCString();
  }
  let path = options.path ? '; path=' + options.path : '';
  let domain = options.domain ? '; domain=' + options.domain : '';
  let s = [cookie, expires, path, domain, secure].join('');
  let secure = options.secure ? '; secure' : '';
  let c = [name, '=', encodeURIComponent(value)].join('');
  let cookie = [c, expires, path, domain, secure].join('')
  document.cookie = cookie;

}

export const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie != '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  // 调整为下划线
  // if (typeof cookieValue != 'undefined' && cookieValue != null) {
  //     cookieValue = cookieValue.replace(/-/, "_");
  // }
  return cookieValue;
}


/**
 * 生成唯一字符串
 */
export function uuid() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = '-';
  s[13] = '-';
  s[18] = '-';
  s[23] = '-';
  return s.join('');
}


/**
 * 导出excel 后端导出，通过post方式
 *
 */
// export function exportExcelPost(url, data) {
//   axios({
//     method: 'post',
//     url: url,
//     data: data,
//     responseType: 'blob'
//   }).then((res) => {
//     const content = res.data;
//     const blob = new Blob([content]);
//     const fileName = "导出数据.xls";
//     const selfURL = window[window.webkitURL ? 'webkitURL' : 'URL'];
//     let elink = document.createElement('a');
//     if ('download' in elink) {
//       elink.download = fileName;
//       elink.style.display = 'none';
//       elink.href = selfURL['createObjectURL'](blob);
//       document.body.appendChild(elink);
//
//       // 触发链接
//       elink.click();
//       selfURL.revokeObjectURL(elink.href);
//       document.body.removeChild(elink)
//     } else {
//       navigator.msSaveBlob(blob, fileName);
//     }
//   })
// }

// 深度拷贝
// export function deepClone(data) {
//   return cloneDeep(data);
// }

/**
 * 深度 obj 合并
 * const a = {a: 1, b: 2, c: 3, d: {key: 2, value: 4}, e: [1, 2, 3]};
 * const b = {a: 3, d: {key:4}, e: [4, 5]};
 * 1. 如果值为{},则覆盖
 * 2. 如果数组全覆盖
 * 3 否则深度
 * @param def
 * @param obj
 * @returns {*}
 */
export function deepAssign(preData, nextData) {
  for (const preKey in preData) {
    const preChildrenKeys = Object.keys(preData[preKey]);
    let nextChildrenKeys = 0;
    if (nextData[preKey] && !Array.isArray(preData[preKey])) {
      nextChildrenKeys = Object.keys(nextData[preKey]);
    }
    if (preChildrenKeys.length > 0 && nextChildrenKeys.length > 0) {
      deepAssign(preData[preKey], nextData[preKey]);
    } else {
      const tempNextValue = nextData[preKey];
      if (tempNextValue !== undefined) {
        preData[preKey] = tempNextValue;
      }
    }
  }
  return preData;
}

/**
 * 对请求回来带有分页的数据 解构，拼装
 * @param obj
 * @param param
 * @returns {{list: *, pageIndex: *, totalPages: *, total: *, pageSize: *}}
 */
export function structureObj(obj, param) {
  const {content, number, totalPages, totalElements, size} = obj;
  let {pageSize} = param;
  if (!pageSize) {
    pageSize = size;
  }
  return {
    list: content,
    pageIndex: number + 1,
    totalPages: totalPages,
    total: totalElements,
    pageSize,// 结构请求的pageSize,
  };

}

/**
 * 初始化 state 里的带有分页的 obj
 * @param obj
 * @returns {{list: Array, pageIndex: number, totalPages: number, total: number, pageSize: *}}
 */
export function initStateObj(obj) {
  const {pageSize} = obj;
  return {
    list: [],
    pageIndex: 0,
    totalPages: 0,
    total: 0,
    pageSize,
  };
}

// export function clearTrimObj(data) {
//   for (const key in data) {
//     const keys = Object.keys(data[key]);
//     if (keys.length > 0) {
//       if (Array.isArray(data[key])) {
//         for (const [index, ele] of data[key].entries()) {
//           if (typeof ele === 'object') {
//             clearTrimObj(ele);
//           } else {
//             data[key][index] = ele.trim();
//           }
//         }
//       } else {
//         clearTrimObj(data[key]);
//       }
//
//     } else {
//       data[key] = data[key].trim();
//     }
//   }
//   return data;
// }


/**
 * 获得按钮切换状态
 * @param {string} action 按钮类型
 * @param {string} status 按钮状态
 * @returns Object
 */
export function getButtonStatus(action, status) {
  let enabledObj = {};
  switch (status) {
    case 'view':
      enabledObj = {
        add: false,
        edit: false,
        del: false,
        save: true,
        cancel: true
      }
      return enabledObj[action];
    case 'new':
      enabledObj = {
        add: false,
        edit: true,
        del: true,
        save: false,
        cancel: false
      }
      return enabledObj[action];
    case 'edit':
      enabledObj = {
        add: true,
        edit: true,
        del: true,
        save: false,
        cancel: false
      }
      return enabledObj[action];
    default:
      break;
  }
}


/**
 * 过滤脏数据按照|分割的字段
 *
 * @param {object} data
 * @returns
 */
export function filterDataParam(data) {
  let keys = Object.keys(data);
  let values = Object.values(data);
  let arr = [];
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].indexOf('|') > -1) {
      let _key = keys[i].split('|')[0];//字段
      let _index = keys[i].split('|')[1];//当前对象索引
      let _value = values[i];//值
      if (typeof arr[_index] != 'object') {
        arr[_index] = {};
      }
      arr[_index][_key] = _value;
    }
  }
  return arr;
}

/**
 * 删除指定的key数据
 * @param {array} keyData - 选择的数组对象包含key
 * @param {array} res - 系统默认的list数据
 * @returns {array} - 处理后的数组对象数据，用于表数据
 */
export function delArrayByKey(keyData, res) {
  for (let keyItem of keyData) {
    for (let [index, ele] of res.entries()) {
      if (keyItem.key === ele.key) {
        res.splice(index, 1);
        break
      }
    }
  }
  return res;
}


/** 将新数组对象与旧数组相同对象删除
 * @param {array} arrayOld 旧数组对象
 * @param {array} arrayNew 新数组对象
 * @param {string} key  关联字段
 */
export function delListObj(arrayOld, arrayNew, key) {
  if (arrayNew.length === 0) { // 如果新数组为空 直接返回
    return arrayOld;
  }
  for (const eleNew of arrayNew) { // 将新数组对象与旧数组对象合并
    for (const [indexOld, eleOld] of arrayOld.entries()) { //
      if (eleOld[key] === eleNew[key]) {
        arrayOld.splice(indexOld, 1);
        break;
      }
    }
  }
  return arrayOld;

}


/** 将新数组对象与旧数组对象合并
 * @param {array} arrayOld 旧数组对象
 * @param {array} arrayNew 新数组对象
 * @param {string} key  关联字段
 */
export function mergeListObj(arrayOld, arrayNew, key) {
  if (arrayOld.length === 0) { // 如果old数组为空 直接返回
    return arrayNew;
  }
  for (const eleNew of arrayNew) { // 将新数组对象与旧数组对象合并
    let isHas = true;
    for (const [indexOld, eleOld] of arrayOld.entries()) { //
      if (eleOld[key] == eleNew[key]) {
        arrayOld[indexOld] = eleNew;
        isHas = false;
        break;
      }
    }
    if (isHas) {  // 旧数组没有找到
      arrayOld.push(eleNew);
    }

  }
  return arrayOld;
}


/**
 * @description 根据页面视口区域高度计算表格高度，以确定什么时候出滚动条
 * @returns {Number} height表格内容区高度
 */
export function getHeight() {
  let clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight),
    scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  let showHeight = (clientHeight < scrollHeight) && clientHeight || scrollHeight;
  return showHeight;
}

/**
 *@description 获取分页数据
 *
 * @param {*} value
 * @param {*} type type为0标识为pageIndex,为1标识pageSize
 */
export function getPageParam(value, type, pageParams) {
  let {pageIndex, pageSize} = pageParams;
  if (type === 0) {
    pageIndex = value - 1;
  } else {
    pageSize = value.toLowerCase() !== 'all' && value || 1;
    pageIndex = 0;
  }
  return {pageIndex, pageSize}
}

function isString(str){
  return (typeof str=='string')&&str.constructor==String;
}


/**
 *@description 处理form的 validateFields 返回空格问题。
 * @param {*} 数据源
 */
export function getValidateFieldsTrim(values) {
  for (const key in values) {
    if (values.hasOwnProperty(key)) {
      const element = values[key];
      if(isString(element)){
        values[key] = (values[key]).trim();
      }
    }
  }
  return values;
}
