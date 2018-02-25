import React, { Component } from 'react';
import Links from './Links';

class Dashboard extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      response: '',
      name: '',
      orgs: []
      
    }    
  }

  
  saveOrganizations(obj) {
    if(obj) {
      let orgs = [];
      for(let i = 0; i < obj.length; i++) {
        orgs.push(<p>{obj[i].login}</p>)
      }
      this.setState({orgs: orgs})
    }
   
    
  }

  componentDidMount() { 

    this.props.routes()
    this.callApi()
    .then(res => this.setState({response: res.express.substring(13, 53)}))
    .then(res => {
      return fetch('https://api.github.com/user?access_token=' + this.state.response, {
       method: 'GET'
    })})
    .then(res => res.json() )
    .catch(error => console.error(error))
    .then(res => this.setState({name: res.name}))

    .then(res => {
      return fetch('https://api.github.com/user/orgs?access_token=' + this.state.response,{
      method: 'GET'
    })})
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(response => this.saveOrganizations(response)) 
      
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

  render(props) {
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