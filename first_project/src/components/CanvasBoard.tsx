import { useEffect, useState, useRef } from "react";
import "../App";
import CanvasSnake, { useSnakePosition } from "./CanvasSnake";
import {
    clearCanvas,
    drawImageOnCanvas,
    generateRandomPosition,
} from "../utils/canvasOperation";
import { useDispatch, useSelector } from "react-redux";
import { INCREMENT_SCORE } from "../store/constants";
import { increaseSnake, scoreUpdates } from "../store/actions";
import GameInstruction from "./gameInstruction";
import { ICanvasBoard, IInitialGameState, IObjectPosition } from "../utils/interfaces";

export const initialGameState: IInitialGameState = {
    //Postion of the entire snake
    snakePosition: [
        { posX: 280, posY: 300 },
        { posX: 300, posY: 300 },
    ],
    applePosition: { posX: 10, posY: 30 },
    //just to test i have to improve that later
    score: 0,
};
export const useApplePosition = () => {
    return useSelector((state: IInitialGameState) => state.applePosition)
}

const CanvasBoard = ({ height, width, cellSize }: ICanvasBoard) => {
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

    // ** change
    /** changed useEffects behaviour now sertain properties are spepareted so 
     * they don't make unnecessary renders
     */

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
    }, [context, cellSize])


    useEffect(() => {
        if (snakePos[0].posX === applePosition.posX && snakePos[0].posY === applePosition.posY &&
            (lastX !== applePosition.posX || lastY !== applePosition.posY)) {
            setLastX(applePosition.posX)
            setLastY(applePosition.posY)
            setIsConsumed(true);
        }
    }, [snakePos, applePosition])
    
    useEffect(() => {
        if(context && img){
            drawImageOnCanvas(context, [applePosition], cellSize, img)
            console.log('drawImageOnCanvasHappens')
            console.log([snakePos[0]])
            console.log({applePosition})
            console.log({lastX})
            console.log({lastY})
        }
    
    }, [applePosition, context, img])
    

    useEffect(() => {
        //   debugger;
        if (isConsumed && context) {
            clearCanvas(context);
            setApplePosition(generateRandomPosition(width - cellSize, height - cellSize, cellSize))
            console.log("apple nie")

            setIsConsumed(false);
            //Increase snake size when object is consumed successfully
            dispatch(increaseSnake(cellSize));

            //Increment the score
            dispatch(scoreUpdates(INCREMENT_SCORE));

        }
    }, [isConsumed, context])

    // ** change
    // className props dont need to be in wraped in {} unless you are passing some variable
    return (<div className="App">
        <div className="GameArea">
            <canvas ref={canvasRef} className={["canvas-board", "canvas"].join(' ')}
                style={{ marginLeft: -width / 2 }}
                height={height} width={width} />
            <CanvasSnake height={height} width={width} cellSize={cellSize} />
        </div>
        <div className="gameInstruction">
            {/* TODO add working resetBoard function later */}
            <GameInstruction resetBoard={() => console.log('reset')}/>
        </div>
    </div>
    )
}
export default CanvasBoard