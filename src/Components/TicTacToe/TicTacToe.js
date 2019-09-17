import React from 'react';
import './TicTacToe.css';
import lang from '../../assets/lang/lang.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faTimes , faTrophy, faRedoAlt} from '@fortawesome/free-solid-svg-icons';

class TicTacToe extends React.Component {
	constructor() {
    super();
    
    this.state =  {
      player1: <FontAwesomeIcon icon={faCircle} />,
      player2: <FontAwesomeIcon icon={faTimes} />,
      turn: 0,
      board: [
          '', '', '',
          '', '', '',
          '', '', '',
      ],
      gameEnabled: true,
      winner: lang[localStorage.getItem('lang')].whoIsWinner
    }
  }

  checkGameStatus(selectedPlayer) {
    for (let i = 0 ; i <= 6; i = i + 3 ) {
      if (!!this.state.board[i] && !!this.state.board[i+1] && !!this.state.board[i+2]) {
        if ( this.state.board[i] === this.state.board[i+1] && this.state.board[i+1] === this.state.board[i+2]) {
          this.endGame(selectedPlayer);
          return;
        }
      }
    }

    for (let i = 0; i < 3; i++ ) {
      if (!!this.state.board[i] && !!this.state.board[i+3] && !!this.state.board[i+6]) {
        if ( this.state.board[i] === this.state.board[i+3] && this.state.board[i+3] === this.state.board[i+6]) {
          this.endGame(selectedPlayer);
          return;
        }
      }
    }

    if (!!this.state.board[0] && !!this.state.board[4] && !!this.state.board[8]) {
      if ( this.state.board[0] === this.state.board[4] && this.state.board[4] === this.state.board[8]) {
        this.endGame(selectedPlayer);
        return;
      }
    }

    if (!!this.state.board[2] && !!this.state.board[4] && !!this.state.board[6]) {
      if ( this.state.board[2] === this.state.board[4] && this.state.board[4] === this.state.board[6]) {
        this.endGame(selectedPlayer);
        return;  
      }
    }   

    if (this.state.turn === 8) {this.isDraw(); return}
  }

  computerTurn() {
    let board = this.state.board;
    
    function _getRandomInt() {
      let min = Math.ceil(0);
      let max = Math.floor(8);

      return Math.floor(Math.random() * (max - min -1)) + min;
    }
  
    let computerFieldSelected = _getRandomInt();
  
    if (this.state.gameEnabled && board[computerFieldSelected] === '') {
      board[computerFieldSelected] = this.state.player2
    } else if (this.state.gameEnabled && this.state.board.indexOf('') >= 0) {
      this.computerTurn();
      return;
    } else return;
      
    let turnNumber = this.state.turn;
    let nextTurnNumber = ++turnNumber;

    this.setState({
      turn: nextTurnNumber,
      board
    });

    this.checkGameStatus(this.state.player2);
  }

  async onFieldClick(index) {

    if (!this.state.gameEnabled === true) { return };
    if (this.state.board[index] !== '') { alert('Try again'); return };

    let board = this.state.board;
    board[index] = this.state.player1;

    let turnNumber = this.state.turn;
    let nextTurnNumber = ++turnNumber;

    this.setState({
      turn: nextTurnNumber,
      board
    },  this.computerTurn)
    this.checkGameStatus(this.state.player1);
  }

  resetGameBoard() {
    this.setState({
      board: [
        '', '', '',
        '', '', '',
        '', '', '',
      ],
      turn: 0,
      gameEnabled: true,
      winner: lang[localStorage.getItem('lang')].whoIsWinner
    })
  }

  isDraw() {
    this.setState(
      {winner: lang[localStorage.getItem('lang')].draw}
    )
  }

  endGame(selectedPlayer) {
    this.setState({
      gameEnabled: false,
      winner: [lang[localStorage.getItem('lang')].winner, selectedPlayer]
    });
  }

	render() {
	return (
    <div className="ttt-container">
      <div className="game-board">
        { this.state.board.map((field, key) => { 
          return (
            <div className="game-board--field" key={key} onClick={this.onFieldClick.bind(this, key)}>
                <div className="game-board--field-content">{ field }</div>
            </div>
          );
        })}
      </div>
      <div className="ttt-container--narrow">
        <p> <FontAwesomeIcon icon={faTrophy} /> {this.state.winner} <FontAwesomeIcon icon={faTrophy} /></p>
        <button onClick={this.resetGameBoard.bind(this)} className="btn btn-dark">
          <FontAwesomeIcon icon={faRedoAlt} /> 
        </button>
      </div>
      <div className="ttt-container--wide">
        <p> <FontAwesomeIcon icon={faTrophy} /> {this.state.winner} <FontAwesomeIcon icon={faTrophy} /></p>
        <button onClick={this.resetGameBoard.bind(this)} className="btn btn-dark">
          <FontAwesomeIcon icon={faRedoAlt} />
          {lang[localStorage.getItem('lang')].startAgain}
        </button>
      </div>
    </div>
  )}
}

export default TicTacToe;