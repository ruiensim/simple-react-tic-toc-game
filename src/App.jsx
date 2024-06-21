import { useState } from "react"
import Player from "./components/Player"
import Gameboard from "./components/Gameboard"
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const  initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function derivedActivePlayer(gameTurns)
{
  let currentplayer = "X";
  if(gameTurns.length>0 && gameTurns[0].player === "X")
  {
    currentplayer = "O";
  }
  return currentplayer;
}
function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(innerarray=>[...innerarray])];
  for(let turn of gameTurns){
      const{square,player} = turn;
      const{row,col} = square;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function derivedWinner(gameBoard,player){
  let winner;
  for(const combination of WINNING_COMBINATIONS)
    {
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
  
      if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
        {
           winner = player[firstSquareSymbol];
        }
      
    }
    return winner;
}

function App() {
  const [gameTurns,setGameTurns] = useState([]);
  const [player,setPlayer] = useState({X:"Player 1",O:"Player 2"})

  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard,player)
  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex,colIndex){
    setGameTurns((gameTurns)=>{
      const currentplayer = derivedActivePlayer(gameTurns)
      const newGameTurns = [
        {square:{row:rowIndex,col:colIndex},player:currentplayer},
        ...gameTurns]
      return newGameTurns;
    }
    )
  }
  
  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayer(prevPlayers => {
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
          <Player 
          initialname="Player1" 
          symbol="X" 
          isActive={activePlayer==="X"}
          onChangeName={handlePlayerNameChange}
          />
          <Player 
          initialname="Player2" 
          symbol="O" 
          isActive={activePlayer==="O"}
          onChangeName={handlePlayerNameChange}
          />
        </ol>
      {(winner || hasDraw) && <GameOver winner={winner} rematch={handleRestart}/>}
      <Gameboard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
