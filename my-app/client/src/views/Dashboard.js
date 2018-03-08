import React, { Component } from 'react';
import {Redirect} from 'react-router';
import Links from './Links';
import io from "socket.io-client";

class Dashboard extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      response: '',
      name: '',
      email: '',
      orgs: [],
      socket: '',
      data: '',
      notifications: [],     
    }
    this.testArray = [];
    this.handleData = this.handleData.bind(this);
  }


  saveOrganizations(obj) {
    console.log('först detta');
    if(obj) {
      let orgs = [];
      let orgsLocalStorage = [];
      for(let i = 0; i < obj.length; i++) {
        orgs.push(<p key={i}>{obj[i].login}</p>)
        orgsLocalStorage.push(obj[i].login)
      }
      localStorage.setItem('organisationer', JSON.stringify(orgsLocalStorage))
      console.log('klar här');

    }
  }

  test() {
    console.log('sen detta efter'); 
  }

  getOrganizations() {
    console.log('börjar här')
    var organisations = localStorage.getItem('organisationer');
    var parsedOrganisations = JSON.parse(organisations)
    var orgsArray = [];
    for(let i = 0; i < parsedOrganisations.length; i++) {
      orgsArray.push(<p key={i}>{parsedOrganisations[i]}</p>)
    }
  }

  saveUser(res) {
    this.setState({name: res.name});
    this.setState({email: res.email})

  }


  toParent = () => {
    var info = this.theTemporaryCode()
    this.props.callbackFromParent(info);
  }

  handleData(data){
    console.log(':D');

    if(data.event = 'issue') {
      let subject = data.subject;
      let action = data.action;
      let title = data.title;
      let organization = data.organization;
      let repository = data.repository;
      let user = data.user;
      let date = data.date;

      let min = 1;
      let max = 3000;
      let random = min + Math.random() * (max - min);
      this.testArray.push(<div key={random} className="notificationDiv"><p key={random} className="date">{date}</p><p key={random} className="subject">{subject}</p><p key={random} className="title"><span key={random} className="titleName">{title}</span>{' by '}{user}</p></div>);
      this.setState({notifications: subject});
    }



  }

  jj() {
    let name = localStorage.getItem('username')
    let socket = io();
    socket.on(name, (test) => this.handleData(test)) 
  }
 

  componentDidMount() {   
    let name = localStorage.getItem('username')
    let socket = io();
    socket.on(name, (test) => this.handleData(test)) 

    if(localStorage.getItem('username')) {  
      var username = localStorage.getItem('username')
      this.setState({name: username})
      //this.getOrganizations() 
      this.postUserToServer()     
    } else {
      this.toParent()
      this.props.routes()
      this.callApi()
      .then(res => this.setState({response: res.express.substring(13, 53)}))
      .then(res => {
        return fetch('https://api.github.com/user?access_token=' + this.state.response, {
        method: 'GET'
      })})
      .then(res => res.json() )
      .catch(error => console.error(error))
      .then(res => this.saveUser(res))
      .then(res => {
        return localStorage.setItem('username', this.state.name)
      })
      .then(res => {
        return localStorage.setItem('email', this.state.email)
      })
      .then(res => {
        return fetch('https://api.github.com/user/orgs?access_token=' + this.state.response,{
        method: 'GET'
      })})
      .then(res => res.json())
      .catch(error => console.log(error))
      .then(response=> this.saveOrganizations(response))
      .then(response => { return this.postUserToServer()})
      .then(test => {return this.jj()})
    }
    
  }

  theTemporaryCode() {
    const search = window.location.search;
    return search
  }

  getTemporaryCode = () => {
    //console.log(window.location.search);
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
    var email = localStorage.getItem('email');
    var url = '/main/dashboard';
    var obj = {'username': username, 'email': email}

    return fetch(url, {
      method: 'POST', 
      body: JSON.stringify(obj) , 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(console.log('postat till server'))
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {return this.setOrganisations(response.orgs)})
  }

  setOrganisations(orgs) {

    var organisations = [];
    for(let i = 0; i < orgs.length; i++) {
      organisations.push(<p key={i} className="pTags">{orgs[i]}</p>)
    }

    this.setState({orgs: organisations})
  }

 



  render(props) {
    return (
      <div className="DashboardsDiv">
        <div className="loggedInAs">
          <p>You are logged in as {this.state.name}</p>
        </div>
        
        <div className="orgs">
          <p className="h2">Event you follow</p>
          {this.state.orgs}
        </div>
        <div className="notifications">
          <h2 className="h2">Notifications</h2>
          <div>{this.testArray}</div>
        </div>
      </div>
        );
      }   
}

export default Dashboard;