import React, { Component } from 'react';
import Redirect from 'react-router-dom';
import LogInButton from './LogInButton'
import Settings from './Settings';
import Notifications from './/Notifications';   

class LogIn extends Component {
    state = {
        response: ''
      };
    
      
     
    
    //    componentDidMount() {
    //     //  fetch('/auth/github')
    //     //    .then(results => {
    //     //        console.log(results);
    //     //    }).catch(err => console.log(err))
    //     this.callApi()
        
    //       .then(res => this.setState({ response: res.express }))
    //       .catch(err => console.log(err));
    //    }
      
    
    //   callApi = async function() {
    //     console.log('oo');
    //     const response = await fetch('/main/auth/github', {mode: 'no-cors'});
    //     const body = await response.json();

    
    //     if (response.status !== 200) throw Error(body.message);
    //     // if(response.status == 200) {
    //     //     console.log('ff');
    //     //     console.log(response);
        
    //     //     return response;
    //     // }
    //    return body;
    //   };
    render() {
        return (
          <div className="Login">
            <p className="logIn">
                Logga in
                {this.state.response}
            </p>
            <div>
                <LogInButton 
                    provider='github'
                    appId='80168115df9ea9d87e1f'
                    gatekeeper='http://localhost:9999'
                    redirect='http://localhost:3000/dashboard'
                    >
                    Login with Facebook
                </LogInButton>
            </div>
          </div>
        );
      }
}

export default LogIn;