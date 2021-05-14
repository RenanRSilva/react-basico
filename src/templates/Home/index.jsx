import { Component } from 'react';

import './styles.css';


import { loadPosts } from './utils/load-posts';
import { Posts } from './Posts';

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    await this.loadPosts().then()
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts
    this.setState({ posts: postsAndPhotos });
  }

  render() {
    const { posts } = this.state;

    return (
      <section className="container">
        <Posts posts={posts} />
      </section>

    );
  }
}


export default App;
