import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST } from '../actions';

export default function(state = {}, action) {
  
  switch(action.type) {
    case FETCH_POST:
      // ES5 syntax:
      // const post = action.payload.data
      // newState[post.id] = post
      // return newState
      console.log({...state});
      return { ...state, [action.payload.data.id]: action.payload.data }

    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');

    default:
      return state;
  }
}
