import "../../App";
import {takeLatest, put,delay} from 'redux-saga/effects';
import {DOWN, LEFT, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, RIGHT, UP} from "../constants";
import {IObjectPosition} from "../../utils/canvasOperation";
function* Move(params: {
    type: String;
    payload: IObjectPosition;
}){
    console.log("2) move watcher");
    while(true){
        yield put({
            type: params.type.split("_")[1],
            payload: params.payload,
        });
yield delay(100)
}

}

function* watcherSaga(){
    console.log("1) watcher");
    yield takeLatest([MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN],Move);
}
export default watcherSaga;