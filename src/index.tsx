import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './client/redux/store';
import { App } from './client/App';

const rootElement = document.getElementById('app');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
