import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import LogIn from './views/LogIn';
import Settings from './views/Settings';
import { POINT_CONVERSION_COMPRESSED } from 'constants';


 class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: '',
      name: '',
      repos_url: ''
  
    };
  }

  saveResponse(obj) {
    var name = obj.name;
    this.getName(name);
    var repos_url = obj.repos_url
    this.getReposUrl(repos_url);
  }

  getName(name) {
    console.log(name)
    return name
  }

  getReposUrl(url) {
    console.log(url)
    return url
  }

  componentDidMount() {
  
    this.callApi()
      .then(res => this.setState({response: res.express.substring(13, 53)}))
      .then(res => fetch('https://api.github.com/user?access_token=' + this.state.response, {
         method: 'GET'
      }))
      .then(res => res.json() )
      .catch(error => console.error(error))
      .then(response => this.saveResponse(response))
  }

  getTemporaryCode = () => {
    const search = this.props.location.search;
    const code = search.substring(6);
    return code
  }

  callApi = async function() {
    const response = await fetch('/main/' + this.getTemporaryCode());
    const body = await response.json();
    console.log(body);



    if (response.status !== 200) throw Error(body.message);

    return body;
  };


  render() {
    var test = 'dd'
    return (
      
      <div className="App">
      <p>heej</p>

      <Settings name="sofia"/>
       <p>You are logged in as {this.state.name}</p>
       <p>{this.state.repos_url}</p>
 
      </div>
    );
    
  }
  
}

export default App;
