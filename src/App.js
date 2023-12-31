//import logo from './logo.svg';
import './App.css';
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import {useState} from "react";
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }

    return currentPlayer;
}

function App() {
    const [players, setPlayers] = useState({
        X: 'Player 1',
        O: 'Player 2'
    });
    const [gameTurns, setGameTurns] = useState([]);
    //const [hasWinner, setHasWinner] = useState(false);
    //const [activePlayer, setActivePlayer] = useState('X');

    // let currentPlayer = 'X';
    //
    // if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    //     currentPlayer = 'O';
    // }

    const activePlayer = deriveActivePlayer(gameTurns);

    let gameBoard = [...initialGameBoard.map(array => [...array])];

    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }

    let winner;

    for (const combination of WINNING_COMBINATIONS ) {
        debugger;
        const firstSquareSymbol =
            gameBoard[combination[0].row][combination[0].col];
        const secondSquareSymbol =
            gameBoard[combination[1].row][combination[1].col];
        const thirdSquareSymbol =
            gameBoard[combination[2].row][combination[2].col];

        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = players[firstSquareSymbol];
        }
    }

    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, colIndex) {
        //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');

        setGameTurns(prevTurns => {
            //console.log({prevTurns})
            // let currentPlayer = 'X';
            //
            // if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
            //     currentPlayer = 'O';
            // }

            const currentPlayer = deriveActivePlayer(prevTurns);

            const updatedTurns = [
                {
                    square: {row: rowIndex, col: colIndex},
                    player: currentPlayer
                },
                ...prevTurns];
            //console.log({updatedTurns})
            return updatedTurns;
        });
    }

    function handleReastart () {
        setGameTurns([]);
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            };
        });
    }

  return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player initialName="Player 1"
                    symbol="X"
                    isActive={activePlayer === 'X'}
                    onChangeName={handlePlayerNameChange}
            />
            <Player initialName="Player 2"
                    symbol="O"
                    isActive={activePlayer === 'O'}
                    onChangeName={handlePlayerNameChange}
            />
          </ol>
            {(winner || hasDraw)  && <GameOver winner={winner} onRestart={handleReastart}/>}
            <GameBoard onSelectSquare={handleSelectSquare}
                      board={gameBoard}
            />
        </div>
        <Log gameTurns={gameTurns}/>
      </main>
  );
}

export default App;
