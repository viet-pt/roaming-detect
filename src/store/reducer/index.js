import { combineReducers } from 'redux';
import { userReducer, progressReducer } from 'services/users/user/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  loading: progressReducer,
});
