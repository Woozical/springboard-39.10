import Axios from 'axios';
import uuid from 'uuid';
import {useState} from 'react';

function useFlip(initialState=true){
  const [state, setState] = useState(initialState);
  const flipState = () => {
    setState(state => !state);
  }
  return [state, flipState];
}

// Returns a piece of state that is an array, and a function that makes a request to given URL and adds data from
// the response to the array state.
function useAxios(url){
  const [state, setState] = useState([]);
  const addToState = async () => {
    const response = await Axios.get(url);
    setState(state => [...state, {...response.data, id: uuid() }]);
  }
  return [state, addToState];
}

export { useFlip, useAxios };