import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import lang from '../../assets/lang/lang.json';

class HomePage extends React.Component {
	render() {
	return (
		<div className="games-choice">
			{lang[localStorage.getItem('lang')].homePageHeading}
			<div className="games-img"> 
				<Link to="/tictactoe"> <img src={require('../../assets/img/tic-tac-toe.png')} alt="Tic-Tac-Toe"/></Link>
				<Link to="/paddle"> <img src={require('../../assets/img/paddle-game.png')} alt="Pong"/> </Link>
			</div>
		 </div>
	)}
};

export default HomePage;