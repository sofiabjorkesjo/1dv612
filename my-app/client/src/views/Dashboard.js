import React, { Component } from 'react';
import {Redirect} from 'react-router';
import Links from './Links';

class Dashboard extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      response: '',
      name: 'yoyooo',
      orgs: []
      
    }

  }




  saveOrganizations(obj) {
    if(obj) {
      let orgs = [];
      let orgsLocalStorage = [];
      for(let i = 0; i < obj.length; i++) {
        orgs.push(<p key={i}>{obj[i].login}</p>)
        orgsLocalStorage.push(obj[i].login)
      }
      this.setState({orgs: orgs})
      localStorage.setItem('organisationer', JSON.stringify(orgsLocalStorage))
    }
  }

  getOrganizations() {
    var organisations = localStorage.getItem('organisationer');
    var parsedOrganisations = JSON.parse(organisations)
    var orgsArray = [];
    for(let i = 0; i < parsedOrganisations.length; i++) {
      orgsArray.push(<p key={i}>{parsedOrganisations[i]}</p>)
    }
    this.setState({orgs: orgsArray})
  }

  saveName(name) {
    this.setState({name: name})

  }


  toParent = () => {
    var info = 'hehehheheejjjjj'

    this.props.callbackFromParent(info);
  }

  componentDidMount() {
    if(localStorage.getItem('username')) {  
      var username = localStorage.getItem('username')
      this.setState({name: username})
      this.getOrganizations() 
      this.postUserToServer()
      //this.getDashboard()
     // this.test()
      //this.callApiIgen()
      
    } else {
      this.toParent()
      this.props.routes()
      this.callApi()
      .then(res => this.setState({response: res.express.substring(13, 53)}))
      .then(res => {
        console.log('tetetet' + this.state.response)
        return fetch('https://api.github.com/user?access_token=' + this.state.response, {
        method: 'GET'
      })})
      .then(res => res.json() )
      .catch(error => console.error(error))
      .then(res => this.saveName(res.name))
      .then(res => {
        return localStorage.setItem('username', this.state.name)
      })
      .then(console.log(localStorage.getItem('username')))
      //.then(this.test())
      .then(console.log('klaaar!!'))
      

      .then(res => {
        return fetch('https://api.github.com/user/orgs?access_token=' + this.state.response,{
        method: 'GET'
      })})
      .then(res => res.json())
      .catch(error => console.log(error))
      .then(response => this.saveOrganizations(response)) 
      .then(this.postUserToServer())
    


    }
    
  }



  getTemporaryCode = () => {
    console.log(window.location.href);
    const search = window.location.search;
    const code = search.substring(6);
    return code 
  }

  callApi = async function() {
    this.getTemporaryCode()
    const response = await fetch('/main/' + this.getTemporaryCode());
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };
  
  

  postUserToServer() {
    var username = localStorage.getItem('username');
    var url = '/main/dashboard';
    console.log('tttt');
    var obj = {'username': username}

    return fetch(url, {
      method: 'POST', 
      body: JSON.stringify(obj) , 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    //.then(res => console.log(res))
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  render(props) {
    // let currentURL = window.location.search;
    // console.log(currentURL)
    // if(currentURL) {
    //   <Redirect to="/dashboard"/>
    // }


    return (
      <div className="SettingsDiv">
        <p>You are logged in as {this.state.name}</p>
        <div>
          <p>Dina organsationer är: </p>
          {this.state.orgs}
        </div>
 
      </div>
        );
      }   
}

export default Dashboard;