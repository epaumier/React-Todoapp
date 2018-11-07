import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// removing this line because it kept one of my pages in cache or something import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
<BrowserRouter>
<App />
</BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// commenting out because i'm not using serviceworkers on this project and it is keeping in cache one of my pages
// serviceWorker.unregister();
