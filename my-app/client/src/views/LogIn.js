import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import {Switch} from 'react-router-dom'

class LogIn extends Component {
    state = {
        response: ''
      };

    link = 'https://github.com/login/oauth/authorize/?scope=repo&user&client_id=80168115df9ea9d87e1f';

    render(props) {
      if(this.props.loggedIn == false) {
        console.log('false');
      } else {
        console.log('true');
      }
        return (
          <div className="Login">
            <p className="logIn">
                Logga in
            </p>
            
            <a href={this.link}>Log in</a>  
          </div>
        );
      }
}

export default LogIn;

