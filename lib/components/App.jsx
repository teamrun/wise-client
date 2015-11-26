import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import netService from '../service/netservice';

import { postLoaded } from '../actions/post';

import PostList from './PostList';

let fetchDashboard = (opt) => {
  opt = opt || {};
  return netService.dashboard('libertyartchen', {
    limit: 10,
    offset: opt.offset,
    sinceId: opt.sinceId
  });
}

let schedualRefrash = (sinceId) => {
  return fetchDashboard({sinceId: sinceId});
}

const App = React.createClass({
  getInitialState: function() {
    return {
      refrashed_posts: []
    };
  },
  componentDidMount() {
    let { dispatch } = this.props;
    this.fetchMore();

    this.schedualFetchTimer = setInterval( () => {
      this.fetchRefrash();
    }, 60*1000);
  },
  componentWillUnmount() {
    clearInterval(this.schedualFetchTimer);
  },
  // 下拉 获取最近更新
  fetchRefrash() {
    let { posts } = this.props;
    let { refrashed_posts } = this.state;
    let newestId;
    if(refrashed_posts.length > 0){
      newestId = refrashed_posts[0].id;
    }
    else if(posts.length > 0){
      newestId = posts[0].id;
    }
    if(newestId){
      schedualRefrash(newestId).then((dashboard) => {
        this.setState({
          refrashed_posts: [...dashboard, refrashed_posts]
        });
      })
    }
  },
  // 上拉 加载更多
  fetchMore(e) {
    e && e.preventDefault();
    let { dispatch, posts } = this.props;
    let { refrashed_posts } = this.state;
    fetchDashboard({
      offset: posts.length + refrashed_posts.length
    }).then((dashboard) => {
      dispatch( postLoaded(dashboard) );
    });
  },
  render() {
    let { posts } = this.props;

    return (
      <div className="wise-app">
        <PostList posts={posts} />

        <a href="#" onClick={this.fetchMore}>Load more!</a>
      </div>
    )
  }
});


function storeToProps(store) {
  return {
    posts: store.posts
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(storeToProps)(App)
