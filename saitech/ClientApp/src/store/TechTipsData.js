const requestTechTipsType = 'REQUEST_TECH_TIPS';
const receiveTechTipsType = 'RECEIVE_TECH_TIPS';
const initialState = { categories: [], isLoading: false };
const techTipsUrl = 'https://saitools.azurewebsites.net/api/techtips';

export const actionCreators = {
  requestTechTips: () => async (dispatch, getState) => {    

    dispatch({ type: requestTechTipsType });

    const response = await fetch(techTipsUrl);
    const categories = await response.json();

    dispatch({ type: receiveTechTipsType, categories });
  }
};

export const reducer = (state, action) => {
  
  console.log('reducer:' + action.type)
  state = state || initialState;

  if (action.type === requestTechTipsType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveTechTipsType) {
    return {
      ...state,
      categories: action.categories,
      isLoading: false
    };
  }

  return state;
};
