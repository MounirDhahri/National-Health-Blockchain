import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import App from './app';
import Login from './components/Login';
import Sample from './components/Sample';
var  Generate = require('./components/Generate');
import Details from './components/Details';
import 'styles/index.scss';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/generate" componennt={Generate}/>
      <Route path="/details" component={Details}/>
      <Route path="/login" component={Login}/>
      <Route path="/sample" component={Sample}/>
    </div>
  </Router>
);

export default Routes;
