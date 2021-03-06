﻿const requestTechCategoriesType = "REQUEST_TECH_CATEGORIES";
const receiveCategoriesType = "RECEIVE_TECH_CATEGORIES";
const requestTechTipsType = "REQUEST_TECH_TIPS";
const receiveTechTipsType = "RECEIVE_TECH_TIPS";
const requestTechSearchTipsType = "REQUEST_TECH_SEARCH_TIPS";
const receiveTechSearchTipsType = "RECEIVE_TECH_SEARCH_TIPS";
const requestTechInfoType = "REQUEST_TECH_INFO";
const receiveTechInfoType = "RECEIVE_TECH_INFO";
const requestTaskDetailType = "REQUEST_TASK_DETAIL_INFO";
const receiveTaskDetailType = "RECEIVE_TASK_DETAIL_INFO";
const requestSnippetDetailType = "REQUEST_SNIPPET_DETAIL_INFO";
const receiveSnippetDetailType = "RECEIVE_SNIPPET_DETAIL_INFO";

const receiveError = "RECEIVE_ERROR";
const requestCodeSnippetsType = "REQUEST_CODESNIPPETS_INFO";
const receiveCodeSnippetsType = "RECEIVE_CODESNIPPETS_INFO";
const requestProjectsType = "REQUEST_PROJECTS_INFO";
const receiveProjectsType = "RECEIVE_PROJECTS_INFO";
const requestProjectDetailType = "REQUEST_PROJECT_DETAIL_INFO";
const receiveProjectDetailType = "RECEIVE_PROJECT_DETAIL_INFO";

const initialState = {
  categories: [],
  tips: [],
  searchTips: [],
  isLoading: false,
  searchValue: "",
  tasks: [],
  taskdetail: {},
  codesnippets: [],
  projects: [],
  currentError: undefined
};
const techTipsUrl = "https://saitech.azurewebsites.net/api/techtips";
const techTasksUrl = "https://saitech.azurewebsites.net/api/techtasks";
const codeSnippetsUrl = "https://saitech.azurewebsites.net/api/codesnippets";
const codeProjectsUrl = "https://saitech.azurewebsites.net/api/projects";
const techTipsSearchUrl = "https://techsearch.azurewebsites.net/api/TipsSearch";

//const timeout = ms => new Promise(res => setTimeout(res, ms));

String.prototype.trimRight = function (charlist) {
  if (charlist === undefined) charlist = "s";

  return this.replace(new RegExp("[" + charlist + "]+$"), "");
};
let trimExtensions = function (tasks) {
  return tasks.map(task => {
    return {
      ...task,
      name: task.name.trimRight(".MD")
    };
  });
};

// async function
let getRequest = async function (url) {
  console.log(`fetching: ${url}`);
  let data = await await fetch(url)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      throw err;
    });
  console.log(`returning data:` + JSON.stringify(data));
  if (data.code !== undefined) {
    throw new Error(JSON.stringify(data));
  }
  return data;
};

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
    const response = await fetch(techTipsSearchUrl + `?q=${searchValue}`);
    const tips = await response.json();
    if (tips.error !== undefined) {
      dispatch({ type: receiveError, error: tips.error, searchValue });
    } else {
      dispatch({ type: receiveTechSearchTipsType, tips, searchValue });
    }
  },

  requestTechInfo: () => async (dispatch, getState) => {
    dispatch({ type: requestTechInfoType });

    try {
      var response = await getRequest(techTasksUrl);
      dispatch({ type: receiveTechInfoType, tasks: response });
    } catch (err) {
      dispatch({ type: receiveError, err });
    }
  },

  requestTaskDetail: task => async (dispatch, getState) => {
    dispatch({ type: requestTaskDetailType });

    try {
      var response = await getRequest(task.href);
      dispatch({
        type: receiveTaskDetailType,
        task: { ...task, detail: response.details }
      });
    } catch (err) {
      dispatch({ type: receiveError, err });
    }
  },

  requestCodeSnippets: () => async (dispatch, getState) => {
    dispatch({ type: requestCodeSnippetsType });

    try {
      var response = await getRequest(codeSnippetsUrl);
      dispatch({ type: receiveCodeSnippetsType, codesnippets: response });
    } catch (err) {
      dispatch({ type: receiveError, err });
    }
  },

  requestSnippetDetail: snippet => async (dispatch, getState) => {
    dispatch({ type: requestSnippetDetailType });

    try {
      var response = await getRequest(snippet.href);
      dispatch({
        type: receiveSnippetDetailType,
        snippet: { ...snippet, detail: response.details }
      });
    } catch (err) {
      dispatch({ type: receiveError, err });
    }
  },

  requestProjects: () => async (dispatch, getState) => {
    dispatch({ type: requestProjectsType });

    try {
      var response = await getRequest(codeProjectsUrl);
      dispatch({ type: receiveProjectsType, projects: response });
    } catch (err) {
      dispatch({ type: receiveError, err });
    }
  },

  requestProjectDetail: project => async (dispatch, getState) => {
    dispatch({ type: requestProjectDetailType });

    try {
      var response = await getRequest(project.href);
      dispatch({
        type: receiveProjectDetailType,
        project: { ...project, detail: response.details }
      });
    } catch (err) {
      dispatch({ type: receiveError, err });
    }
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
    case requestTechInfoType:
      return {
        ...state,
        currentError: undefined,
        isLoading: true
      };
    case receiveTechInfoType:
      if (action.err !== undefined) {
        return {
          ...state,
          currentError: action.err
        };
      } else {
        return {
          ...state,
          tasks: trimExtensions(action.tasks),
          isLoading: false
        };
      }
    case receiveTaskDetailType:
      var modifiedTasks = state.tasks.map(task => {
        console.log(`task.name : ${task.name} action.task:${action.task.name}`);
        if (task.name === action.task.name) {
          console.log("task updated.");
          task.detail = action.task.detail.data;
        }
        return task;
      });

      return {
        ...state,
        tasks: modifiedTasks
      };
    case requestCodeSnippetsType:
      return {
        ...state,
        currentError: undefined,
        isLoading: true
      };
    case receiveCodeSnippetsType:
      return {
        ...state,
        isLoading: false,
        codesnippets: trimExtensions(action.codesnippets)
      };
    case receiveSnippetDetailType:
      var modifiedSnippets = state.codesnippets.map(snippet => {
        console.log(
          `snippet.name : ${snippet.name} action.task:${action.snippet.name}`
        );
        if (snippet.name === action.snippet.name) {
          console.log("snippet updated.");
          snippet.detail = action.snippet.detail.data;
        }
        return snippet;
      });

      return {
        ...state,
        codesnippets: modifiedSnippets
      };
    case requestProjectsType:
      return {
        ...state,
        currentError: undefined,
        isLoading: true
      };
    case receiveProjectsType:
      return {
        ...state,
        isLoading: false,
        projects: trimExtensions(action.projects)
      };
    case receiveProjectDetailType:
      var modifiedProjects = state.projects.map(project => {
        console.log(
          `project.name : ${project.name} action.task:${action.project.name}`
        );
        if (project.name === action.project.name) {
          console.log("project updated.");
          project.detail = action.project.detail.data;
        }
        return project;
      });

      return {
        ...state,
        projects: modifiedProjects
      };
    case receiveError:
      return {
        ...state,
        isSearching: false,
        currentError: action.error
      };
  }
  return state;
};
