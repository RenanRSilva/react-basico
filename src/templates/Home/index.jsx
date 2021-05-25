import { Children, cloneElement } from 'react';

const s = {
  style: {
    fontSize: '60px'
  },
};

const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const onTurn = () => setIsOn(s => !s);

  return Children.map(children, child => {
    const newChild = cloneEelemnt(child, {
      isOn,
      onTurn
    });
    return child;
  });
};
const TurnedOn = ({ isOn, children }) => isOn ? children : null;

const TurnedOff = ({ isOn, children }) => isOn ? null : children;
const TurnButton = ({ isOn, onTurn, ...props}) => {
  return (
  <button onClick={onTurn} {...props}>Turn {isOn ? 'OFF' : 'ON'}</button>
  );
};

const P = ({ children }) => <p {...s}>{children}</p>


export const Home = () => {
  return (
  <TurnOnOff>
    <TurnedOn>
     <P>As coisas que vão acontecer quando estiver ON</P> 
    </TurnedOn>
    <TurnedOff>
      Aqui vem as coisas do off
    </TurnedOff>
    <TurnButton {...s} />
  </TurnOnOff>
  );
};

export default