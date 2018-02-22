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
        console.log(process.env.REACT_APP_CLIENT)
    };


    link = 'https://github.com/login/oauth/authorize/?scope=repo&client_id=80168115df9ea9d87e1f';
    test = process.env.REACT_APP_CLIENT;
    //test = this.props.location.query.code;



    render() {
      console.log(process.env.REACT_APP_CLIENT)
        return (
          <div className="Login">
            <p className="logIn">
                Logga in
      
                {this.state.response}
                {process.env.REACT_APP_CLIENT}
            </p>
            <p>mm</p>
            <p>{this.test}</p>
           
            <a href={this.link}>Log in</a>
    
          </div>
        );
      }
}



export default LogIn;

