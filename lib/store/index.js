import { createStore } from 'redux';

import wiseApp from '../reducers';

import { postLoaded } from '../actions/post';

let store = createStore(wiseApp);


// store.dispatch(postLoaded([1, 2, 3]));

export default store;
