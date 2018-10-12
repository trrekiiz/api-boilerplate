import {createStore, compose , applyMiddleware} from 'redux';
import axios from 'axios';
import {multiClientMiddleware} from 'redux-axios-middleware';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './index';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

const multipleClient = {
  default: {
    client: axios.create({
      baseURL: process.env.REACT_APP_BASE_API_URL,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
  },
  sms: {
    client: axios.create({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
  }
};

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

export var _history;

export const _createHistory = () => {
  _history = createHistory();
};

const composedEnhancer = compose(
  applyMiddleware(
    multiClientMiddleware(multipleClient),
    routerMiddleware(_history),
  ),
  ...enhancerList);


export const initStore = () => createStore(rootReducer, {}, composedEnhancer);

