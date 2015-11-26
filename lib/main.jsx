import React from 'react';
import ReactDOM from 'react-dom';
// import Relay from 'react-relay';
import { Provider } from 'react-redux';

// import App from './containers/App';
import App from './components/App';

import store from './store';

let domCtn = document.querySelector('#ctn');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
domCtn );
