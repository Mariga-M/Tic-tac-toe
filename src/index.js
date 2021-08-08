import { checkPropTypes } from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//  a component takes in parameters called checkPropTypes(properties) 
//  and returns a hierachy of views to display via the render method

//child square component
// class Square extends React.Component {
  // constructor(props){ //state is initialized in the state
  //   super(props); //all react component classes that have a constructor start with a super(props)call
  //   this.state = { //state used to remember things
  //     namba:null,
  //   };
  // }
  function Square(_props){
    return (
      <button 
      className="square"       
      onClick = { _props.onClicked }      
      >
        {_props.namba} 
      </button>
    );
  }
  
  //parent board component
  class Board extends React.Component {
    // constructor(props){
    //   super(props);
    //   this.state = {
    //     squares : Array(9).fill(null),
    //     _sqrs : 1,
    //     xIsNext:true,
    //   };
    // }
   
    renderSquare(i) {
      return (<Square
       namba={this.props.squares[i]} 
       onClicked ={()=> this.props.onClick(i)}
       />
      ); 
    }
  
    render() {
      // const winner = calculateWinner(this.state.squares);
      // let status;
      // if(winner){
      //   status = 'Winner:' + winner;
      // }else{
      //   status ='Next player:' + (this.state.xIsNext ? 'X' : 'O' );
      // }
  
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {  
        history:[  
          {
            squares : Array(9).fill(null)
          }], 
        stepNumber: 0,
        xIsNext: true,
      };
    }

    handleClick(i){
      const history = this.state.history.slice( 0, this.state.stepNumber + 1 );
      const current = history[history.length -1 ];  
      const sqrs = current.squares.slice(); //.slice makes a copy
      if(calculateWinner(sqrs) || sqrs[i]) {
        return;
      }
      sqrs[i] = this.state.xIsNext ? 'X' : 'O';
      
      this.setState({
        history : history.concat([{  //concat doesn't mutate th eoriginal array
          squares : sqrs,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    render() {
      //uses most recent entry to determine and display the game status
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((_step, move) => {
        const desc = move ?
        'Go to move #' + move : 'Go to game start';
        return(
          <li key = { move }>
            <button onClick ={() => this.jumpTo(move)} > {desc} </button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = 'Winner:' + winner;
      } else {
        status = 'Next Player:' +(this.state.xIsNext ? 'X' : 'O') ;
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ol>{ moves }</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
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
        return squares[a];
      }
    }
    return null;
  }
  