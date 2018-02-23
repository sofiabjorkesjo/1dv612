import React from 'react'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import {Switch} from 'react-router-dom'
import App from './App';
import Notifications from './views/Notifications';
import Settings from './views/Settings';
import LogIn from './views/LogIn';
import Dashboard from './views/Dashboard';


const Routes = () => (
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
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/Settings" component={Settings}/>    
            </switch>     
        </div>
    </div>
    </main>
)


export default Routes;