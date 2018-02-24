import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import {Switch} from 'react-router-dom'

class LogIn extends Component {
    state = {
        response: ''
      };

    link = 'https://github.com/login/oauth/authorize/?scope=repo&user&client_id=80168115df9ea9d87e1f';

    componentDidMount() {
      //this.props.view()
    }

    
    render(props) {
      
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

