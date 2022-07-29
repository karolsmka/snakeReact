
// ** change
// used your Interface in coponent
interface IInstructionProps {
    resetBoard: () => void;
}
const GameInstruction:React.FC<IInstructionProps> = ({resetBoard}) => (
    <div>
        <header className={"titleInstruction"}>
            How to Play
        </header>
        <header className={"titleInstruction"}>
            NOTE: Start the game by pressing any  <kbd>a s d w</kbd>
        </header>
        <span >
            <kbd>w</kbd> Move Up
        </span>
                <span>
          <kbd>a</kbd> Move Left
        </span>
                <span>
          <kbd>s</kbd> Move Downsna
        </span>
                <span>
          <kbd>d</kbd> Move Right
        </span>
        <button onClick={resetBoard}>Reset game</button>
    </div>
);
// TODO implement reset function
export default GameInstruction;
