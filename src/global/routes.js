import {
  HomePage,
  Login,
  Signup
} from 'pages';

export const HOME_PAGE = '/';
export const LOGIN = '/login';
export const SIGNUP = '/signup';
export const routes = [
  {
    path : HOME_PAGE,
    exact : true,
    main : HomePage
  },
  {
    path : LOGIN,
    exact : true,
    main : Login
  },
  {
    path : SIGNUP,
    exact : true,
    main : Signup
  }
]