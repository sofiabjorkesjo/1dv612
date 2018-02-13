
import Routes from '../Routes'
import Settings from './Settings';
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'



const Layout = () => (
            
            <header>
                <h1> START </h1>
                <div>
                <Link to="/test">Logga in </Link>
                <Route exact path="/test" component={Routes}/>
            </div>
            </header>
            

        )
 

export default Layout;

