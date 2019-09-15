import React from 'react';
import './PaddleGame.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faPlay, faExpandArrowsAlt, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import lang from '../../assets/lang/lang.json';

class PaddleGame extends React.Component {
  constructor() {
    super();
    
    this.state = {
      gameRefreshInterval: null,
      bounces: 0,
      bestScore: localStorage.getItem("bestScore"),
      isFullScreen: false,
      gameLevel: 1,
      userLevel: localStorage.getItem("userLevel"),
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

    this.setGameLevel = this.setGameLevel.bind(this);
    this.updateAll = this.updateAll.bind(this);
    this.updateMousePosition = this.updateMousePosition.bind(this);
  }

  componentDidMount() {
    this.game.gameBoard = this.refs.canvas;
    this.game.context = this.refs.canvas.getContext('2d');
    this.printElements();
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

    if (this.isBallOutside()) {
      this.resetGameSpeed();
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
          this.setState({bounces: this.state.bounces + 1});
          this.setBestScore();
          this.setGameLevel();
        }
  }

  setGameLevel() {
    if (this.state.bounces > 5 && this.state.bounces <= 10) {
      this.game.gameSpeed = 800;
      this.setState({gameLevel: 2});
    }

    if (this.state.bounces > 10 && this.state.bounces <= 15) {
      this.game.gameSpeed = 600;
      this.setState({gameLevel: 3});
    }

    if (this.state.bounces > 15 && this.state.bounces <= 20) {
      this.game.gameSpeed = 400;
      this.setState({gameLevel: 4});
    }

    if (this.state.bounces > 20) {
      this.game.gameSpeed = 300;
      this.setState({gameLevel: 5});
    }

    clearInterval(this.state.gameRefreshInterval);
    this.setState({gameRefreshInterval: setInterval(this.updateAll, this.game.gameSpeed/30)});
  }

  setUserLevel() {
    if (this.state.userLevel === 'Begginer') {
      this.game.paddleWidth = 100;
    }

    if (this.state.userLevel === 'Regular') {
      this.game.paddleWidth = 80;
    }

    if (this.state.userLevel === 'Advanced') {
      this.game.paddleWidth = 60;
    }

    if (this.state.userLevel === 'Crazy') {
      this.game.paddleWidth = 50;
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
    this.setUserLevel();

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
    this.printElements();
    this.updateDirection();
  }
  
  updateMousePosition(ev) {
    let rect = this.refs.canvas.getBoundingClientRect();
    let mouseX = ev.clientX - rect.left;
    this.game.paddleX = mouseX - (this.game.paddleWidth / 2);
  }

  isBallOutside() {
    return this.game.ballY > this.game.gameBoard.height;
  }
  
  resetBall() {
    this.game.ballX = 0;
    this.game.ballY = 0;
  }

  resetGameSpeed() {
    this.game.gameSpeed = 1000;
      clearInterval(this.state.gameRefreshInterval);
      this.setState({gameRefreshInterval: setInterval(this.updateAll, this.game.gameSpeed/30)});
  }

  toggleFullScreen() {
    this.setState({isFullScreen: !this.state.isFullScreen})
  }

  startStopGame() {
    if (!this.state.gameRefreshInterval) {
      this.game.gameSpeed = 1000;
      this.setState({gameRefreshInterval: setInterval(this.updateAll, this.game.gameSpeed/30)});
    } else {
      clearInterval(this.state.gameRefreshInterval);
      this.setState({gameRefreshInterval: null})
    }
  }

  resetBestScore() {
    localStorage.setItem('bestScore', '0');
    this.setState({bounces: 0})
  }

  render() {

    let startStopGameBtn;

    if (!this.state.gameRefreshInterval) {
      startStopGameBtn = <div className="start-stop">
        <div className="start-stop--narrow">
          <button className="btn btn-dark" onClick={this.startStopGame.bind(this)}> 
          <FontAwesomeIcon icon={faPlay} /></button>
        </div>
        <div className="start-stop--wide">
          <button className="btn btn-dark" onClick={this.startStopGame.bind(this)}> 
          <FontAwesomeIcon icon={faPlay} /> {lang[localStorage.getItem('lang')].startGame} </button>
          </div>
        </div>
    } else {
      startStopGameBtn = <div className="start-stop">
        <div className="start-stop--narrow">
          <button className="btn btn-dark" onClick={this.startStopGame.bind(this)}> 
          <FontAwesomeIcon icon={faPlay} /></button>
        </div>
        <div className="start-stop--wide">
          <button className="btn btn-dark" onClick={this.startStopGame.bind(this)}> 
          <FontAwesomeIcon icon={faPlay} /> {lang[localStorage.getItem('lang')].stopGame} </button>
          </div>
        </div>
    }

    let difficultyLevel;

    if (!localStorage.getItem('userLevel')) {
      difficultyLevel = lang[localStorage.getItem('lang')].default;
    } else {difficultyLevel = this.state.userLevel}
    

    return (
      <div className="paddle-board">
        <p className="best-score"> <FontAwesomeIcon icon={faTrophy} /> {lang[localStorage.getItem('lang')].bestScore} {localStorage.getItem("bestScore")} <FontAwesomeIcon icon={faTrophy} /> </p>
        <p className="current-score"> {lang[localStorage.getItem('lang')].yourScore} {this.state.bounces}</p>
        <p className="game-level"> {lang[localStorage.getItem('lang')].gameLevel} {this.state.gameLevel} </p>
        <p className="user-level"> {lang[localStorage.getItem('lang')].difficultyLevel} {difficultyLevel} </p>

        <canvas onDoubleClick={this.toggleFullScreen.bind(this)}
          className={this.state.isFullScreen ? 'paddle-board paddle-board--full-screen' : 'paddle-board'} 
          ref="canvas" 
          width="700" 
          height="500"          >
        </canvas>
        <div className="paddle-board--buttons">
          <div className="paddle-board--buttons--wide">
            <button className="btn btn-dark" onClick={this.toggleFullScreen.bind(this)}> 
              <FontAwesomeIcon icon={faExpandArrowsAlt } /> 
              {lang[localStorage.getItem('lang')].fullScrn} </button>
            {startStopGameBtn}
            <button className="btn btn-dark" onClick={this.resetBestScore.bind(this)}>  
              <FontAwesomeIcon icon={faRedoAlt } /> 
              {lang[localStorage.getItem('lang')].resetScore} </button>
          </div>

          <div className="paddle-board--buttons--narrow">
            <button className="btn btn-dark" onClick={this.toggleFullScreen.bind(this)}> 
              <FontAwesomeIcon icon={faExpandArrowsAlt } /> </button>
            {startStopGameBtn}
            <button className="btn btn-dark" onClick={this.resetBestScore.bind(this)}>  
              <FontAwesomeIcon icon={faRedoAlt } /> </button>
          </div>
        </div>
      </div>
    );
  } 
}

export default PaddleGame;