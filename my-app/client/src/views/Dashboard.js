import React, { Component } from 'react';
import Links from './Links';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        
      }

//     saveName(obj) {
//         this.setState({name: obj.name})
//     }


//   saveOrganizations(obj) {
//     let orgs = [];
//     for(let i = 0; i < obj.length; i++) {
//      orgs.push(<p>{obj[i].login}</p>)
//     }
//     this.setState({orgs: orgs})
//   }




componentDidMount() { 

//     this.callApi()
//       .then(res => this.setState({response: res.express.substring(13, 53)}))
//       .then(console.log('joo'))
//       .then(res => fetch('https://api.github.com/user?access_token=' + this.state.response, {
//          method: 'GET'
//       }))
//       .then(res => res.json() )
//       .catch(error => console.error(error))
//       .then(response => this.saveName(response))
//       .then(this.setState({loggedIn: true}))
//       .then(res => fetch('https://api.github.com/user/orgs?access_token=' + this.state.response,{
//         method: 'GET'
//       }))
//       .then(res => res.json())
//       .catch(error => console.log(error))
//      .then(response => this.saveOrganizations(response))

      
 }

//   getTemporaryCode = () => {
//     const search = window.location.search;
//     const code = search.substring(6);
//     return code
//   }

//   callApi = async function() {
//     const response = await fetch('/main/' + this.getTemporaryCode());
//     const body = await response.json();
//     console.log(body);

//     if (response.status !== 200) throw Error(body.message);

//     return body;
//   };


    render(props) {
        return (
          <div className="SettingsDiv">

            <p className="Settings">
                Dashboard
            </p>
            <p>{this.props.name}</p>
            {/* FIXAAA
            {this.props.orgs} */}
            

          </div>
        );
      }
    
}

export default Dashboard;