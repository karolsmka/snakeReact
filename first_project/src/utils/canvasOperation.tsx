export const clearCanvas = (context: CanvasRenderingContext2D | null) => {
    if (context) {
        context.clearRect(0, 0, 1000, 600);
    }
};

/*Interface to divide our canvas into smaller elements to better handling position on the board
* position of snake and apple
* */
export interface IObjectPosition {
    posX: number,
    posY: number,
}

/*Function to create objects on canvas for example snake body or apple we need array of object position
*because snake can be long and can be on couple of square on the board
*   */
export const drawCanvas = (
    context: CanvasRenderingContext2D | null,
    objectPositions: IObjectPosition[],
    cellSize: number,
) => {
    if (context) {

        objectPositions.forEach((canvasObject: IObjectPosition) => {
                if (canvasObject === objectPositions[0])
                    context.fillStyle = 'red';
                else if (canvasObject === objectPositions[2])
                    context.fillStyle = 'red';
                else
                    context.fillStyle = 'green';
                context.strokeStyle = "#146356";
                context.fillRect(canvasObject.posX, canvasObject.posY, cellSize, cellSize);
                context.strokeRect(canvasObject.posX, canvasObject.posY, cellSize, cellSize);
            }
        );

    }

};


export const drawImageOnCanvas = (
    context: CanvasRenderingContext2D | null,
    objectPositions: IObjectPosition[],
    cellSize: number,
    img: HTMLImageElement | null
) => {
    if (context && img)
        context.drawImage(img, objectPositions[0].posX, objectPositions[0].posY, cellSize, cellSize);


}

function randomNumber(min: number, max: number, range: number) {
    let random = Math.random() * max;
    /*we subtract our random number of rest of dividing by our range to have only numbers which you want to have random
    * for example 0,10,20,30 if we will have range 10 */
    return random - (random % range);
}

export const generateRandomPosition = (width: number, height: number, cellSize: number) => {
    return {
        posX: randomNumber(0, width, cellSize),
        posY: randomNumber(0, height, cellSize),
    };
};