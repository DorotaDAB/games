import React from 'react';
import './HomePage.css';

class HomePage extends React.Component {
	render() {
	return (
		<div className="games-choice">
			Available games:
				<div className="games-img"> 
					<img src={require('../../Graphics/tic-tac-toe.png')} alt="Tic-Tac-Toe"/>
					<img src={require('../../Graphics/paddle-game.png')} alt="Pong"/>
				</div>
		 </div>
	
	)}
};

export default HomePage;