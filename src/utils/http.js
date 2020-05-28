import axios from 'axios';
import { cui } from 'components';
import sha256 from 'crypto-js/sha256';

function handleHttpError(error) {
  if (error.response && error.response.data) {
    return error.response.data.errorMessage || error;
  }

  return error;
}

function serialize(obj) {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    } 
  }
  return str.join('&');
}

function transformConfig(config) {
  const copyConfig = cui.copy(config);
  delete copyConfig.headers;
  
  const body = serialize(copyConfig);
  const secureCode = 'ZCUvpv3TvbTkUDs2';
  const requestTime = Date.now();
  const md5Hex = require('md5-hex');
  const channel = config.headers && config.headers.channel ? `!${config.headers.channel}` : '';

  const authorization = sha256(md5Hex(`${body}#${secureCode}@${requestTime}${channel}`).toLowerCase()).toString().toLowerCase();

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    RequestTime: requestTime,
    Authorization: authorization,
    ...config.headers,
  };

  config.headers = headers;
  return config;
}

function makeHttpRequest(apiCall, successCallBack, failCallBack, transformFunc) {
  return new Promise(async () => {
    try {
      const response = await apiCall();
      const responseData = response.data;
      const successResponse = cui.isFunction(transformFunc) ? transformFunc(responseData) : responseData;
      successCallBack(successResponse);
    } catch (e) {
      if (cui.isFunction(failCallBack)) {
        failCallBack(handleHttpError(e));
      }
    }
  });
}

export function getRequest(url, data, config = {}, successCallBack, failCallBack, transformFunc) {
  transformConfig(config);
  return makeHttpRequest(() => axios.get(url, data, config), successCallBack, failCallBack, transformFunc);
}

export function postRequest(url, data, config = {}, successCallBack, failCallBack, transformFunc) {
  transformConfig(config);
  return makeHttpRequest(() => axios.post(url, data, config), successCallBack, failCallBack, transformFunc);
}

export function putRequest(url, data, config = {}, successCallBack, failCallBack) {
  transformConfig(config);
  return makeHttpRequest(() => axios.put(url, data, config), successCallBack, failCallBack);
}

export function deleteRequest(url, data, config = {}, successCallBack, failCallBack) {
  transformConfig(config);
  return makeHttpRequest(() => axios.delete(url, data, config), successCallBack, failCallBack);
}
