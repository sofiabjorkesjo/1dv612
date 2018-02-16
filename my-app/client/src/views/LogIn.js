import React, { Component } from 'react';
import Redirect from 'react-router-dom';
import LogInButton from './LogInButton'
import Settings from './Settings';
import Notifications from './Notifications';   
//import env from '../env';

class LogIn extends Component {
    state = {
        response: ''
      };
      
    handleSocialLoginIn = (user) => {
        console.log(user)
        console.log('ssss')
    }

    test(err) {
        console.log(err)
    }

    getInfo = (info) => {
        console.log(info)
        console.log('gg')
        console.log(info.scope)
    }

    render() {
        console.log(process.env);
        
        console.log(process.env.REACT_APP_CLIENT_ID);    
        console.log('aaaa');
        return (
          <div className="Login">
            <p className="logIn">
                Logga in
                {process.env.REACT_APP_CLIENT_ID}
                {this.state.response}
            </p>

            
            <div>
                <LogInButton 
                    provider='github'
                    gatekeeper='http://localhost:9999'
                    appId='80168115df9ea9d87e1f'
                    
                    
                    onLoginSuccess={this.getInfo}
                    onLoginFailure={this.test}
                    redirect='http://localhost:3000/auth/github'
                    //scope='repo'
                    
                    
                    >
                    Login with Github
                </LogInButton>
            </div>
          </div>
        );
      }
}

export default LogIn;