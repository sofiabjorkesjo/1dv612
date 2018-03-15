import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Settings from './views/Settings';
import Dashboard from './views/Dashboard'

 class App extends Component {
  constructor(props) {   
    super(props)
  }

   logoutFunction() {
    localStorage.removeItem('username'); 
    localStorage.removeItem('organisationer');
    localStorage.removeItem('email');
    localStorage.removeItem('time');
   }

  link = 'https://github.com/login/oauth/authorize/?scope=admin:org_hook,repo,user&client_id=80168115df9ea9d87e1f';
  logOut = '/';

  render() {
        return ( 
          <div className="App">
           <main>
             <div>
                <div>
                  <a href={this.link}>Log in</a> 
                </div>
                <div className="links">
                  <li><Link to="/dashboard">Home</Link></li>
                  <li><Link to="/Settings">Settings</Link></li>  
                  <a href={this.logOut} onClick={this.logoutFunction} id="logout">Log out</a>    
                </div>
            </div>
          <div>
          <div>    
            <Route path="/dashboard" render={()=><Dashboard callbackFromParent={this.callback} {...this.state}/>}/>           
            <Route path="/Settings" render={()=><Settings />}/>                    
            </div>
          </div>
          </main>
        </div>
         );
      } 
}

export default App;
