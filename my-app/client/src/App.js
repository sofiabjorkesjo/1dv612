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
    //const test = ''
    this.state = {
      response: '',
      name: '',
      repos_url: '',
      orgs: []
  
    };
  }

  saveName(obj) {
    this.setState({name: obj.name})
  }

  // getReposUrl(url) {
  //   console.log(url)
  //   fetch(url, {
  //     method: 'GET'
  //   })
  //   .then(res => this.saveRepos(res))
  //   .then(console.log('klaraaa'))
  //   .catch(error => console.log(error))
  // }

  // saveRepos(obj) {
  //   console.log('tjo')
  //   console.log(obj)
  // }

  saveOrganizations(obj) {
    let orgs = [];
    for(let i = 0; i < obj.length; i++) {
     orgs.push(<p>{obj[i].login}</p>)
    }
    this.setState({orgs: orgs})
  }


  componentDidMount() {
  
    this.callApi()
      .then(res => this.setState({response: res.express.substring(13, 53)}))
      .then(res => fetch('https://api.github.com/user?access_token=' + this.state.response, {
         method: 'GET'
      }))
      .then(res => res.json() )
      .catch(error => console.error(error))
      .then(response => this.saveName(response))
      .then(res => fetch('https://api.github.com/user/orgs?access_token=' + this.state.response,{
        method: 'GET'
      }))
      .then(res => res.json())
      .catch(error => console.log(error))
      .then(response => this.saveOrganizations(response))
      //.then(this.setState({org: 'element}'}))

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
       <div>{this.state.orgs}</div>
      </div>
    );
    
  }
  
}

export default App;
