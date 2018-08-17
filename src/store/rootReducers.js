import { combineReducers } from "redux";
import posts from "../components/rootContainer/state/reducers/postsDB";

const RootReducer = combineReducers({
  posts
});

export default RootReducer;
