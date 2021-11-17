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

/*  Returns a piece of state that is an array, and a function that makes a request to given URL and
*   adds data from the response to the array state. The endpoint is split between the base URL of the API, and an affix to complete the endpoint.
*   The addToState function should always be wrapped within a callback if it is called within
*   the context of a DOM event (otherwise, the DOM event will be passed to urlAffix).
*/ 

/** Returns a piece of state that is an array, and a function that makes a request to a URL and appends the response
 *  data into said array. When calling the hook, the base URL of the endpoint should be supplied as the argument.
 *  Any further additions to the endpoint can be supplied to the addToState function when it is called.
 *  E.g. const [users, addUser] = useAxios("http://myapi.com/api/v2/users/");
 *       addUser("johndoe");
 * 
 *  Be careful when addToState is called as part of a DOM event, particularly when there are no affixations to the 
 *  base URL. To prevent the DOM event being passed in as the first argument to addToState, always wrap it in a callback.
 *  E.g.
 *  <button onClick={ () => addToState() }>Click Me</button>
 */
function useAxios(baseURL){
  const [state, setState] = useState([]);
  async function addToState(urlAffix=""){
    const endpoint = `${baseURL}${urlAffix}`
    const response = await Axios.get(endpoint);
    setState(state => [...state, {...response.data, id: uuid() }]);
  }
  return [state, addToState];
}

export { useFlip, useAxios };