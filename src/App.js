import React, { Component } from 'react';
import LoginPage from './LoginPage/LoginPage'
import Nav from './Nav/Nav'
import HomePage from './HomePage/HomePage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>

        <div className="App">
          <Nav />
          <Route exact path='/' component={LoginPage}/>
          <Route exact path='/home' component={HomePage}/>
        </div>
      </Router>
    );
  }
}

export default App;
