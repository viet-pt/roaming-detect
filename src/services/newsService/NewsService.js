import { postRequest } from './node_modules/utils/http';
import { BACKEND_API } from './node_modules/global/environment';
import { cui } from './node_modules/components';
import { CommonService } from './node_modules/services/CommonService/CommonService';

const baseURL = BACKEND_API;

const transformCateList = function (response) {
  const cateList = response.data;
  cui.each(cateList, item => {
    item.url = CommonService.changeAlias(item.name);
  });
  return cateList;
};

const convertedTime = function (myDate) {
  const millis = new Date(myDate).getTime();
  const currMillis = new Date().getTime();
  const val = currMillis - millis;
  
  const minute = 60000;
  if (val < minute) {
    return 'Mới đây';
  }

  if (val < 60 * minute) {
    return `${parseInt(val / (minute))} phút trước`;
  }

  const day = 86400000;
  if (val > day) {
    return `${parseInt(val / day)} ngày trước`;
  }
  if (val > 3600000) {
    return `${parseInt(val / 3600000)} giờ trước`;
  }

  return myDate;
};

const transformNewsList = function (response) {
  cui.each(response.data, item => {
    item.createTime = convertedTime(item.createTime);
  });
  return response;
};

const getCateList = function (params, successCallback, failCallback) {
  const URL = `${baseURL}getCateList`;
  return postRequest(URL, null, params, successCallback, failCallback, transformCateList);
};

const getNewsById = function (params, successCallback, failCallback) {
  const URL = `${baseURL}getNewsById`;
  return postRequest(URL, null, params, successCallback, failCallback, transformNewsList);
};

const getNewsList = function (params, successCallback, failCallback) {
  const URL = `${baseURL}getNewsList`;
  return postRequest(URL, null, params, successCallback, failCallback, transformNewsList);
};

const getCommentList = function (params, successCallback, failCallback) {
  const URL = `${baseURL}getCommentList`;
  return postRequest(URL, null, params, successCallback, failCallback, transformNewsList);
};

const insertComment = function (params, successCallback, failCallback) {
  const URL = `${baseURL}insertComment`;
  return postRequest(URL, null, params, successCallback, failCallback);
};

const saveNews = function (params, successCallback, failCallback) {
  const URL = `${baseURL}save`;
  return postRequest(URL, null, params, successCallback, failCallback);
};

const unSaveNews = function (params, successCallback, failCallback) {
  const URL = `${baseURL}unsave`;
  return postRequest(URL, null, params, successCallback, failCallback);
};

const getHashTag = function (params, successCallback, failCallback) {
  const URL = `${baseURL}getHashTag`;
  return postRequest(URL, null, params, successCallback, failCallback);
};

const likeComment = function (params, successCallback, failCallback) {
  const URL = `${baseURL}likeComment`;
  return postRequest(URL, null, params, successCallback, failCallback);
};

const unlikeComment = function (params, successCallback, failCallback) {
  const URL = `${baseURL}unlikeComment`;
  return postRequest(URL, null, params, successCallback, failCallback);
};

const getRelatedList = function (data, successCallback, failCallback) {
  const URL = `${baseURL}getRelatedList`;
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return postRequest(URL, data, params, successCallback, failCallback);
};

export const NewsService = {
  getCateList,
  getNewsById,
  getNewsList,
  getCommentList,
  insertComment,
  saveNews,
  unSaveNews,
  likeComment,
  unlikeComment,
  getRelatedList,
  getHashTag,
};

