import { Component } from 'react';

import './styles.css';

import { TextInput } from '../../components/TextInput'
import { loadPosts } from '../..//utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';

class Home extends Component {
  state = {
    allPosts: [],
    posts: [],
    page: 0,
    postsPerPage: 10,
    serchValue: '',
  };

  async componentDidMount() {
    await this.loadPosts().then()
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
      posts.filter(posts => {
        return posts.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      })
      : posts;

    return (
      <section className="container">
        <div className="search-controler">
          {!!searchValue && (
            <h1>Search Value: {searchValue}</h1>
          )}
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>
        
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts = (</p>
        )}



        <div className="button-container">
          {!searchValue && (
            <Button
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}


export default Home;
