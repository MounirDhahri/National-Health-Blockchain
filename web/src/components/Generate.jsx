import React, {Component} from 'react';
// var QRCode = require('qrcode');
import QRCode from 'qrcode';

import 'normalize.css';
import 'styles/index.scss';
import api from './apiHandler';

import Navigation from './Navigation';
var segs = [
   { data: 'ABCDEFG', mode: 'alphanumeric' },
   { data: '0123456', mode: 'numeric' }
 ]

class Generate extends Component {
  constructor(props){
    super(props);
    this.state = {
      img:'',
      citizenID:'',
      doctorID:''
    }
  }
  componentDidMount(){
  }

  submit = async (event)=>{
    var that = this;

    event.preventDefault();
    const responseData = await api.addTransaction(this.state.citizenID, this.state.doctorID);
    console.log(responseData);
    if (responseData.success) {
      console.log("working");
      alert("the qr code has been added to the blockchain");
      QRCode.toDataURL('I am a pony!', { errorCorrectionLevel: 'H' }, function (err, url) {
        console.log(url);
        that.setState({
          img:url
        })
      })
    }
    else {
      console.log("not working");
    }
  }


  handleChangeCitizen(event) {
    this.setState({citizenID: event.target.value});
  }

  handleChangeDoctor(event) {
    this.setState({doctorID: event.target.value});
  }

  render(){
    console.log(this.state.img);

    return(
      <div className="App">
        <Navigation/>

        <form>
          <div className="form-group">
            <label htmlFor="citizenID">Citizen ID:</label>
            <input type="text" className="form-control" value={this.state.citizenID} onChange={(citizenID)=>{this.handleChangeCitizen(citizenID)}}/>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Doctor ID:</label>
            <input type="password" className="form-control" value={this.state.doctorID} onChange={(doctorID)=>{this.handleChangeDoctor(doctorID)}}/>
          </div>
          <div className="checkbox">
            <label><input type="checkbox" /> Remember me</label>
          </div>
          <button type="submit" className="btn btn-info btn-block" onClick={this.submit}>Submit</button>
          <center>
            <div id="canvas"></div>
            {
              this.state.img != "" ? <img src={this.state.img}/> : null
            }
          </center>
        </form>
      </div>
    )
  }
}


export default Generate;
