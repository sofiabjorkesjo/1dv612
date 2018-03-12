import React, { Component } from 'react';
import Checkbox from 'rc-checkbox'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orgs: [],
      disabled: false
    }
    this.checkedBoxes = [];
  }

  sendUserToServer() {
    var username = localStorage.getItem('username');
    var url = '/main/settings';
    console.log('tttt');
    var obj = {'username': username}

    return fetch(url, {
      method: 'POST', 
      body: JSON.stringify(obj) , 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }


  renderOrganisations() {

    var organisations = localStorage.getItem('organisationer');
    var parsedOrgs = JSON.parse(organisations);
    var orgsArray = [];
    for(let i = 0; i < parsedOrgs.length; i++) {

      orgsArray.push(<div key={i + 4}><h3 key={i + 1}>{parsedOrgs[i]}</h3><p key={i}>
        <label>
          
            <Checkbox 
              ref = "test"
              onChange={this.onChange.bind(this)}
              disabled={this.state.disabled}
              name={'issues ' + parsedOrgs[i]} 
            />
            issues

          </label>
        </p>

        <p key={i + 2}>
          <label>
            
              <Checkbox 
                ref = "test"
                onChange={this.onChange.bind(this)}
                disabled={this.state.disabled}
                name={'push ' + parsedOrgs[i]}
              />
              push

            </label>
        </p>

        <p key={i + 3}>
           <label>
              <Checkbox 
                ref = "test"
                onChange={this.onChange.bind(this)}
                disabled={this.state.disabled}
                name={'release ' + parsedOrgs[i]}
              />
              release
            </label>
        </p>
      </div>
        )      
    }
    return orgsArray
  }

  componentDidMount() {
    this.sendUserToServer()
    var organisations = localStorage.getItem('organisationer');
    var parsedOrgs = JSON.parse(organisations);
    var orgsArray = [];
    for(let i = 0; i < parsedOrgs.length; i++) {
      orgsArray.push(<p key={i}>{parsedOrgs[i]}</p>)
     
    }
    this.setState({orgs: orgsArray})

  }

  onChange(e) {
    if(e.target.checked === true) {
      if(this.checkedBoxes.includes(e.target.name)) {
        console.log('finns')
      } else {
        this.checkedBoxes.push(e.target.name)
        console.log('inte')
      }   
    }

    if(e.target.checked === false) {
      if(this.checkedBoxes.includes(e.target.name)) {
        for(let i = 0; i < this.checkedBoxes.length; i++) {
          if(this.checkedBoxes[i] === e.target.name) {
            this.checkedBoxes.splice([i], 1)
          }
        }
      }
    }
  }


  save(event) {
    event.preventDefault();
    console.log(this.checkedBoxes);
    console.log('spara')
    this.sendToServer(this.checkedBoxes)
  }

  sendToServer = function(data) {

    var url = '/main/settings';
    console.log('asasas');
    console.log(data);
    var username = localStorage.getItem('username');
    var email = localStorage.getItem('email');
    var obj = {'data': data, 'username': username, 'email': email}

    return fetch(url, {
      method: 'POST', 
      body: JSON.stringify(obj) , 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  };

  render(props) {
    
    return (
      <main>
      <div>
        <form onSubmit={this.save.bind(this)}>
        {this.renderOrganisations()}  
        <input type="Submit" value="submit" readOnly/>
        </form>
      </div>

      
      <div>
      </div>

      
      </main>
        );
      }    
}

export default Settings; 