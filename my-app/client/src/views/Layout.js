
import Routes from '../Routes'
import Settings from './Settings';
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'



const Layout = () => (
            <main>
            <header>
                <h1> START </h1>
            </header>
            <div>
                <Link to="/test">Logga in </Link>
                <Route exact path="/test" component={Routes}/>
            </div>
        </main>
        )
 

export default Layout;

