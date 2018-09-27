const requestTechCategoriesType = "REQUEST_TECH_CATEGORIES";
const receiveCategoriesType = "RECEIVE_TECH_CATEGORIES";
const requestTechTipsType = "REQUEST_TECH_TIPS";
const receiveTechTipsType = "RECEIVE_TECH_TIPS";
const requestTechSearchTipsType = "REQUEST_TECH_SEARCH_TIPS";
const receiveTechSearchTipsType = "RECEIVE_TECH_SEARCH_TIPS";
const requestTechInfoType = "REQUEST_TECH_INFO";
const receiveTechInfoType = "RECEIVE_TECH_INFO";

const initialState = {
  categories: [],
  tips: [],
  searchTips: [],
  isLoading: false,
  searchValue: "",
  techdata: ""
};
const techTipsUrl = "https://saitools.azurewebsites.net/api/techtips";
const techinfoUrl = "https://saitools.azurewebsites.net/api/techinfo";

const timeout = ms => new Promise(res => setTimeout(res, ms));
export const actionCreators = {
  requestTechCategories: () => async (dispatch, getState) => {
    dispatch({ type: requestTechCategoriesType });

    const response = await fetch(techTipsUrl);
    const categories = await response.json();

    dispatch({ type: receiveCategoriesType, categories });
  },

  requestTechTips: category => async (dispatch, getState) => {
    dispatch({ type: requestTechTipsType });
    console.log(`fetching category: ${category}`);
    const response = await fetch(techTipsUrl + `/${category}`);
    const tips = await response.json();

    dispatch({ type: receiveTechTipsType, tips });
  },

  requestSearch: searchValue => async (dispatch, getState) => {
    if (searchValue === "") {
      dispatch({ type: receiveTechSearchTipsType, tips: [], searchValue });
      return;
    }

    dispatch({ type: requestTechSearchTipsType });
    console.log(`searching category: ${searchValue}`);
    const response = await fetch(techTipsUrl + `/?q=${searchValue}`);
    const tips = await response.json();

    dispatch({ type: receiveTechSearchTipsType, tips, searchValue });
  },

  requestTechInfo: () => async (dispatch, getState) => {
    dispatch({ type: requestTechInfoType });
    console.log(`fetching: ${techinfoUrl}`);
    const response = await fetch(techinfoUrl);
    const responseData = await response.json();
    console.log('receiveTechInfoType:' + JSON.stringify(responseData));
    dispatch({ type: receiveTechInfoType, techdata: responseData.data });
  }
};

export const reducer = (state, action) => {
  console.log("reducer:" + action.type);
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
    case receiveTechInfoType:
      return {
        ...state,
        techdata: action.techdata
      };
  }
  return state;
};
