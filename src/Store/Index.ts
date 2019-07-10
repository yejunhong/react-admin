import { createStore, combineReducers, applyMiddleware } from "redux";
import createHistory from "history/createBrowserHistory";

import {
  routerReducer,
  routerMiddleware,
} from "react-router-redux";
import { TestAction, TestAction1 } from "./Reducer/Test";

const history = createHistory();
const middleware = routerMiddleware(history);

const Reducers = combineReducers({
  TestAction,
  TestAction1,
  router: routerReducer
});

export default createStore(
  Reducers,
  applyMiddleware(middleware)
);