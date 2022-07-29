import "../App";
import {useSelector} from "react-redux";
import {IInitialGameState} from "./CanvasBoard";
const MainBar = ()=>{
    const score = useSelector((state:IInitialGameState)=> state.score)
    return (<>
        <h1>Snake Game</h1>
        <h1>Current Score: {score} </h1>
    </>)
}
export default MainBar;