import { postRequest } from 'utils/http';
import { BACKEND_API } from 'global/environment';
import { cui } from 'components';
import { CommonService } from 'services/CommonService/CommonService';

const baseURL = BACKEND_API;

const transformCateList = function (response) {
  const cateList = response.data;
  cui.each(cateList, item => {
    item.url = CommonService.changeAlias(item.name);
  });
  return cateList;
};

const getCateList = function (params, successCallback, failCallback) {
  const URL = `${baseURL}getCateList`;
  return postRequest(URL, null, params, successCallback, failCallback, transformCateList);
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

export const AdminService = {
  getCateList,
  getRelatedList,
};

