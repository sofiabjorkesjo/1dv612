import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import Layout from './views/Layout';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'
import _ from './env'
console.log(process.env)
console.log(process.env.NODE_ENV)

function App(props) {
    return <h1>Hej, {props.name}</h1>
  }
  
//   const element = <App name="Sofia" />
//   ReactDOM.render(element, document.getElementById('root'));

ReactDOM.render(<BrowserRouter><Routes/></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
