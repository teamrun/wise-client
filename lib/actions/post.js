import netService from '../service/netservice';
// 上拉加载更多
export const POST_MORE = 'post_more';
// 下拉刷新
export const POST_REFRASH = 'post_refrash';

export let postLoaded = (posts) => {
  return {
    type: POST_MORE,
    payload: {
      posts: posts
    }
  };
}

export let postRefrashed = (posts) => {
  return {
    type: POST_REFRASH,
    payload: {
      posts: posts
    }
  };
}


// 加载更多
export let loadMorePosts = (user, limit, sinceId) =>{
  return dispatch => {
    netService.dashboard(user, limit, sinceId)
      .then((data) => {
        postLoaded(data.data.dashboard);
      });
  }
}
// 顶部刷新
export let refrashPosts = (user, limit) =>{
  return dispatch => {
    netService.dashboard(user, limit)
      .then((data) => {
        postRefrashed(data.data.dashboard);
      });
  }
}
