import React from "react";
import {withRouter} from 'react-router-dom'
import { Input, Button } from 'reactstrap';
import firebase from "../firebase";

class Account extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
      username: '',
      email: '',
      uid: '',
      newpassword: '',
      newusername: '',
      succesfulpw: false,
      failedpw: false,
      succesfulun: false,
      failedun: false,    
  }
  this.handleChangepw = this.handleChangepw.bind(this);
  this.handleChangeun = this.handleChangeun.bind(this);
  this.SetNewPassword = this.SetNewPassword.bind(this);
  this.SetNewUsername = this.SetNewUsername.bind(this);
}

componentDidMount() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        this.setState({
          username : user.displayName,
          email: user.email,
          uid: user.uid,
        })
    } else {
        // No user is signed in.
      }
  }.bind(this));
}

handleChangepw(input) {
  let name = input.target.name
  this.setState({
    [name]: input.target.value
  });
}

handleChangeun(input) {
  let name = input.target.name
  this.setState({
    [name]: input.target.value
  });
}


SetNewPassword() {
  let newpw = this.state.newpassword
  var user= firebase.auth().currentUser;
  user.updatePassword(newpw).then(() => {
    this.setState({
      succesfulpw: true,
    })
  }).catch((error) => {
    this.setState({
      failedpw: true,
    })
  })
}

SetNewUsername() {
  var user= firebase.auth().currentUser;
  user.updateProfile({displayName: this.state.newusername,}).then(() => {
    this.setState({
      succesfulun: true,
      username: this.state.newusername
    })
  }).catch((error) => {
      this.setState({
        failedun: true,
      })
    })
}

render() {
  return (
    <div>
    <div  style={{
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      width: '30%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '10%',    
    }}>
      
      <h2 >Account</h2>

      <div style={{padding: '2rem'}}>
        <p>Username: {this.state.username}</p>
        <p>Email: {this.state.email}</p>
      </div>

      <div style={{padding: '2rem'}}>
        <h5>Change your Username</h5>
        <Input 
          onChange={this.handleChangeun}
          value={this.state.newusername}
          name='newusername'
          placeholder='Type your new Username'
        />
        <Button onClick={this.SetNewUsername} style={{marginTop: '1rem'}}>Submit</Button>
        { this.state.succesfulun && <p>Username changed !</p>}
        { this.state.failedun && <p>Something went wrong...</p>}  
      </div>

      <div style={{padding: '2rem'}}>
        <h5>Change your password</h5>
        <Input 
          onChange={this.handleChangepw}
          value={this.state.newpassword}
          name='newpassword'
          placeholder='Type your new password'
        />
        <Button onClick={this.SetNewPassword} style={{marginTop: '1rem'}}>Submit</Button>
        { this.state.succesfulpw && <p>Password changed !</p>}
        { this.state.failedpw && <p>Something went wrong...</p>}
      </div>

    </div>
    </div>
        
  )
}
}

export default withRouter(Account);
