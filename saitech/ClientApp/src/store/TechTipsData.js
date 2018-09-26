const requestTechCategoriesType = 'REQUEST_TECH_CATEGORIES';
const receiveCategoriesType = 'RECEIVE_TECH_CATEGORIES';
const requestTechTipsType = 'REQUEST_TECH_TIPS';
const receiveTechTipsType = 'RECEIVE_TECH_TIPS';


const initialState = { categories: [], tips:[], isLoading: false };
const techTipsUrl = 'https://saitools.azurewebsites.net/api/techtips';

export const actionCreators = {
  requestTechCategories: () => async (dispatch, getState) => {    

    dispatch({ type: requestTechCategoriesType });

    const response = await fetch(techTipsUrl);
    const categories = await response.json();

    dispatch({ type: receiveCategoriesType, categories });
  },

  requestTechTips: (category) => async (dispatch, getState) => {    

    dispatch({ type: requestTechTipsType });
    console.log(`fetching category: ${category}`);
    const response = await fetch(techTipsUrl + `/${category}`);
    const tips = await response.json();

    dispatch({ type: receiveTechTipsType, tips });
  }
};

export const reducer = (state, action) => {
  
  console.log('reducer:' + action.type)
  state = state || initialState;

  if (action.type === requestTechCategoriesType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveCategoriesType) {
    return {
      ...state,
      categories: action.categories,
      isLoading: false
    };
  }

  if( action.type === requestTechTipsType){
    return {
      ...state,
      isLoading: true
    };
  }

  if( action.type === receiveTechTipsType){
    return {
      ...state,
      tips: action.tips,
      isLoading: true
    };
  }
  return state;
};
