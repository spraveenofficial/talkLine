import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Reducers from "../Reducers";
const initialState = {};

const middleWare = [thunk];

const store = createStore(
  Reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
