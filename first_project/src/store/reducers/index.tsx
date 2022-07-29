import "../../App";
import {combineReducers} from "redux";
import SnakeReducer from "./SnakeReducer";

const allReducers = combineReducers({
    SnakeReducer,
})
export default allReducers;