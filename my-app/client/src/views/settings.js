import React, { Component } from 'react';
import Links from './Links';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orgs: []
    }    
  }

  testar() {

    var organisations = localStorage.getItem('organisationer');
    var parsedOrgs = JSON.parse(organisations);
    var orgsArray = [];
    for(let i = 0; i < parsedOrgs.length; i++) {
      orgsArray.push(<RadioButton key={[i]}value={parsedOrgs[i]}>
      {parsedOrgs[i]}
      </RadioButton>)
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

  // listOrganisations(orgs) {
  //   orgs = this.props.orgs;
  //   orgs.forEach(element => {
  //     <label>
  //        <input type="radio" value="test"/>
  //             Test
  //     </label>
  //   });
  // }
  // componentDidMount() { 
  //     fetch('https://api.github.com/user/orgs?access_token=' + this.state.response,{
  //     method: 'GET'
  //   })
  //   .then(res => res.json())
  //   .catch(error => console.log(error))
  //   .then(response => console.log(response))
  //   //.then(response => this.saveOrganizations(response))
  // }



  // getInitialState () {
  //   return {
  //     selectedOption: ''
  //   }
  // }

  // handleOptionChange(changeEvent) {
  //   this.setState({
  //     selectedOption: changeEvent.currentTarget.value
  //   })
  // }

  onChange(value) {
    console.log(value)
  }

  render(props) {
    return (
      <div className="SettingsDiv">
        <h2>Settings</h2>
        <p>Choose organisations to listen to</p>
        {this.state.orgs}
        
        <div className="radioInputs">
        <RadioGroup onChange={ this.onChange } vertical="true">
        {this.testar()}
        
        </RadioGroup>
        </div>
      </div>
        );
      }    
}

export default Settings;