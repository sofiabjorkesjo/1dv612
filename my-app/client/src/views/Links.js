import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Settings from './Settings';
import Layout from './Layout';


import Notifications from './Notifications';


const Links = () => (
    <main>
    <div>
          <ul>
            <li><Link to="/test">Settings</Link></li>
            <li><Link to="/testar">Dashboard</Link></li>
            
          </ul>
      </div>
      <div>
          <div>
              <switch>
                  <Route path="/settings" component={Layout}/>
                  <Route path="/dashboard" component={Notifications}/>  
              </switch>     
          </div>
      </div>
      </main>
  )

  export default Links;