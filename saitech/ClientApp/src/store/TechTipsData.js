const requestTechCategoriesType = 'REQUEST_TECH_CATEGORIES';
const receiveCategoriesType = 'RECEIVE_TECH_CATEGORIES';
const requestTechTipsType = 'REQUEST_TECH_TIPS';
const receiveTechTipsType = 'RECEIVE_TECH_TIPS';
const requestTechSearchTipsType = 'REQUEST_TECH_SEARCH_TIPS';
const receiveTechSearchTipsType = 'RECEIVE_TECH_SEARCH_TIPS';
const initialState = { categories: [], tips: [], searchTips: [], isLoading: false, searchValue : '' };
const techTipsUrl = 'https://saitools.azurewebsites.net/api/techtips';

const timeout = ms => new Promise(res => setTimeout(res, ms))
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
  },

  requestSearch: (searchValue) => async (dispatch, getState) => {

    if( searchValue === ''){
      dispatch({ type: receiveTechSearchTipsType, tips:[], searchValue });
      return
    }

    dispatch({ type: requestTechSearchTipsType });
    console.log(`searching category: ${searchValue}`);
    const response = await fetch(techTipsUrl + `/?q=${searchValue}`);
    const tips = await response.json();

    dispatch({ type: receiveTechSearchTipsType, tips, searchValue });
  }

};

export const reducer = (state, action) => {

  console.log('reducer:' + action.type)
  state = state || initialState;

  switch (action.type) {
    case requestTechCategoriesType:
      return {
        ...state,
        isLoading: true
      };
    case receiveCategoriesType:
      return {
        ...state,
        categories: action.categories,
        isLoading: false
      };
    case requestTechTipsType:
      return {
        ...state,
        isLoading: true
      };
    case receiveTechTipsType:
      return {
        ...state,
        tips: action.tips,
        isLoading: true
      };
    case requestTechSearchTipsType:
      return {
        ...state,
        isSearching: true
      };
    case receiveTechSearchTipsType:
      return {
        ...state,
        searchTips: action.tips,
        searchValue: action.searchValue,
        isSearching: false
      };
  }
  return state;
};
