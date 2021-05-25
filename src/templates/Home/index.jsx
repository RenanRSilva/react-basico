import { Children, cloneElement } from 'react';

const s = {
  style: {
    fontSize: '60px'
  },
};

const Parent = ({ children }) => {
  return Children.map(children, (child) => {
    const newChild = cloneElement(child, { .
      ...s,
      joaozinho: '123',
      cuidado: () => 123,
    });
    return child
  });
};

export const Home = () => {
  return (
  <Parent>
    <p>Oi</p>
    <p>Oi 2</p>
    <span>Olá</span>
  </Parent>
  );
};