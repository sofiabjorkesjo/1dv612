import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import App from './App.js'
import Notifications from './views/Notifications';
import Settings from './views/Settings'

const Routes = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/Notifications">Notfications</Link></li>
                <li><Link to="/Settings">Settings</Link></li>
            </ul>

            <Route exact path="/" component={App}/>
            <Route exact path="/Notifications" component={Notifications}/>
            <Route exact path="/Settings" component={Settings}/>
        </div>
    </Router>
)

export default Routes;