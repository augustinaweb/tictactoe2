import React from 'react';
import { defineStatus, defineMoves, bold, defineOrderStatus } from './helpers';

// This one can be rewritten with hooks and function!!!
// rewrite this component with hook and React.useState
// React.useState - red
// write some hook, then go to custom hooks: useState, useEffect
// custom hooks to take states outside of components
export class GameInfo extends React.Component {   
    constructor(props) {
        super(props);
        this.state = {            
            isAscending: true,            
        };
    }
    
    changeOrder() {        
        this.setState({
            isAscending: !this.state.isAscending,
        })
    }

    render() {
        const {history, stepNumber, xIsNext} = this.props;       
        const order = this.state.isAscending;         

        let moves = history.map((step, move) => {            
            const desc = defineMoves(step, move);
            // If function and variable both have the same name react can't distinguish them
            //  Read more on naming variables. "generate button class"?
            // "getButtonClass"
            const isBold = bold(stepNumber, move); 
            return (
                <li key={move} className="history">
                    <button className={isBold} onClick={() => this.props.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
       
        const orderStatus = defineOrderStatus(order, moves);
        const status = defineStatus(history, stepNumber, xIsNext);
        
        return (
            <div className="game-info">
                <button className="order" onClick={() => this.changeOrder()}>{orderStatus}</button>
                <div className="status">{status}</div>
                <ol reversed={!order}>{moves}</ol>
            </div>                 
        );  
    }
}