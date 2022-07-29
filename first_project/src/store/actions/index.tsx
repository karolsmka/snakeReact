import "../constants/";
import {INCREASE_SNAKE} from "../constants";
import { Tmove } from "../../utils/interfaces";

// ** change 
/**
 * implemented move type so you won't pass wrong value
 */
export const makeMove = (dx: number, dy: number, move: Tmove) => ({
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