import React, { Component } from 'react';
import RouterPage from './routerPage';
import { Provider } from 'react-redux';
import {initStore} from './ducks/Store'

const store = initStore();

class StartPage extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterPage />
      </Provider>
  );
  }
}

export default StartPage;