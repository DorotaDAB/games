import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import lang from '../../assets/lang/lang.json';
import PongImg from '../../assets/img/paddle-game.png';
import TicTacToeImg from '../../assets/img/tic-tac-toe.png';

class HomePage extends React.Component {
  render() {
  return (
    <div className="games-choice">
      <h1> {lang[localStorage.getItem('lang')].homePageHeading} </h1>
      <div className="games-img"> 
        <Link to="/tictactoe"> 
          <img src={TicTacToeImg} 
          alt={lang[localStorage.getItem('lang')].altTicTacToe}/>
        </Link>
        <Link to="/paddle"> 
          <img src={PongImg} 
          alt={lang[localStorage.getItem('lang')].altTicTacToe}/> 
        </Link>
      </div>
    </div>
  )}
};

export default HomePage;