import React from 'react';
import './PaddleGame.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import lang from '../../assets/lang/lang.json';

class PaddleGame extends React.Component {
  constructor() {
    super();
    
    this.state = {
      gameRefreshInterval: null,
      bounces: 0,
      bestScore: localStorage.getItem("bestScore"),
      isFullScreen: false,
    }

    this.game = {
      gameSpeed: 1000,
      gameBoard: null,
      context: null,
      ballX: 0,
      ballY: 0,
      ballSpeedX: 5,
      ballSpeedY: 7,
      paddleWidth: 100,
      paddleHeight: 10,
      paddleDistFromEdge: 60,
      paddleX: 400,
    }

    this.updateAll = this.updateAll.bind(this);
    this.updateMousePosition = this.updateMousePosition.bind(this);
  }

  componentDidMount() {
    this.game.gameBoard = this.refs.canvas;
    this.game.context = this.refs.canvas.getContext('2d');
    this.printElements();
    this.setState({gameRefreshInterval: setInterval(this.updateAll, this.game.gameSpeed/30)});
    this.refs.canvas.addEventListener('mousemove', this.updateMousePosition)
  }

  componentWillUnmount() {
    clearInterval(this.state.gameRefreshInterval);
  }

  updateDirection() {
    this.game.ballX += this.game.ballSpeedX;
    this.game.ballY += this.game.ballSpeedY;
  
    if(this.game.ballX < 0) {
      this.game.ballSpeedX *= -1;
    }
    if(this.game.ballX > this.game.gameBoard.width) {
      this.game.ballSpeedX *= -1;
    }
    if(this.game.ballY < 0) {
      this.game.ballSpeedY *= -1;
    }

    if(this.game.ballY > this.game.gameBoard.height) {
      this.resetBall();
      this.setState({bounces: 0})
    }
  
    let paddleTopEdgeY = this.game.gameBoard.height - this.game.paddleDistFromEdge;
    let paddleBottomEdgeY = paddleTopEdgeY + this.game.paddleHeight;
    let paddleLeftEdgeX = this.game.paddleX;
    let paddleRightEdgeX = paddleLeftEdgeX + this.game.paddleWidth;

    if (this.game.ballY > paddleTopEdgeY &&
        this.game.ballY < paddleBottomEdgeY &&
        this.game.ballX > paddleLeftEdgeX &&
        this.game.ballX < paddleRightEdgeX) {
          this.game.ballSpeedY *= -1;
        }
  }
  
  setBestScore() {
    let bestScore = this.state.bestScore;

    if (bestScore < this.state.bounces) {
      localStorage.setItem("bestScore", this.state.bounces);
      this.setState({bestScore});
    } 
  }

  printElements() {
    this.game.context.fillStyle = '#4B515D';
    this.game.context.fillRect(0,0, this.game.gameBoard.width, this.game.gameBoard.height)
  
    this.game.context.fillStyle = '#66ffff';
    this.game.context.fillRect(this.game.paddleX, this.game.gameBoard.height - this.game.paddleDistFromEdge - this.game.paddleHeight, this.game.paddleWidth, this.game.paddleHeight)
  
    this.game.context.fillStyle = '#ffcccc';
    this.game.context.beginPath();
    this.game.context.arc(this.game.ballX, this.game.ballY, 10, 0, Math.PI * 2, true);
  
    this.game.context.fill();
  }
  
  updateAll() {
    this.game.gameSpeed = this.game.gameSpeed*1;
    this.printElements();
    this.updateDirection();
  }
  
  updateMousePosition(ev) {
    let rect = this.refs.canvas.getBoundingClientRect();
    let mouseX = ev.clientX - rect.left;
    this.game.paddleX = mouseX - (this.game.paddleWidth / 2);
  }
  
  resetBall() {
    this.game.ballX = 0;
    this.game.ballY = 0;
  }

  toggleFullScreen() {
    this.setState({isFullScreen: !this.state.isFullScreen})
  }

  render() {

    return (
      <div className="paddle-board">
        <p className="best-score"> 
          <FontAwesomeIcon icon={faTrophy} /> 
          {lang[localStorage.getItem('lang')].bestScore} {localStorage.getItem("bestScore")} 
          <FontAwesomeIcon icon={faTrophy} /> 
        </p>
        <p className="current-score"> {lang[localStorage.getItem('lang')].yourScore} {this.state.bounces}</p>
        <canvas onDoubleClick={this.toggleFullScreen.bind(this)}
          className={this.state.isFullScreen ? 'paddle-board paddle-board--full-screen' : 'paddle-board'} 
          ref="canvas" 
          width="700" 
          height="500">
        </canvas>
        <button className="btn btn-dark" onClick={this.toggleFullScreen.bind(this)}>
          {lang[localStorage.getItem('lang')].fullScrn}
        </button>
      </div>
    );
  } 
}

export default PaddleGame;
