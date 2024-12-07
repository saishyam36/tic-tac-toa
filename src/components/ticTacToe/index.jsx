import { useEffect, useState } from "react";
import "./style.css";
import PropTypes from 'prop-types';

const Square = (props) => {
  const {value,onClick} = props;
  return <button onClick={onClick} className="square">{value}</button>;
};

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState('');
  const [isDisabled,setIsDisabled] = useState(true);


  const handleClick = (getCurrentSquareIndex) => {
    let currentSquares = [...squares];
    if(getWinner(currentSquares) || currentSquares[getCurrentSquareIndex]) return;
    currentSquares[getCurrentSquareIndex] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn);
    setSquares(currentSquares);
  };

  const handleReset = ()=>{
    setSquares(Array(9).fill(""))
    setStatus('')
    setIsXTurn(true)
  }

  const getWinner=(squares)=>{
    const winningPatterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const i in winningPatterns) {
      const [x,y,z]= winningPatterns[i];

      if(squares[x] && squares[x] === squares[y] && squares[x] === squares[z]) return squares[x];
    }
    return null;
  }

  useEffect(()=>{
    if(!getWinner(squares) && squares.every(item=> item !== '')){
      setStatus('This is Draw. Restart the Game!!!')
      setIsDisabled(false)
    } else if(getWinner(squares)){
      setStatus(`Winner is ${getWinner(squares)}. Restart the Game!!!`)
      setIsDisabled(false)
    } else{
      setStatus(`Next Player is ${isXTurn?'X':'O'}`)
    }

  },[squares,isXTurn])

  return (
    <div className="tic-tac-toe-container">
      <h1>TIC TAC TOE</h1>
      <div className="row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
      <h2>{status}</h2>
      <button disabled={isDisabled} onClick={handleReset} className="btn btn-primary">Reset</button>
    </div>
  );
};

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
};

export default TicTacToe;
