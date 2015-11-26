import { POST_MORE, POST_REFRASH } from '../actions/post';

export const posts = (state=[], action) => {
  switch(action.type){
    case POST_MORE:
      return state.concat(action.payload.posts);
    case POST_REFRASH:
      return action.payload.posts.concat(state);
    default:
      return state;
  }
}
