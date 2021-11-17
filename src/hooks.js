import {useState} from 'react';

function useFlip(initialState=true){
  const [state, setState] = useState(initialState);
  const flipState = () => {
    setState(state => !state);
  }
  return [state, flipState];
}

export { useFlip };