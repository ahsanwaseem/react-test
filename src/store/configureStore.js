import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export default function configureStore(app) {
  let store = createStore(app, applyMiddleware(thunk));
  return store;
}
