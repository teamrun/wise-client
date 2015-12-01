import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import netService from '../service/netservice';

import { postLoaded, postRefrashed } from '../actions/post';

import PostList from './PostList';

const COMING_TO_BOTTOM = 300;

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
      refrashed_posts: [],
      pending_more: false
    };
  },
  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this);

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
          refrashed_posts: [...dashboard, ...refrashed_posts]
        });
      })
    }
  },
  // 上拉 加载更多
  fetchMore(e) {
    e && e.preventDefault();
    let { dispatch, posts } = this.props;
    let { refrashed_posts } = this.state;
    return fetchDashboard({
      offset: posts.length + refrashed_posts.length
    }).then((dashboard) => {
      dispatch( postLoaded(dashboard) );
    });
  },
  showRefrashed(){
    this.props.dispatch( postRefrashed(this.state.refrashed_posts) );

    this.setState({
      refrashed_posts: []
    });
  },

  handleScroll(e){
    if(this.state.pending_more !== true){
      let { scrollHeight, scrollTop } = this.dom;
      // 判断滚动方向
      if(!(this.lastST && scrollTop > this.lastST)){
        return;
      }
      this.lastST = scrollTop;

      let { height } = window.getComputedStyle(this.dom);
      let domHeight = parseInt(height.substr(0, height.length - 2));

      if(scrollHeight - (scrollTop + domHeight) <= COMING_TO_BOTTOM){
        console.log(scrollHeight, scrollTop + domHeight);
        console.log('will fetch more');
        this.setState({
          pending_more: true
        });
        this.fetchMore().then(() => {
          this.setState({
            pending_more: false
          });
        })
      }
    }
  },

  renderTopTip(){
    let { refrashed_posts } = this.state;
    if(refrashed_posts.length > 0){
      return (
        <a href="#" onClick={this.showRefrashed}>
          {`You have ${refrashed_posts.length} new feed(s), click me to show them`}
        </a>
      );
    }
    else{
      return undefined;
    }
  },
  render() {
    let { posts } = this.props;

    return (
      <div id="dashboard" onScroll={this.handleScroll}>
        {this.renderTopTip()}

        <PostList posts={posts} />
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
