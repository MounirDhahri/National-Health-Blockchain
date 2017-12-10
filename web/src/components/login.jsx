import React, {Component} from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import logo from './logo.png';
import api from './apiHandler';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:'mounir.dhahri@ensi-uma.tn',
      password:'logpass'
    }
  }

  login = async (event) => {
    event.preventDefault();
    const responseData = await api.login(this.state.email, this.state.password);
    console.log(responseData);
    if (responseData.success) {
      console.log("working");
      this.props.history.push('/',responseData.user);
    }
    else {
      console.log("not working");
    }
  }


  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }


  render(){
    console.log(this.props);
    return (
      <div>
        <center>
          <img src={logo} height="400" />
        </center>

      <form>
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <input type="email" className="form-control" value={this.state.email} onChange={(email)=>{this.handleChangeEmail(email)}}/>
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input type="password" className="form-control" value={this.state.password} onChange={(password)=>{this.handleChangePassword(password)}}/>
        </div>
        <div className="checkbox">
          <label><input type="checkbox" /> Remember me</label>
        </div>
        <button type="submit" className="btn btn-info btn-block" onClick={this.login}>Submit</button>
      </form>
    </div>
    )
  }
};

export default Login;
