import { postRequest } from 'utils/http';
import { BACKEND_API } from 'global/environment';
import sha256 from 'crypto-js/sha256';
import { cui } from 'components';

const baseURL = BACKEND_API;

const transformPasword = function (params) {
  const secureCode = 'ZCUvpv3TvbTkUDs2';
  const md5Hex = require('md5-hex');
  const convertedPassword = sha256(md5Hex(`${params.password}#${secureCode}`)).toString().toLowerCase();
  params.password = convertedPassword;
}

const login = function (params, successCallback, failCallback) {
  transformPasword(params.params);
  const URL = `${baseURL}login`;
  return postRequest(URL, null, params, successCallback, failCallback);
};

const transformLocate = function (response) {
  cui.each(response.data, item => {
    item.lat = parseFloat(item.lat);
    item.lng = parseFloat(item.lng);
  });
  return response;
};

const getLocation = function (data, successCallback, failCallback) {
  const URL = `${baseURL}Covid19/api/subinfo/subtrace`;
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return postRequest(URL, data, params, successCallback, failCallback, transformLocate);
};

export const AdminService = {
  login,
  getLocation,
};

