import {
  FETCH_DATA_ERROR,
  FETCH_DATA_PENDING,
  FETCH_DATA_SUCCESS,
} from '../constants/actionTypes';


function fetchMyDataError(error) {
  console.log('fetchMyDataError: Error.' + error)
  return {
    type: FETCH_DATA_ERROR,
    payload: error,
  };
}
function fetchDataPending() {
  console.log('fetchDataPending: Data pending.')
  return { type: FETCH_DATA_PENDING };
}
function fetchMyDataSuccess(response) {
  console.log('fetchMyDataSuccess: Success.' + response)
  return {
    type: FETCH_DATA_SUCCESS,
    payload: response,
  };
}

export function fetchData(val) {
  console.log('in fetchData.')
  return (dispatch) => {
    console.log('dispatching....')
    dispatch(fetchDataPending());
    fetch('https://saitools.azurewebsites.net/api/techtips?q=' + val)
      .then(res => res.json())
      .then(data => dispatch(fetchMyDataSuccess(data)))
      .catch(err => dispatch(fetchMyDataError(err)));
  };
}

export function search(val) {
    console.log('actions.search:' + val);
    return {
      type: "search",
      tips: []
    };
  }
  