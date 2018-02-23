import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'
import _ from './env'
console.log(process.env)
console.log(process.env.NODE_ENV)

//   const element = <App name="Sofia" />
//   ReactDOM.render(element, document.getElementById('root'));

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
