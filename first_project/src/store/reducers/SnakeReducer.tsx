
import {DOWN, INCREASE_SNAKE, INCREMENT_SCORE, LEFT, RIGHT, UP} from "../constants";
import {initialGameState} from "../../components/CanvasBoard";

const SnakeReducer = (state = initialGameState, action:any) => {
    console.log("3) reducer");
    switch (action.type) {
        case RIGHT:
        case LEFT:
        case UP:
        case DOWN: {
            let newSnake = [...state.snakePosition];
            newSnake = [{
                posX: state.snakePosition[0].posX + action.payload[0],
                posY: state.snakePosition[0].posY + action.payload[1],
            }, ...newSnake];
            newSnake.pop();

            return {
                ...state,
                snakePosition: newSnake,
            };
        }
        case INCREASE_SNAKE:
            const snakeLen = state.snakePosition.length;
            return {
                ...state,
                snakePosition: [
                    ...state.snakePosition,
                    {
                        //i have to change that to payload
                        posX: state.snakePosition[snakeLen - 1].posX - 20,
                        posY: state.snakePosition[snakeLen - 1].posY - 20,
                    },
                ],
            };
        case INCREMENT_SCORE:
            return {
                ...state,
                score: state.score + 5,
            };

        default:
            return state;
    }
}
export default SnakeReducer