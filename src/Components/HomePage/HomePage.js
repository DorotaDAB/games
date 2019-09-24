import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import lang from '../../assets/lang/lang.json';

class HomePage extends React.Component {
  render() {
  return (
    <div className="games-choice">
      <h1> {lang[localStorage.getItem('lang')].homePageHeading} </h1>
      <div className="games-img"> 
        <Link to="/tictactoe"> 
          <img src={require('../../assets/img/tic-tac-toe.png')} 
          alt={lang[localStorage.getItem('lang')].altTicTacToe}/>
        </Link>
        <Link to="/paddle"> 
          <img src={require('../../assets/img/paddle-game.png')} 
          alt={lang[localStorage.getItem('lang')].altTicTacToe}/> 
        </Link>
      </div>
    </div>
  )}
};

export default HomePage;