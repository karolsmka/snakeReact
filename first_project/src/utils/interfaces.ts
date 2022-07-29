// ** change 
/**
 * created separete interfaces file to manage them easier
 * you don't need to jump from file to file 
 * to find itf you are looking for
 * 
 * added move type
 */
export type Tmove = "MOVE_UP" | "MOVE_DOWN" | "MOVE_RIGHT" | "MOVE_LEFT";
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

/*Interface to divide our canvas into smaller elements to better handling position on the board
* position of snake and apple
* */
export interface IObjectPosition {
    posX: number,
    posY: number,
}