import React, { useState, useReducer } from 'react';
import { defineStatus, defineMoves, bold, defineOrderStatus } from './helpers';

export function GameInfo(props) {   
    // UseState hook
    // const [isAscending, changeOrder] = useState(true);

    // useReducer hook
    const [isAscending, changeOrder] = useReducer(
        isAscending => !isAscending,
        true
        );

    // custom hook
    // const isAscending = useOrder();   

    const {history, stepNumber, xIsNext} = props; 

    let moves = history.map((step, move) => {            
        const desc = defineMoves(step, move);        
        const isBold = bold(stepNumber, move); 
        return (
            <li key={move} className="history">
                <button className={isBold} onClick={() => props.jumpTo(move)}>{desc}</button>
            </li>
        );
    });
       
    const orderStatus = defineOrderStatus(isAscending, moves);
    const status = defineStatus(history, stepNumber, xIsNext);
    
    return (
        <div className="game-info">
            {/* State */}{/* <button className="order" onClick={() => changeOrder(!isAscending)}>{orderStatus}</button> */}
            {/* Reducer */}<button className="order" onClick={changeOrder}>{orderStatus}</button>
            <div className="status">{status}</div>
            <ol reversed={!isAscending}>{moves}</ol>
        </div>                 
    );  
}

// function useOrder() {
//     const [order, changeOrder] = useState(true); 
    

// }