import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import TicTacToe from './Components/TicTacToe/TicTacToe';
import PaddleGame from './Components/PaddleGame/PaddleGame';
import Settings from './Components/Settings/Settings';
import lang from '../src/assets/lang/lang.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlackHash } from '@fortawesome/free-brands-svg-icons';
import { faTableTennis, faHome, faCog } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from './assets/EventEmmiter';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      settingsChangedOn: null
    }

    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'en');
    }

    EventEmitter.subscribe('langChange', (event) => {
      this.setState({
        settingsChangedOn: new Date()
      })
    })
  }

  render() {
    return (
    <>
      <Router>
        <div className="container">
          <div className="container--wide-container">
            <Nav variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Link className="nav-link" to="/"><FontAwesomeIcon icon={faHome} /> {lang[localStorage.getItem('lang')].homePage}</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/tictactoe"> <FontAwesomeIcon icon={faSlackHash} /> {lang[localStorage.getItem('lang')].ticTacToe}</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/paddle"> <FontAwesomeIcon icon={faTableTennis} /> {lang[localStorage.getItem('lang')].paddleGame} </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/settings"> <FontAwesomeIcon icon={faCog} /> {lang[localStorage.getItem('lang')].settings} </Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="container--narrow-container">
            <Nav variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Link className="nav-link" to="/"><FontAwesomeIcon icon={faHome} /></Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/tictactoe"> <FontAwesomeIcon icon={faSlackHash} /></Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/paddle"> <FontAwesomeIcon icon={faTableTennis} /></Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/settings"> <FontAwesomeIcon icon={faCog} /></Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
        <div className="container">
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/tictactoe' component={TicTacToe}/>
          <Route exact path='/paddle' component={PaddleGame}/>
          <Route exact path='/settings' component={Settings}/>
        </div>
      </Router>
    </>
    );
  }
}

export default App;
