export function calculateWinner(squares, step) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return lines[i];
      } 
    }
    if (step === 9) {
      return 0;
    } else {
      return null;
    }    
  }

export function isEven(step) {
  return (step % 2 === 0);
}

// Would it be better to split into isClickable(boolean) and defineSqaures(array)? OK, because related actions
export function defineSquares(history, step, i, xIsNext){
  const current = history[step];
  const squares = current.squares.slice();
  if (calculateWinner(squares, step) || calculateWinner(squares, step) === 0 || squares[i]) {
    return false;
  } else {
    squares[i] = (xIsNext ? "X" : "O");
    return squares;
  }
}

export function defineLocation(i) {  
  return [i + 1];
}

export function defineStatus(history, stepNumber, xIsNext) {
  const current = history[stepNumber];
  const winners = calculateWinner(current.squares, stepNumber); 
  let status;
  if (winners) {
    status = "Winner: " + current.squares[winners[0]];
  } else if (winners === 0) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }  
  return status;    
}

export function defineMoves(step, move) {  
  const stepLocation = step.stepLocation;  
  const row = stepLocation % 3 === 0 ? stepLocation / 3 : Math.ceil(stepLocation / 3);
  const col = stepLocation - (row - 1) * 3;
  const desc = move ?
    "Go to move # " + move + " | col: " + col + ", row " + row:
    "Go to game start";    
  return desc;    
}

export function bold(stepNumber, move) {
  const isBold = move === stepNumber ? "bold" : "";
  return isBold;
}

export function defineOrderStatus(order, moves) {
  let orderStatus;
  if (order) {
    orderStatus = "Ascending";
  } else {
    moves = moves.reverse();
    orderStatus = "Descending";
  }
  return orderStatus;
}

export function sliceSquaresInRow(squares, index) {
  // regular braces "()" indicate that return is done. Used when return fits in one line
  // if use "{}", you need to write "return" manually
  let arr = squares.map((value, index) => (   
    {[index] : value}    
  ));
  const rowSquares = arr.slice(index, index + 3);
  return rowSquares;
}

export function calculateI(value) {
  const i = +Object.keys(value)[0]; 
  return i;
}

export function highlightWinner(winners, i) {
  const hl = (winners && (winners[0] === i || winners[1] === i || winners[2] === i)) ? "hl" : " ";
  return hl;
}

export function defineCurrentSquares(history, stepNumber) {
  const current = history[stepNumber];
  const squares = current.squares.slice();
  return squares;
}