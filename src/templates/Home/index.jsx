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