import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import LogIn from './views/LogIn';
import Settings from './views/Settings';
import { POINT_CONVERSION_COMPRESSED } from 'constants';
import Dashboard from './views/Dashboard'



 class App extends Component {
  constructor(props) {
    
    super(props)

    this.state = {

  
    };
  }


  

   componentDidMount() {

   }

  link = 'https://github.com/login/oauth/authorize/?scope=repo&user&client_id=80168115df9ea9d87e1f';
  
  render() {
    return (   
      <div className="App">
       <main>
    <div>
        <ul>

          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/Settings">Settings</Link></li>
          
        </ul>
    </div>
    <div>
        <div>
            <switch>
                <a href={this.link}>Log in</a> 
                
                <Route path="/dashboard" render={()=><Dashboard orgs={this.state.orgs} info={"HEEEEEJ"} loggedIn={this.state.loggedIn} name={this.state.name}/>}/>
                <Route path="/Settings" render={()=><Settings orgs={this.state.orgs}/>}/>    
            </switch>     
        </div>
    </div>
    </main>
      </div>
    );
    
  }
  
}

export default App;
