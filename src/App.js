import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import QRCode from 'qrcode-react'
import logoQR from './images/verification-of-delivery-list-clipboard-symbol.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <QRCode value="MATERIA 3;PROFESSOR 3;CACHORRO" size={window.innerHeight*.8} />
      </div>
    );
  }
}

export default App;
