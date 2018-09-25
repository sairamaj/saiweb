import {
  FETCH_DATA_ERROR,
  FETCH_DATA_PENDING,
  FETCH_DATA_SUCCESS,
} from '../constants/actionTypes';


export default (state,action) => {
  console.log('in reducer:' + action);
  switch(action.type){
    case FETCH_DATA_SUCCESS:
      console.log('returning state.')
      console.log('action.payload:' + action.payload)
      var newState = {...state,searchData: action.payload }
      console.log('new state:' + JSON.stringify(newState))
  }

  return state;
};
  