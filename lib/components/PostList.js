import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'


const Photo = React.createClass({
  render() {
    let { data, width } = this.props;
    let pic = data.original_size;
    let { width: picW, height: picH, url} = pic;

    let img = (
        <img
          src={url}
          className="img-item"
          width={ width }
          height={ Math.round(picH*(width / picW)) }
        />
    );

    return (
      <div className="photo-item">
        <p className="caption">{data.caption}</p>
        {img}
      </div>
    )
  }
});

const Tags = React.createClass({
  render() {
    let items = this.props.tags.map(function(item, index){
      return (
        <span className="tag-item" key={index}>
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
    let { post, width } = this.props;

    let content;
    if(post.type === 'photo'){
      content = post.photos.map((item, index) => (
        <Photo data={item} key={`${post.id}_${index}`} width={width} />
      ));
    }
    else if( post.type === 'text' ){
      content = (
        <div className="text-ctn"  dangerouslySetInnerHTML={{__html: post.body}}></div>
      );
    }
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
        {content}
        {other}
      </div>
    )
  }
});

const PostList = React.createClass({
  getInitialState: function() {
    return {
      width: undefined
    };
  },
  componentDidMount() {
    let dom = ReactDOM.findDOMNode(this);
    let { width } = window.getComputedStyle(dom);
    width = Number(width.substr(0, width.length - 2))

    this.setState({
      width: width
    })
  },
  render() {
    let items;
    if(this.state.width){
      items = this.props.posts.map((item) => {
        return (<PostItem
          key={item.id}
          post={item}
          width={this.state.width}
        />);
      });
    }
    return (
      <div className="post-list">
        {items}
      </div>
    )
  }
})

export default PostList;
