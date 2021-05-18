import { Posts } from '.'

const { render, screen } = require('@testing-library/react');

const props = {
  posts: [
  {
    id: 1,
    title: 'title1 ',
    body: 'body 1',
    cover: 'img/img2.png'
  },
  {
    id: 2,
    title: 'title1 ',
    body: 'body 1',
    cover: 'img/img2.png'
  },
  {
    id: 3,
    title: 'title1 ',
    body: 'body 1',
    cover: 'img/img2.png'
  },
  ]
};

describe ('<Posts />', ()=> {
  it('should render posts', () => {
    render(<Posts {...props}/>);

    expect(screen.getAllByRole('heading', {name: /title/i }))
    .toHaveLenght(3);
    expect(screen.getAllByRole('img', {name: /title/i }))
    .toHaveLenght(3);
    expect(screen.getAllByRole(/title/i ))
    .toHaveLenght(3);
    expect(screen.getAllByRole('img', { name: /title/i }))
    .toHaveLenght('src', 'img/img3.png');
  });
  
  
  it('should match snapshot', () => {
    const {container} = render(<Posts {...props}/>);

    expect(container.firstChild).toMatchSnapshot();
  });
});