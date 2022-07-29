import "../App";
import {applyMiddleware, createStore} from "redux";
import allReducers from "./reducers";
import watcherSaga from "./sagas";
import createSagaMiddleware from 'redux-saga';
import SnakeReducer from "./reducers/SnakeReducer";
const sagaMiddleware = createSagaMiddleware();
const store = createStore(SnakeReducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(watcherSaga);
export default store;