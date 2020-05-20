import { postRequest } from 'utils/http';
import { BACKEND_API } from 'global/environment';
import sha256 from 'crypto-js/sha256';

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

const getLocation = function (params, successCallback, failCallback) {
  const URL = `${baseURL}getLocation`;
  return postRequest(URL, null, params, successCallback, failCallback);
};

export const AdminService = {
  login,
  getLocation,
};

