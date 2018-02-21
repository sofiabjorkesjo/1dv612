import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'



 class App extends Component {

  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express2 }))
      .catch(error => console.error(error));
  }

  getTemporaryCode = () => {
    const search = this.props.location.search;
    const code = search.substring(6);
    console.log(code);
    return code
  }

  callApi = async function() {
    const response = await fetch('/main/' + this.getTemporaryCode());
    const body = await response.json();
    console.log(body);



    if (response.status !== 200) throw Error(body.message);

    return body;
  };

 






  // componentDidMount() {
  // //   let newheader = new Headers({
  // //     'Access-Control-Allow-Origin':'*',
  // //     'Content-Type': 'application/json'
  // // });
  //   console.log('körs nu');
  //   fetch('https://github.com/login/oauth/access_token',{
  //     method: 'POST',
  //     body: JSON.stringify({
  //       client_id: '80168115df9ea9d87e1f',
  //       redirect_uri: 'http://localhost:3000/dashboard',
  //       client_secret: '5a1aafce5111dc000f94b189de7043cfb3e2cc09',
  //       code: this.getTemporaryCode()
  //     }),
  //     header: {
  //       'Content-Type': 'application/json'
  //     },
      
  //   })
  //   .then(res => console.log(res))
  //   .catch(error => console.error(error));
  // }
  

  render() {
    return (
      <div className="App">
       <p>Hej</p>
       
       <p className="p">{this.getTemporaryCode()}</p>
       
      </div>
    );
    
  }
  
}

export default App;
