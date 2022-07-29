import "../constants/";
import {INCREASE_SNAKE} from "../constants";
export const makeMove = (dx: number, dy: number, move: string) => ({
    type: move,
    payload: [dx, dy]
});
export const increaseSnake = (cellSize: number) => ({
    type: INCREASE_SNAKE,
    payload: cellSize,
});

export const scoreUpdates = (type: string) => ({
    //equivalent to type: type
    type
});