import React, {Component} from 'react';
import Navigation from './components/Navigation';
import 'normalize.css';
import 'styles/index.scss';
import logo from './components/logo.png';

import {Link} from 'react-router-dom';

class App extends Component {

  render(){
    console.log(this.props.location.state);
    let user = this.props.location.state
    return(
      <div className='App'>
        <Navigation/>
        <img src={logo} height="100" />
        {
          this.props.location.state?
          <div className=" jumbotron">
            <form>
              <div className="form-group">
                <label>Email address:</label>
                <input type="email" className="form-control" value={user.email} readOnly/>
              </div>
              <div className="form-group">
                <label>First Name:</label>
                <input type="text" className="form-control" value={user.firstname} readOnly/>
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input type="text" className="form-control" value={user.lastname} readOnly/>
              </div>
              <div className="form-group">
                <label>Roles:</label>
                <input type="text" className="form-control" value={user.role.toString()} readOnly/>
              </div>

            </form>
          </div>
          :
          <div className="jumbotron home">
            <h1>Oops !</h1>
            <p>You are not connected, please <span className="redBg">Sign in to your account</span></p>
          </div>
        }
      </div>
    )
  }
}

export default App;
