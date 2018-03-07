import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import LogIn from './views/LogIn';
import Settings from './views/Settings';
import { POINT_CONVERSION_COMPRESSED } from 'constants';
import Dashboard from './views/Dashboard'
import Notifications from './views/Notifications'
import {Redirect} from 'react-router';



 class App extends Component {
  constructor(props) {
    
    super(props)

    this.state = {
      loggedIn: 'false',
      fromChild: ''  
    };

    
  }

  

   changeState() {
     this.setState({loggedIn: 'true'})
   }

   callback = (dataFromChild) => {
    this.setState({fromChild: dataFromChild})
   }

  link = 'https://github.com/login/oauth/authorize/?scope=admin:org_hook,repo,user&client_id=80168115df9ea9d87e1f';
  
  render() {
    console.log(this.state.fromChild)
    //   if(this.state.loggedIn === 'false') {
    //     return (   
    //       <div className="App">
    //        <main>
    //     <div>
    //     </div>
    //     <div>
    //         <div>
    //             <switch>
    //             <a href={this.link}>Log in</a>                   
    //                 <Route path="/dashboard" render={()=><Dashboard routes={this.changeState.bind(this)}/>}/>
    //                 <Route path="/Settings" render={()=><Settings />}/>    
    //             </switch>     
    //         </div>
    //         <p>{this.state.loggedIn}</p>
    //     </div>
    //     </main>
    //       </div>
    //      );
    //   } else {
        return ( 
 
          <div className="App">
           <main>
        <div>
            <div>
                <a href={this.link}>Log in</a> 
            </div>
            <div>
              <li><Link to="/dashboard">Home</Link></li>
              <li><Link to="/Settings">Settings</Link></li>     
            </div>
        </div>
        <div>
            <div>
                
                    <Route path="/dashboard" render={()=><Dashboard routes={this.changeState.bind(this)} callbackFromParent={this.callback}/>}/>
                   
                    <Route path="/Settings" render={()=><Settings />}/>    
                    <Route path="/webhook" render={()=><Notifications />}/>  
                 
            </div>
            <p>{this.state.loggedIn}</p>
            <p>{this.state.fromChild}</p>
        </div>
        </main>
          </div>
         );
      }
  // }
  
}

export default App;
