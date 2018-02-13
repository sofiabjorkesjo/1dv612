import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {Switch} from 'react-router-dom'
import App from './App';
import Notifications from './views/Notifications';
import Settings from './views/Settings';
import LogIn from './views/LogIn';

const Routes = () => (
    <main>
    <div>
        <ul>
          <li><Link to="/auth/github">Logga in </Link></li>
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/Notifications">Notifications</Link></li>
          <li><Link to="/Settings">Settings</Link></li>
        </ul>
    </div>
    <div>
        <div>
            <switch>
                <Route exact path="/auth/github" component={LogIn}/>
                <Route exact path="/dashboard" component={App}/>
                <Route exact path="/Notifications" component={Notifications}/>
                <Route exact path="/Settings" component={Settings}/>    
            </switch>     
        </div>
    </div>
    </main>
)


export default Routes;