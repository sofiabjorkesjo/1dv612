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
      orgs: [],
      socket: '',
      data: '',
      notifications: [],
      test: [],
      aa: ''
      
    }
    this.testArray = [];
    this.handleData = this.handleData.bind(this);
  }


  saveOrganizations(obj) {
    if(obj) {
      let orgs = [];
      let orgsLocalStorage = [];
      for(let i = 0; i < obj.length; i++) {
        orgs.push(<p key={i}>{obj[i].login}</p>)
        orgsLocalStorage.push(obj[i].login)
      }
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
  }

  saveName(name) {
    this.setState({name: name})

  }


  toParent = () => {
    var info = this.theTemporaryCode()
    this.props.callbackFromParent(info);
  }

  //getNoticications() {
    //let name = localStorage.getItem('username')
    //let socket = io();
   // let notification = [];
    // socket.on(name, function(data) {
      
    //   //  console.log(data);
    //   //  notification.push(data);
    //   //  console.log(notification);
    //   //  console.log('NAJS :D');  
    //  })

    //socket.on(name, this.handleData) 
      
      //  console.log(data);
      //  notification.push(data);
      //  console.log(notification);
      //  console.log('NAJS :D');  


     //let te = 'aaaa';
     //this.updateCode(te);
    // console.log('TETTETETETE');
     

  //}


  handleData(data){
    console.log(':D');
    console.log(data);
    let test = ['1', '2', '2'];
    this.testArray.push(data);
    console.log(this.testArray);
    //this.setState({aa: data})
    this.setState({test: test})
    this.setState({notifications: this.testArray})
  }
 

  componentDidMount() {   
    let name = localStorage.getItem('username')
    let socket = io();
    socket.on(name, this.handleData) 

    if(localStorage.getItem('username')) {  
      var username = localStorage.getItem('username')
      this.setState({name: username})
      this.getOrganizations() 
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
      .then(res => this.saveName(res.name))
      .then(res => {
        return localStorage.setItem('username', this.state.name)
      })
      .then(res => {
        return fetch('https://api.github.com/user/orgs?access_token=' + this.state.response,{
        method: 'GET'
      })})
      .then(res => res.json())
      .catch(error => console.log(error))
      .then(response => this.saveOrganizations(response)) 
      //.then(this.reloadTestlite())
      //.then(this.postUserToServer())
    


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
    var url = '/main/dashboard';
    var obj = {'username': username}

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
    .then(response => this.setOrganisations(response.orgs))
  }

  setOrganisations(orgs) {
    //console.log('test orgs')
    //console.log(orgs)
    var organisations = [];
    for(let i = 0; i < orgs.length; i++) {
      organisations.push(<p key={i}>{orgs[i]}</p>)
    }

    this.setState({orgs: organisations})
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
          <p>Dina valda organsationer är: </p>
          {this.state.orgs}
        </div>
        <p>{this.state.response}</p>
        <div className="notifications">
          {this.state.notifications}
          {this.state.test}
          {this.state.aa}
          {this.testArray}
        </div>
 
      </div>
        );
      }   
}

export default Dashboard;