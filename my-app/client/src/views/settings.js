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

  }


  renderOrganisations() {

    var organisations = localStorage.getItem('organisationer');
    var parsedOrgs = JSON.parse(organisations);
    var orgsArray = [];
    for(let i = 0; i < parsedOrgs.length; i++) {

      orgsArray.push(<p>
        <label>
            <Checkbox
              defaultChecked
              onChange={this.onChange}
              disabled={this.state.disabled}
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
    console.log('Checkbox checked:', (e.target.checked));
  }

  save() {
    console.log('spara')
  }

  render(props) {
    return (
      <div>
        {this.renderOrganisations()}    
      </div>
        );
      }    
}

export default Settings; 