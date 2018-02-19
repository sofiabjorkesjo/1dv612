import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'



 class App extends Component {

//   //för att de ska kopplas med express på servern 

//   state = {
//     response: ''
//   };

//   componentDidMount() {
//     // fetch('/main')
//     // .then(results => {
//     //     return results.json();
//     // }).then(res => {
//     //     this.setState({ response: res.express2 })
//     // }).catch(err => console.log(err));
// //     this.callApi()
// //       .then(res => this.setState({ response: res.express }))
// //       .catch(err => console.log(err));
// }

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express2 }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async function() {
  //   const response = await fetch('/main');
  //   const body = await response.json();
  //   console.log(body);

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  getTemporaryCode = () => {
    const search = this.props.location.search;
    const code = search.substring(6);
    console.log(code);
    return code
  }

  id = '80168115df9ea9d87e1f&';


  //postToGithub = () => {
  componentDidMount() {
    console.log('körs nu');
    //fetch('https://github.com/login/oauth/access_token?' + 'client_id=80168115df9ea9d87e1f&redirect_uri=http://localhost:3000/dashboard&client_secret=a1aafce5111dc000f94b189de7043cfb3e2cc09&code=' + this.getTemporaryCode(), {
    fetch('https://github.com/login/oauth/access_token?' + 'client_id=80168115df9ea9d87e1f&' + 'redirect_uri=http://localhost:3000/dashboard&' + 'client_secret=a1aafce5111dc000f94b189de7043cfb3e2cc09&' + 'code=' + this.getTemporaryCode(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'client_id': '80168115df9ea9d87e1f&',
        //'redirect_uri': 'http://localhost:3000/dashboard&',
        //'client_secret': 'a1aafce5111dc000f94b189de7043cfb3e2cc09&',
        //'code': this.getTemporaryCode()
      },
      mode: 'no-cors'
       

    })
    .then(response => console.log(response))
    .catch(error => console.error(error));
  }
  

  render() {
    return (
      <div className="App">
       <p>Hej</p>
       <p className="p"></p>
       
      </div>
    );
    
  }
  
}

export default App;
