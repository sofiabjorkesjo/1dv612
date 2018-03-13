import React, { Component } from 'react';
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
      events: []  
    }
    this.testArray = [];
    this.testArray.push(<h3 className="h3">New events</h3>)
    this.handleData = this.handleData.bind(this);

    
  }


  clickOnSiet() {
    document.addEventListener('click', function() {
      localStorage.setItem('time', new Date());
      let time = localStorage.getItem('time');
      let username = localStorage.getItem('username');
      var url = '/main/dashboard/active';
      var obj = {'username': username, 'time': time}
  
      return fetch(url, {
        method: 'POST', 
        body: JSON.stringify(obj) , 
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))

    });
  }

  getEventSinceLastTime() {
    let username = localStorage.getItem('username');
      var url = '/main/dashboard/events';
      var obj = {'username': username}
  
      return fetch(url, {
        method: 'POST', 
        body: JSON.stringify(obj) , 
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        let min = 1;
        let max = 10000;
        let random = min + Math.random() * (max - min);
        let arr = [];
        arr.push(<h3 className="h3">Events since last login</h3>)
        
        if(response) {
        
        
        response.events.forEach(function(element) {
          if(element.type === 'IssuesEvent') {
            arr.push(<span className="span" key={element.actor.id + 1} ><p className="subject" key={element.actor.id}>Issue</p> <p className="date" key={element.actor.id + 2} >{element.created_at}</p></span>)
           } 
          if(element.type === 'PushEvent') {
            arr.push(<span className="span" key={element.actor.id + 1}><p  className="subject" key={element.actor.id}>Push</p> <p  className="date" key={element.actor.id + 2}>{element.created_at}</p></span>)
          }
           if(element.type === 'ReleaseEvent' || element.type === 'CreateEvent') {
            arr.push(<span className="span" key={element.actor.id}><p  className="subject" key={element.actor.id + 2 }>Release</p> <p className="date" key={element.actor.id + 3}>{element.created_at}</p> <p className="orgNotification" key={element.actor.id + 4}>{element.org.login}</p></span>)
           }
          

         
       })
      }
       this.setState({events: arr})
     })
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

  async saveUser(res) {
    await this.setState({name: res.name});
    await this.setState({email: res.email})

  }

  handleData(data){
    if(data.event == 'issue') {
      let subject = data.subject;
      let action = data.action;
      let title = data.title;
      let organization = data.organization;
      let repository = data.repository;
      let user = data.user;
      let date = data.date;
      let id = data.id;
   
      this.testArray.push(<div key={id} className="notificationDiv"><p key={id + 1} className="date">{date}</p><p key={id + 2} className="subject">{subject}</p><p key={id + 3} className="title"><span key={id + 4} className="titleName">{title}</span>{' by '}{user}</p></div>);
      this.setState({notifications: subject});
    }
    if(data.event == 'push') {
      let subject = data.subject;
      let date = data.date;
      let user = data.user
      let id = data.id;

      this.testArray.push(<div key={id} className="notificationDiv"> <p key={id + 1} className="date">{date}</p><p key={id + 2} className="subject">{subject}</p><p key={id +3} className="title">{'by ' + user}</p></div>)
      this.setState({notifications: subject});
    }

    if(data.event == 'release') {
      let subject = data.subject
      let date = data.date;
      let user = data.user;
      let action = data.action;
      let id = data.id;

      this.testArray.push(<div key={id} className="notificationDiv"> <p key={id + 1} className="date">{date}</p><p key={id + 2} className="subject">{subject + ' ' + action}</p><p key={id +3} className="title">{'by ' + user}</p></div>)
      this.setState({notifications: subject});
    }
  }

  getNameFromLocalStorage() {
    let name = localStorage.getItem('username')
    let socket = io();
    socket.on(name, (test) => this.handleData(test)) 
  }
 

  componentDidMount() {   
    this.clickOnSiet();
    let name = localStorage.getItem('username')
    let socket = io();
    socket.on(name, (test) => this.handleData(test)) 
   

    if(localStorage.getItem('username')) {  
      var username = localStorage.getItem('username')
      this.setState({name: username})
      this.postUserToServer()     
    } else {
      this.props.routes()
      this.callApi()
      //.then(res => this.setState({response: res.express.substring(13, 53)}))
      .then(res => {return localStorage.setItem('token', res.express.substring(13, 53))})
      .then(res => {return 
        let access = localStorage.getItem('token');
        this.setState({response: access});
      })

      //
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
      .then(test => {return this.getNameFromLocalStorage()})
      .then(events => {return this.getEventSinceLastTime()})
    }
    
  }

  theTemporaryCode() {
    const search = window.location.search;
    return search
  }

  getTemporaryCode = () => {
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
      if(!localStorage.getItem('username')) {
      return(
        <div>
          <p>You need to login</p>
          </div>
      );
    } else {

    return (
      <div className="DashboardsDiv">
      
        <div className="loggedInAs">
          <p>You are logged in as {this.state.name}</p>
          <p>If you have a gmail account on your github profile, then you will get notifications to your email.</p>
        </div>
        
        <div className="orgs">
          <p className="h2">Event you follow</p>
          {this.state.orgs}
        </div>
        <div className="notifications">
          <h2 className="h2">Notifications</h2>
          <div className="sinceLastTime">{this.state.events}</div>
         
          <div>{this.testArray}</div>
        </div>
        <p>{this.props.loggedIn} aaaa</p>
      </div>
        );
      }
      }   
}

export default Dashboard;