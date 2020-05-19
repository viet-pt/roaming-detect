/**
 * User info
 */
import { UserActions, ProgressAction } from './actions';

const initialState = {
  user: null,
  loading: 0,
  error: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case UserActions.GET_USER:
      return {
        ...state,
        loading: 1,
        error: null,
      };

    case UserActions.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: 0,
      };

    case UserActions.GET_USER_FAIL:
      return {
        ...state,
        loading: 0,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function progressReducer(state = initialState, action) {
  switch (action.type) {
    case ProgressAction.SHOW_PROGRESS:
      return {
        ...state,
        loading: state.loading + 1,
      };
      
    case ProgressAction.HIDE_PROGRESS:
      return {
        ...state,
        loading: state.loading - 1,
      };

    default:
      return state;
  }
}
