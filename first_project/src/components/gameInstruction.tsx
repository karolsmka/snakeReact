export interface IInstructionProps {
    resetBoard: () => void;
}
const GameInstruction = () => (
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
        <button onClick={() => console.log("reset")}>Reset game</button>
    </div>
);

export default GameInstruction;
