import "../App";
import { useCallback, useEffect, useRef, useState } from "react";
import { clearCanvas, drawCanvas } from "../utils/canvasOperation";
import { useDispatch, useSelector } from "react-redux";
import { makeMove } from "../store/actions";
import {
    DOWN,
    LEFT,
    MOVE_DOWN, MOVE_DOWN_EDGE,
    MOVE_LEFT,
    MOVE_LEFT_EDGE,
    MOVE_RIGHT,
    MOVE_RIGHT_EDGE,
    MOVE_UP, MOVE_UP_EDGE,
    RIGHT,
    UP
} from "../store/constants";
import { IInitialGameState, ICanvasBoard, IObjectPosition } from "../utils/interfaces";

// ? hooks should have separete file 
export const useSnakePosition = () => {
    return useSelector((state: IInitialGameState) => state.snakePosition)
}
const CanvasSnake = ({ height, width, cellSize }: ICanvasBoard) => {
    console.log("snake dispatch")
    const dispatch = useDispatch();
    const ref = useRef<HTMLCanvasElement | null>(null);
    const snakePosition = useSnakePosition();
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    const moveSnake = useCallback(

        (direction: string) => {
            switch (direction) {

                case UP:
                    dispatch(makeMove(0, -cellSize, MOVE_UP))
                    break;
                case DOWN:
                    dispatch(makeMove(0, cellSize, MOVE_DOWN))
                    break;
                case LEFT:
                    dispatch(makeMove(-cellSize, 0, MOVE_LEFT))
                    break;
                case RIGHT:
                    dispatch(makeMove(cellSize, 0, MOVE_RIGHT))
                    break;
                case MOVE_RIGHT_EDGE:
                    dispatch(makeMove(-width - cellSize, 0, MOVE_RIGHT))
                    moveSnake(RIGHT);
                    break;
                case MOVE_LEFT_EDGE:
                    dispatch(makeMove(width + cellSize, 0, MOVE_LEFT))
                    moveSnake(LEFT);
                    break;
                case MOVE_UP_EDGE:
                    dispatch(makeMove(0, height + cellSize, MOVE_UP))
                    moveSnake(UP);
                    break;
                case MOVE_DOWN_EDGE:
                    dispatch(makeMove(0, -height - cellSize, MOVE_DOWN))
                    moveSnake(DOWN);
                    break;
                default:
                    break;
            }

        },
        [dispatch]
    );
    const handleKeyEvents = useCallback(
        (event: KeyboardEvent) => {
            console.log("1) key pressed");
            switch (event.key) {
                case "w":
                    moveSnake(UP);
                    break;
                case "s":
                    moveSnake(DOWN);
                    break;
                case "a":
                    moveSnake(LEFT);
                    break;
                case "d":
                    moveSnake(RIGHT);
                    break;
            }
        },
        [moveSnake]
    );
    const hasSnakeCollidedWithBoard = (
        snake: IObjectPosition[]) => {
        if (snake[0].posX < 0)
            moveSnake(MOVE_LEFT_EDGE);
        else if (snake[0].posX > width - cellSize)
            moveSnake(MOVE_RIGHT_EDGE);
        else if (snake[0].posY < 0)
            moveSnake(MOVE_UP_EDGE);
        else if (snake[0].posY > height - cellSize)
            moveSnake(MOVE_DOWN_EDGE);

    }
    useEffect(() => {
        //ref.current;
        if(!context){
            setContext(ref.current && ref.current.getContext("2d"));
            clearCanvas(context);
            window.addEventListener("keypress", handleKeyEvents);
        }
    }, [context, handleKeyEvents])

    // ** change
    /**
     * separeted useEffects and prevented context to set when its already set
     * becouse of separetion the above one only renders when page is initialyloaded
     * or context changes to null so it prevents unnecessary renders  
     */
    useEffect(() => {
        clearCanvas(context);
        hasSnakeCollidedWithBoard(snakePosition);
        drawCanvas(context, snakePosition, cellSize,);
    }, [snakePosition, context, cellSize])
    

    useEffect(() => {
        window.addEventListener("keypress", handleKeyEvents);

        return () => {
            window.removeEventListener("keypress", handleKeyEvents);
        };
    }, [handleKeyEvents])
    /*because that we used position fixed in our app.css class to center our board and snake we have to set margin left
    * like below
    * */
    return <canvas className={"canvas"} ref={ref} height={height} width={width} style={{ marginLeft: -width / 2 }} />


}
export default CanvasSnake;