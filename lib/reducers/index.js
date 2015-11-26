import { combineReducers } from 'redux';

import * as postsReducer from './posts';

// if there are more reducers in more files
// do: merge / assign

export default combineReducers(postsReducer);
