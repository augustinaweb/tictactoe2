import React from 'react';
import { calculateWinner, calculateI, highlightWinner, sliceSquaresInRow, defineCurrentSquares } from './helpers';
import { Square } from './Square';

// custom hooks to take states outside of components
// mbx, redux - tools to take the state outside of the component - also allows to modify state from components that do not own it
// DRY - don't repeat yourself
// If there is no state create components as function, not classes!!!!
export class Board extends React.Component {       
    renderSquare(i) {  
        const {history, stepNumber} = this.props;   
        const squares = defineCurrentSquares(history, stepNumber);         
        const winners = calculateWinner(squares, stepNumber);       
        const highlight = highlightWinner(winners, i);
        return (
            <Square 
                value={squares[i]}
                onClick={() => this.props.onClick(i)}
                highlight={highlight}
            /> 
        );                
    }   

    render() {  
        // is it better to write variable to make them shorter ("variableName") or to write directly in the function "this.props.variableName"?
        // Take this.props objekta, ir sukuriu du naujus variable su objekto values.
        // Can take props from children and children children
        //  ES6 - DESTRUCTURING!!!!
        const {history, stepNumber} = this.props;             
        const squares = defineCurrentSquares(history, stepNumber); 
        const board = squares.map((value, index) => {               
            // reject invalid cases firts, then resolve acceptable input
            if (index % 3 !== 0) {
                return null;
            } 

            const rowSquares = sliceSquaresInRow(squares, index);                 
            const row = rowSquares.map((value, index) => { 
                const i = calculateI(value);                   
                return (
                    <React.Fragment key={i}>
                        {this.renderSquare(i)}
                    </React.Fragment>                        
                );                                     
            });              
            return (
                <div className="board-row" key={index}> 
                    {row}
                </div>
            )            
        });

        return (
            <div className="game-board">
                {board}               
            </div>
        )
    }
}