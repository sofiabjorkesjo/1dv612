import React, { Component } from 'react';
import Links from './Links';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

class Settings extends Component {
  constructor(props) {
    super(props)    
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
        <RadioGroup onChange={ this.onChange } vertical="true">
          <RadioButton value="apple">
            Apple
          </RadioButton>
          <RadioButton value="orange">
            Orange
          </RadioButton>
          <RadioButton value="melon">
            Melon
          </RadioButton>
        </RadioGroup>
        {/* <form>
          <div className="Radio">
          <label>
            <input type="radio" value="test1" checked={this.state.selectedOption === 'test1'} onChange={this.handleOptionChange}/>
              Test 1
          </label>
          <label>
            <input type="radio" value="test2" checked={this.state.selectedOption === 'test2'} onChange={this.handleOptionChange}/>
              Test 2
          </label> 
          </div>
        </form> */}
        <div>{this.props.orgs}</div> 
      </div>
        );
      }    
}

export default Settings;