import React, { Component } from 'react';
import Links from './Links';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { SSL_OP_CISCO_ANYCONNECT } from 'constants';
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


  renderOrganisations() {

    var organisations = localStorage.getItem('organisationer');
    var parsedOrgs = JSON.parse(organisations);
    var orgsArray = [];
    for(let i = 0; i < parsedOrgs.length; i++) {

      orgsArray.push(<p key={i}>
        <label>
            <Checkbox 
              //ref={(input) => { this.textInput = input; }}
              ref = "test"
              onChange={this.onChange.bind(this)}
              disabled={this.state.disabled}
              name={parsedOrgs[i]}
            />
            {parsedOrgs[i]}
          </label>
        </p>)      
    }
    return orgsArray
  }

  componentDidMount() {
    var organisations = localStorage.getItem('organisationer');
    var parsedOrgs = JSON.parse(organisations);
    var orgsArray = [];
    for(let i = 0; i < parsedOrgs.length; i++) {
      orgsArray.push(<p key={i}>{parsedOrgs[i]}</p>)
     
    }
    this.setState({orgs: orgsArray})
  }

  onChange(e) {
    if(e.target.checked == true) {
      if(this.checkedBoxes.includes(e.target.name)) {
        console.log('finns')
      } else {
        this.checkedBoxes.push(e.target.name)
        console.log('inte')
      }   
    }

    if(e.target.checked == false) {
      if(this.checkedBoxes.includes(e.target.name)) {
        for(let i = 0; i < this.checkedBoxes.length; i++) {
          if(this.checkedBoxes[i] == e.target.name) {
            this.checkedBoxes.splice([i], 1)
          }
        }
      }
    }
  }

  save(event) {
    event.preventDefault();
    // console.log(this.refs.test)
    console.log(this.checkedBoxes);
    console.log('spara')
    
    // console.log(event.target);
    // console.log(event.checked);
    // console.log(event.value)
    // event.preventDefault();
  }

  render(props) {
    
    return (
      <main>
      <div>
        <form onSubmit={this.save.bind(this)}>
        {this.renderOrganisations()}  
        <input type="Submit" value="submit"/>
        {/* <button onClick={this.save()}>spara</button> */}
        </form>
      </div>
      <div>
      </div>
      </main>
        );
      }    
}

export default Settings; 