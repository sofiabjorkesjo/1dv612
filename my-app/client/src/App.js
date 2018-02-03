import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'


class App extends Component {

  //för att de ska kopplas med express på servern 
  state = {
    response: ''
  };

 

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async function() {
    const response = await fetch('/main');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Sofia</h1>
        </header>  
        <p className="App-intro">
          {this.state.response}
        </p>
      </div>
    );
    
  }
  
}

export default App;
