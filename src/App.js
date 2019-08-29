import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import TicTacToe from './Components/TicTacToe/TicTacToe';

class App extends React.Component {
  render() {
    return (
    <>
      <Router>
        <div className="container">
            <Nav variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Link className="nav-link" to="/">Strona główna</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/TicTacToe">Kółko i krzyżyk</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/TicTacToe" disabled>W przygotowaniu</Link>
              </Nav.Item>
            </Nav>
        </div>
          <div className="container">
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/tictactoe' component={TicTacToe}/>
        </div>
      </Router>
    
      
    </>
    );
  }
}

export default App;
