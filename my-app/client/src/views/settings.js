import React, { Component } from 'react';
import Links from './Links';

class Settings extends Component {
  constructor(props) {
    super(props)    
  }

  render(props) {
    return (
      <div className="SettingsDiv">
        <p className="Settings">
          Settings
        </p>
        <div>{this.props.orgs}</div> 
      </div>
        );
      }    
}

export default Settings;