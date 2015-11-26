import React, { PropTypes } from 'react'


const Photo = React.createClass({
  render() {
    let { data } = this.props;
    // let pic = data.original_size;
    let pic = data.thumbnail;
    return (
      <div className="photo-item">
        <p className="caption">{data.caption}</p>
        <img
          className="img-item"
          src={pic.url}
        />
      </div>
    )
  }
});

const Tags = React.createClass({
  render() {
    let items = this.props.tags.map(function(item){
      return (
        <span className="tag-item">
          {`#${item}`}
        </span>
      );
    });
    return (
      <div className="tag-list">
        {items}
      </div>
    )
  }
})

const PostItem = React.createClass({
  render () {
    let { post } = this.props;
    let photos = post.photos.map((item, index) => (
      <Photo data={item} key={`${post.id}_${index}`}/>
    ));
    let other = (
      <div className="other-part">
        <div className="post-caption" dangerouslySetInnerHTML={{__html: post.caption}}>
        </div>
        <Tags tags={post.tags} />
      </div>
    );
    return (
      <div className="post-item">
        <div className="user-info">{post.blog_name}</div>
        {photos}
        {other}
      </div>
    )
  }
});

const PostList = React.createClass({
  render() {
    let items = this.props.posts.map((item) => {
      return (<PostItem
        key={item.id}
        post={item}
      />);
    });
    return (
      <div className="post-list">
        {items}
      </div>
    )
  }
})

export default PostList;
