import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'



 class App extends Component {

  state = {
    response: 'a'
  };

  componentDidMount() {
    // test = { response: res.express };
    // console.log('yyuyuyu');
    // console.log(test);
    this.callApi()
      //.then(res => this.setState({ response: res.express }, console.log(res.express.substring(13, 53)), console.log(res.express)))
      .then(res => this.setState({response: res.express.substring(13, 53)}))
     // .then()
      .then(res => fetch('https://api.github.com/user?access_token=' + this.state.response, {
         method: 'GET'
      }))
      .then(console.log('klaaar'))
      //.then(fetch('https://api.github.com/user?access_token=' + res.))
      .catch(error => console.error(error));
  }

  getTemporaryCode = () => {
    const search = this.props.location.search;
    const code = search.substring(6);
    return code
  }

  callApi = async function() {
    const response = await fetch('/main/' + this.getTemporaryCode());
    const body = await response.json();
    console.log('yo');
    console.log(body);



    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  

  render() {
    return (
      <div className="App">
       <p>Hej</p>
       
       <p className="p">{this.getTemporaryCode()}</p>
       <p>{this.state.response}</p>
       
      </div>
    );
    
  }
  
}

export default App;
