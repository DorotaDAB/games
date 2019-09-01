import React from 'react';
import './TicTacToe.css';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome';
import { faCircle } from '../../../node_modules/@fortawesome/free-regular-svg-icons';
import { faTimes} from '../../../node_modules/@fortawesome/free-solid-svg-icons';

class TicTacToe extends React.Component {
	constructor(props) {
        super(props);
        
        this.state =  {
            player1: <FontAwesomeIcon icon={faCircle} />,
            player2: <FontAwesomeIcon icon={faTimes} />,
            turn: 0,
            board: [
                '', '', '',
                '', '', '',
                '', '', '',
            ],
            gameEnabled: true
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

    onFieldClick(index) {
        if (!this.state.gameEnabled === true) { return };
        if (this.state.board[index] !== '') { alert('Miejsce zajęte. Spróbuj jeszcze raz.'); return };

        let selectedPlayerTag = this.state.turn %2 === 0 ? this.state.player1 : this.state.player2;

        let turnNumber = this.state.turn;
        let nextTurnNumber = ++turnNumber;

        let board = this.state.board;
        board[index] = selectedPlayerTag;

        this.setState({
            turn: nextTurnNumber,
            board: board    
        })
        this.checkGameStatus(selectedPlayerTag);
    }

    resetGameBoard() {
        this.setState({
            board: [
                '', '', '',
                '', '', '',
                '', '', '',
            ],
            turn: 0,
            gameEnabled: true
        })
    }

    isDraw() {
        console.log('Remis'); 
        alert('Remis');
    }

    endGame(selectedPlayer) {
       selectedPlayer === this.state.player1 ? console.log('GRATULACJE! Wygrał gracz') : console.log('GRATULACJE! Wygrał gracz X');
        this.setState({
            gameEnabled: false
        });
        selectedPlayer === this.state.player1 ? alert('GRATULACJE! Wygrał gracz O') : alert('GRATULACJE! Wygrał gracz X');
    }

	render() {
	return (
        <div className="ttt-container">
            <div className="game-board">
                { this.state.board.map((field, key) => { 
                return (
                    <div className="game-board--field" key={key} onClick={this.onFieldClick.bind(this, key)}> {/* zeby funkcja nie wdpdaa w infility-loop, to przeba zbindwać */}
                        <div className="game-board--field-content">{ field }</div>
                    </div>
                );
                }) }
            </div>
            <button onClick={this.resetGameBoard.bind(this)} className="btn btn-danger">Start again</button>
        </div>
    )}
}

export default TicTacToe;