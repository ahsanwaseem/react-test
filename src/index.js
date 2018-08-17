import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import PostsContainer from "./components/rootContainer/index";
import RootReducer from "./store/rootReducers";
import configureStore from "./store/configureStore";

let store = configureStore(RootReducer);

const Root = props => {
  return (
    <Provider store={store}>
      <PostsContainer />
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
