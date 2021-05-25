<<<<<<< HEAD
import { useEffect, useRef, useState } from 'react';

const useAsync = (asyncFunction, shouldRun) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const run = useCallback(() => {
    console.log('EFFECT', new Date().toLocaleString())
    setResult(null);
    setError(null);
    setStatus('pending');

    return asyncFunction()
    .then((response) => {
      setStatus('settled');
      setResult(response);
    })
    .catch((error) => {
      setStatus('error');
      setError(error);
    })
  }, [asyncFunction]);

  useEffect(() => {
    if (shouldRun){
      run();
    }
  }, [run, shouldRun]);

  return[run, result, error, status];
};

const fetchData = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const json = await data.json();
  setPosts(json)
  return json;
};


export const Home = () => {
  const [posts, setPosts] = useState(null);
  const [reFetchData, result, error, status] = useAsync(fetchData, false);

  /*useEffect(() => {
    fetchData();
  }, [reFetchData]);*/
  if (stauts === 'idle') {
  return <pre>Nada Executando</pre>;
}

if (stauts === 'pending') {
  return <pre>Loading...</pre>;
}

if (stauts === 'error') {
  return <pre>{JSON.stringify(error, null, 2)}</pre>;
}

if (stauts === 'settled') {
  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}

  return 'IXXIII'
};
=======
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState('');

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    // console.log(new Date().toLocaleString('pt-BR'));
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search value: {searchValue}</h1>}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p>Não existem posts =(</p>}

      <div className="button-container">
        {!searchValue && <Button text="Load more posts" onClick={loadMorePosts} disabled={noMorePosts} />}
      </div>
    </section>
  );
};

export default Home
>>>>>>> 5e4924b2e8179cad87009e9e8d62cafa5458a865
