import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import TicTacToe from './Components/TicTacToe/TicTacToe';
import PaddleGame from './Components/PaddleGame/PaddleGame';
import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-fontawesome';
import { faSlackHash } from '../node_modules/@fortawesome/free-brands-svg-icons';
import { faTableTennis, faHome } from '../node_modules/@fortawesome/free-solid-svg-icons';

class App extends React.Component {
  render() {
    return (
    <>
      <Router>
        <div className="container">
            <Nav variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Link className="nav-link" to="/"><FontAwesomeIcon icon={faHome} /> Home Page</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/tictactoe"> <FontAwesomeIcon icon={faSlackHash} /> Tic Tac Toe</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/paddle"> <FontAwesomeIcon icon={faTableTennis} /> Pong </Link>
              </Nav.Item>
            </Nav>
        </div>
        <div className="container">
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/tictactoe' component={TicTacToe}/>
            <Route exact path='/paddle' component={PaddleGame}/>
        </div>
      </Router>
    </>
    );
  }
}

export default App;
