import React, { Component } from 'react';
import Redirect from 'react-router-dom';
import Settings from './Settings';
import Notifications from './Notifications';




class LogIn extends Component {
    state = {
        response: ''
      };

    getInfo = (info) => {
        console.log(info)
        console.log('gg')
        console.log(info.scope)
    };

    link = 'https://github.com/login/oauth/authorize/?scope=repo&client_id=' + process.env.REACT_APP_CLIENT_ID;
    //test = this.props.location.query.code;



    render() {
        return (
          <div className="Login">
            <p className="logIn">
                Logga in

                {this.state.response}
                
            </p>
           
            <a href={this.link}>Log in</a>
    
          </div>
        );
      }
}



export default LogIn;