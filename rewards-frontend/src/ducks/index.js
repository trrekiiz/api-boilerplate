import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userTransaction from './userTransaction';
import userDashboard from './userDashboard';

export default combineReducers({
  form: formReducer,
  userTransaction,
  userDashboard
});

