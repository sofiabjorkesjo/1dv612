import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import LogIn from './views/LogIn';
import Settings from './views/Settings';
import { POINT_CONVERSION_COMPRESSED } from 'constants';
import Routes from './Routes'
import Notifications from './views/Notifications';
import Links from './views/Links';
import Dashboard from './views/Dashboard'



 class App extends Component {
  constructor(props) {
    
    super(props)
    console.log(this.props)
    this.state = {
      response: '',
      loggedIn:'mmm',
      name: '',
      orgs: []
  
    };
  }

  saveName(obj) {
    this.setState({name: obj.name})
  }

 //FIXA
  saveOrganizations(obj) {
    //this.setState({orgs: obj})
    // let orgs = [];
    // for(let i = 0; i < obj.length; i++) {
    //  orgs.push(<p>{obj[i].login}</p>)
    // }
    // this.setState({orgs: orgs})
  }




   componentDidMount() {
  
     this.callApi()
      .then(res => this.setState({response: res.express.substring(13, 53)}))
      .then(console.log(this.state.response))
      .then(res => {
        console.log(this.state.response);
        return fetch('https://api.github.com/user?access_token=' + this.state.response, {
         method: 'GET'
      })})
      .then(res => res.json() )
      .catch(error => console.error(error))
      .then(res => this.setState({name: res.name}))
      .then(this.setState({loggedIn: 'true'}))
      .then(res => {
        this.setState({loggedIn: 'true'});
        return fetch('https://api.github.com/user/orgs?access_token=' + this.state.response,{
        method: 'GET'
      })})
      .then(res => res.json())
      .catch(error => console.log(error))
      .then(response => this.saveOrganizations(response))


      
   }

  getTemporaryCode = () => {
    const search = window.location.search;
    const code = search.substring(6);
    return code 
  }

  callApi = async function() {
    this.getTemporaryCode()
    const response = await fetch('/main/' + this.getTemporaryCode());
    const body = await response.json();
    console.log(body);

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  
  
  render() {
    const test= 'jooo';
    return (
      
      <div className="App">
       <main>
    <div>
        <ul>
          <li><Link to="/login">Logga in</Link></li>
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/Settings">Settings</Link></li>
          
        </ul>
    </div>
    <div>
        <div>
            <switch>
                <Route path="/login" component={LogIn}/>
                <Route path="/dashboard" render={()=><Dashboard orgs={this.state.orgs} info={"HEEEEEJ"} loggedIn={this.state.loggedIn} name={this.state.name}/>}/>
                <Route path="/Settings" component={Settings}/>    
            </switch>     
        </div>
        <p>{this.state.name}</p>
    </div>
    </main>
      </div>
    );
    
  }
  
}

export default App;
