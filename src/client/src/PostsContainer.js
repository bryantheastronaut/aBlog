import React, { Component } from 'react';

class PostsContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let posts = this.props.posts;
    let postTitles = posts.map(post => {
      return (
        <li>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </li>
      )
    });
    return (
      <ul>{postTitles}</ul>
    )
  }
}
PostsContainer.propTypes = {
  posts: React.PropTypes.array.isRequired
}

export default PostsContainer;
