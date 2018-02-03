import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Routes from './Routes';
import Layout from './views/Layout';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'


ReactDOM.render(<BrowserRouter><Routes /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
