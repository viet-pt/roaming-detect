import { postRequest } from 'utils/http';
import { BACKEND_API } from 'global/environment';

const UserService = {};
const baseURL = BACKEND_API;

UserService.login = function (params, successCallback, failCallback) {
  const URL = `${baseURL}login`;
  return postRequest(URL, params, successCallback, failCallback);
};

export default UserService;
