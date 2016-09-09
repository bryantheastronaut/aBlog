import React, { Component } from 'react';
import Client from './Client';
import PostsContainer from './PostsContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    Client.getPosts()
      .then(posts => {
        this.setState({
          posts: posts
        });
      })
      .catch(err=> {
        console.error(err)
      });
  }
  render() {
    return (
      <div className="App">
      <PostsContainer posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
