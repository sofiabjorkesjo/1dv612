import React, { Component } from 'react';
import io from "socket.io-client";

class Notifications extends Component {
    render() {
      const test = ['2', '3', ];

     
        return (
          <div className="Notifications">
          
            <li>
              {test}
            </li>
          </div>
        );
      }
}

export default Notifications;