import {useEffect, useState, useRef} from "react";
import "../App";
import CanvasSnake, {useSnakePosition} from "./CanvasSnake";
import {
    clearCanvas,
    drawCanvas,
    drawImageOnCanvas,
    generateRandomPosition,
    IObjectPosition
} from "../utils/canvasOperation";
import {useDispatch, useSelector} from "react-redux";
import {INCREMENT_SCORE} from "../store/constants";
import {increaseSnake, scoreUpdates} from "../store/actions";
import GameInstruction from "./gameInstruction";
import App from "../App";
import gameInstruction from "./gameInstruction";

export interface ICanvasBoard {
    height: number;
    width: number;
    cellSize: number
}

export interface IInitialGameState {
    snakePosition: IObjectPosition[] | [];
    applePosition: IObjectPosition | null;
    score: number;
}

export const initialGameState: IInitialGameState = {
    //Postion of the entire snake
    snakePosition: [
        {posX: 280, posY: 300},
        {posX: 300, posY: 300},
    ],
    applePosition: {posX: 10, posY: 30},
    //just to test i have to improve that later
    score: 0,
};
export const useApplePosition = () => {
    return useSelector((state: IInitialGameState) => state.applePosition)
}

const CanvasBoard = ({height, width, cellSize}: ICanvasBoard) => {
    const dispatch = useDispatch();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [applePosition, setApplePosition] = useState<IObjectPosition>(
        generateRandomPosition(width - cellSize, height - cellSize, cellSize)
    );
    const [isConsumed, setIsConsumed] = useState<boolean>(false);
    const [img, setImage] = useState<HTMLImageElement | null>(null)
    const [gameEnded, setGameEnded] = useState<boolean>(false);
    const [lastX, setLastX] = useState<number>(-1);
    const [lastY, setLastY] = useState<number>(-1);
    const snakePos = useSnakePosition();
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
            //debugger;
//canvasRef.current;
            setContext(canvasRef.current && canvasRef.current.getContext("2d"));
            clearCanvas(context);
            if (img === null)
                if (context) {
                    const image = new Image();
                    image.src = "../images/apple.png";
                    image.onload = () => {
                        console.log("jestem");
                        setImage(image)
                    }
                }

            drawImageOnCanvas(context, [applePosition], cellSize, img)
            console.log(snakePos[0])
            console.log(applePosition)
            console.log(lastX)
            console.log(lastY)
            if (snakePos[0].posX === applePosition.posX && snakePos[0].posY === applePosition.posY &&
                (lastX !== applePosition.posX || lastY != applePosition.posY)) {
                setLastX(applePosition.posX)
                setLastY(applePosition.posY)
                setIsConsumed(true);
            }
        }
        ,
        [applePosition, context, cellSize, snakePos,]
    )

    useEffect(() => {
        //   debugger;
        if (isConsumed) {
            setApplePosition(generateRandomPosition(width - cellSize, height - cellSize, cellSize))
            console.log("apple nie")

            setIsConsumed(false);
            //Increase snake size when object is consumed successfully
            dispatch(increaseSnake(cellSize));

            //Increment the score
            dispatch(scoreUpdates(INCREMENT_SCORE));

        }
    }, [isConsumed, applePosition])


    return (<div className={"App"}>
        <div className={"GameArea"}>
            <canvas ref={canvasRef} className={["canvas-board", "canvas"].join(' ')}
                    style={{marginLeft: -width / 2}}
                    height={height} width={width}/>
            <CanvasSnake height={height} width={width} cellSize={cellSize}/>
            </div>
            <div className={"gameInstruction"}>
            <GameInstruction/>
            </div>
        </div>
    )
}
export default CanvasBoard