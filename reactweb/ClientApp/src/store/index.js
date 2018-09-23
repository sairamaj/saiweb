import { createStore } from "redux";
import reducer from "../reducers";

const initialState = { tips: [] };
export const store = createStore(reducer, initialState);                                                                                                                                                                                                                        