import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './Board';
import { GameInfo } from './GameInfo';
import { isEven, defineSquares, defineLocation } from './helpers';

class Game extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                stepLocation: [0],
            }],
            stepNumber: 0,
            xIsNext: true,          
        };
    }

    handleClick(i) {
        const step = this.state.stepNumber;   
        const history = this.state.history.slice(0, step + 1);
        const xIsNext = this.state.xIsNext; 
         
        if (!defineSquares(history, step, i, xIsNext)) {
            return;
        } 
        const squares = defineSquares(history, step, i, xIsNext); 
        const location = defineLocation(i);                

        this.setState ({
            history: history.concat([{
                squares: squares,
                stepLocation: location,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: isEven(step),
        })
    }    

    render() {           
        return (
            <div className="game">
                <Board                    
                    onClick={(i) => this.handleClick(i)}
                    history={this.state.history}
                    stepNumber={this.state.stepNumber}
                />
                <GameInfo                                        
                    history={this.state.history}
                    stepNumber={this.state.stepNumber}
                    xIsNext={this.state.xIsNext}
                    jumpTo={(step) => this.jumpTo(step)}
                />               
            </div>        
        );  
    }          
}

ReactDOM.render(
    <Game />,
    document.getElementById("root")
);